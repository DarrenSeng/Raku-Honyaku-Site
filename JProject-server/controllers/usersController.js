const { User, validate } = require("../models/userdb");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const {search} = require('./searchController')

const createUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "User with given email already exists." });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user = await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        //should be 3001
        const url = `${process.env.EMAIL_URL}/api/users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);

        res.status(201).send({ message: "An email sent to your account please verify" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

//called when user clicks on verification link in their email
const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send({ message: "Invalid Link" });

        await user.updateOne({ verified: true });

        await token.deleteOne();

        res.status(200).redirect(`${process.env.BASE_URL}/email-verified`);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.authUser);
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getUserStudylists = async (req, res) => {
    
    let results = [];
    try {
        const user = await User.findById(req.params.uid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        //for each element in studylist, perform jmdict search. if contains kanji, do kanjibeginning, else readingbeginning
        for (const list of user.studylists) {
            const listResults = [];
            for (const word of list.words) {
                const searchResult = await search(word);
                if (searchResult.mappedWordData.length > 0) {
                    const wordData = searchResult.mappedWordData[0];
                    listResults.push(wordData)
                }
            }
            results.push({ title: list.title, words: listResults });
          }
        return res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching user study lists:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//add word to a specific list within studylists. requires uid, title, word
const addToStudylists = async (req,res) => {
    try {
        const user = await User.findById(req.params.uid);
        const listTitle = req.params.title;
        const word =req.params.word;
        const list = user.studylists.find(list => list.title === listTitle)
        if (list) {
            if (list.words.includes(word)) {
                return res.status(201).json(user.studylists)
            } else {
                list.words.push(word);
                await user.save();
                return res.status(200).json(user.studylists);
            }
        } else {
            return res.status(404).json({ message: "List not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//requires uid, title, word
const removeFromStudylists = async (req,res) => {
    try {
        const user = await User.findById(req.params.uid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const listTitle = req.params.title;
        const word =req.params.word;
        const list = user.studylists.find(list => list.title === listTitle)
        if (list) {
            const wordIndex = list.words.indexOf(word);
            if (wordIndex !== -1) {
                list.words.splice(wordIndex,1);
                await user.save();
                return res.status(200).json(user.studylists)
            } else {
                return res.status(404).json({message: "Word not found in the list."})
            }
        } else {
            return res.status(404).json({ message: "List not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//requires uid, title
const createNewList = async (req,res) => {
    try {
        const user = await User.findById(req.params.uid);
        const title = req.params.title;
        if (title.length < 1 || title.length > 20) {
            return res.status(202).json({message: "Title must be between 1 and 20 characters."})
        }
        const listExists = user.studylists.some(list => list.title === title)
        if (listExists) {
            return res.status(202).json({message: "A study list with this title already exists."})
        }
        user.studylists.push({ title, words: [] });
        await user.save();
        return res.status(201).json(user.studylists);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteList = async (req, res) => {
    try {
      const user = await User.findById(req.params.uid)
      const title = req.params.title;
      if (title === "Favorites") {
        return res.status(403).json({message: "Favorites list cannot be deleted"})
      }
      const listIndex = user.studylists.findIndex(list => list.title === title);
      if (listIndex === -1) {
        return res.status(404).json({message: "List not found"})
      }
      user.studylists.splice(listIndex,1);
      await user.save();
      return res.status(200).json({updatedLists: user.studylists})
    } catch (error) {
        console.log("Error deleting list ", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
  }

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createUser, verifyEmail, getUserById, getAllUsers,getUserStudylists,addToStudylists, createNewList, deleteList, removeFromStudylists };
