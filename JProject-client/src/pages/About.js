import React from 'react';

export default function About() {
  return (
    <div className="text-slate-200 min-h-screen py-10 px-5">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <h1 className="text-5xl font-bold text-center mb-8">About Raku Honyaku</h1>

        {/* Intro */}
        <section className="mb-16">
          <p className="text-lg leading-relaxed">
            Raku Honyaku is a Japanese-English dictionary that lets you find words and kanji quickly. Currently, Raku Honyaku has a drawing
            search feature, and more lookup methods will be implemented in the future! In addition to the word and kanji information, you can 
            create custom study lists for various purposes, such as words sharing the same kanji, words you looked up in a specific
            piece of media, or grouping words under certain themes.
          </p>
        </section>

        {/* Roadmap */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Roadmap / To be Implemented</h2>
          <ul className="list-disc ml-6 text-lg leading-relaxed">
            <li>Search by Radical</li>
            <li>Monolingual support (JP to JP search results and setting the site language to Japanese)</li>
            <li>UI improvements</li>
          </ul>
        </section>

        {/* Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Resources</h2>
          <p className="text-lg leading-relaxed mb-4">
            This project comes from a pool of open-source projects. I am very thankful to the talented people behind them and their contributions
            to the Japanese learning community.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg leading-relaxed">
            Got any questions or want to get in touch? We'd love to hear from you. Feel free to reach out via email:
          </p>
          <p className="text-lg">
            Email: <a href="mailto:darrenkseng@gmail.com" className="text-blue-600 hover:underline">darrenkseng@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
