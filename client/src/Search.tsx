import React, { useContext, useState } from 'react';
import AuthContext from './AuthContext';
import { API_URL } from './constants';
import Modal from 'react-modal';
import './Search.css';

interface IResult {
    author: string;
    available: IFrontCopy[];
    description: string;
    isbn: string;
    pages: number;
    published: string;
    publisher: string;
    title: string;
}

interface IFrontCopy {
    id: string;
    status: string;
    home_library: string;
    due_date: string;
}

const ModalStyle = {
    content: {
        padding: "0",
        paddingBottom: "-20px",
        borderBottom: "20px solid white"
    }
}

function Search() {
    const { authenticated, token } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<IResult[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    async function searchForString() {
        try {
            const resp = await fetch(`${API_URL}/books?search=${searchTerm}`);
            if (resp.ok) {
                const newResults = await resp.json()
                setResults(newResults);
                setShowModal(true);
            }
            else if (resp.status === 404) {
                setResults([]);
                setShowModal(true);
            }
        }
        catch (err) {
            alert('Error! Please try again later.')
            console.log(err);
            setResults([]);
        }
    }

    async function borrow(isbn: string, id: string) {
        try {
            const resp = await fetch(`${API_URL}/books/${isbn}/borrow/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include"
            });
            if (resp.ok) {
                searchForString();
            }
            else {
                alert('Error borrowing a book! Please try again later.');
            }
        }
        catch (err) {
            console.log('ERROR!');
        }
    }

    function resultsModal() {
        return (<Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            style={ModalStyle}>

            <div>
                <div className="results-header">
                    <div className="results-header-text">
                        {!results.length && <div className="search-message">No results found.</div>}
                        {results.length && <h2>Search results: {results.length}</h2>}
                    </div>
                    <div className="results-header-corner">
                        <button className="modal-exit-button" onClick={() => setShowModal(false)}>
                            X
                        </button>
                    </div>
                </div>

                <div className={"result-container"}>
                    {results.map(result => {
                        const options = {
                            year: 'numeric', month: 'long', day: 'numeric',
                        };
                        var date = new Date(result.published);
                        return (
                            <div className={"result"} key={result.isbn}>

                                <div className={"result-info"}>
                                    <div className={"resutl-title"}>
                                        {result.title}
                                    </div>
                                    <div className="base-row">
                                        <div className={"book-info"}>
                                            <b>Author:</b> {result.author}
                                        </div>
                                        <div className={"book-info"}>
                                            <b>Pages:</b> {result.pages}
                                        </div>
                                        <div className={"book-info"}>
                                            <b>Published:</b> {date.toLocaleDateString("en-US", options)}
                                        </div>
                                    </div>
                                    <div className={"description"}>
                                        Description: {result.description}
                                    </div>
                                </div>
                                <div className="copy-row">
                                    <div className={"available"}>
                                        Availability:
                                        {result.available.map(copy => {
                                        if (copy.status === "in_library") {
                                            return (<div className="available-status" key={result.isbn + copy.id}>
                                                {copy.id}:&nbsp;
                                            In library
                                            </div>);
                                        }
                                        else if (copy.status === "borrowed") {
                                            return (<div className="available-status" key={result.isbn + copy.id}>
                                                {copy.id}:&nbsp;
                                                Borrowed until {(new Date(Date.parse(copy.due_date))).toDateString()}
                                            </div>);
                                        }
                                        else return (<div key={result.isbn + copy.id}>
                                            ERROR!
                                        </div>);
                                    })}
                                    </div>

                                    {(authenticated && result.available.find(copy => copy.status === "in_library")) &&
                                        <button
                                            className="borrow-button"
                                            onClick={() => {
                                                const freeId = result.available
                                                    .find(copy => copy.status === "in_library")?.id;

                                                if (freeId) borrow(result.isbn, freeId);
                                                else alert('Error! Try again later.');
                                            }}
                                        >Borrow</button>}

                                </div>
                            </div>);
                    })}
                </div>
            </div>

        </Modal>)
    }

    return (
        <>
            <div className="hero-image2">
                <div className="text-container">
                    <div className="hero-text">
                        <form onSubmit={searchForString}>
                            <label className={"search-label"}>Book Search:</label>
                            <br />
                            <input
                                id="search-box"
                                type="text"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <br />
                            <input
                                id="search-button"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    searchForString();
                                }}
                                value="Search"
                            />
                        </form>
                    </div>
                </div>
            </div>
            <blockquote>
                <h3>So many books, so little time.</h3>
                <footer>-Frank Zappa</footer>
            </blockquote>

            {resultsModal()}
        </>
    )
}

export default Search;