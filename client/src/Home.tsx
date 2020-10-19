import React, { useState, useEffect, useImperativeHandle } from 'react';
import './App.css';


const Home: React.FC = () => {


    return (
        <>
            <div className="hero-image">
                <div className="text-container">
                    <div className="hero-text">
                        <h1>Welcome</h1>
                        <h3>This is a very random library app made in react</h3>
                    </div>
                </div>
            </div>
            <div className="page">
            A library is a curated collection of sources of information and similar resources, selected by experts and made accessible to a defined community for reference or borrowing, often in a quiet environment conducive to study.
            It provides physical or digital access to material, and may be a physical location or a virtual space, or both.
            A library's collection can include books, periodicals, newspapers, manuscripts, films, maps, prints, documents, microform, CDs, cassettes, videotapes, DVDs, Blu-ray Discs, e-books, audiobooks, databases, table games, video games and other formats.
            Libraries range widely in size up to millions of items.
            The word for "library" in many modern languages is derived from Ancient Greek βιβλιοθήκη (bibliothēkē), originally meaning bookcase, via Latin bibliotheca.

                <blockquote>
                    <h3>′Classic′ – a book which people praise and don’t read</h3>
                    <footer>-Mark Twain</footer>
                </blockquote>
            </div>
        </>
    )
}
export default Home;

