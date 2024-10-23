import {useNavigate} from 'react-router-dom';
import NavBarButton from './NavBarButton';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export default function NavBar(){
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/home")
    };

    return(
        <div className = "bg-gray-800 py-4  px-[300px]">
            <div className="container mx-auto flex  justify-between item-center min-w-full ">
                <div className="flex space-x-[50px] md:flex">
                    <NavBarButton linkName="楽翻訳" linkUrl="/home" isUnique={true} className="whitespace-nowrap"/>
                    <NavBarButton linkName="Search" linkUrl="/search" />
                    <NavBarButton linkName="Lists" linkUrl="/lists" />
                    <NavBarButton linkName="About" linkUrl="/about" />
                </div>
                <div>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="text-white pl-[50px]">
                        Logout
                        </button>
                    )
                    : ( <NavBarButton linkName="Login" linkUrl="/login" />)}
                </div>
            </div> 
        </div>
    )
}