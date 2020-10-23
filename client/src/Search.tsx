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
        paddingTop: "-48px",
        paddingBottom: "-20px",
        borderTop: "20px solid white",
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
                alert('Error borrowing the book. Please try again later.');
            }
        }
        catch (err) {
            console.log('ERROR!');
        }
    }

    function ResultsModal() {
        return (
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={ModalStyle}
            >
                {!results.length && <div className="search-message">No results found.</div>}
                <button className="modal-exit-button" onClick={() => setShowModal(false)}>
                    Close
                </button>

                {results
                    .map(result => {
                        return (
                            <div className={"results"} key={result.isbn}>
                                <div className={"title"}>
                                    {result.title}
                                </div>
                                <div className={"author"}>
                                    Author: {result.author}
                                </div>
                                <div className={"description"}>
                                    Description: {result.description}
                                </div>
                                <br />
                                <div className={"available"}>
                                    Availability:
                            {result.available
                                        .map(copy => {
                                            if (copy.status === "in_library") {
                                                return (
                                                    <div key={result.isbn + copy.id}>
                                                        Copy {copy.id}:&nbsp;
                                                In library
                                                    </div>
                                                );
                                            }
                                            else if (copy.status === "borrowed") {
                                                return (
                                                    <div key={result.isbn + copy.id}>
                                                        Copy {copy.id}:&nbsp;
                                                Borrowed until {(new Date(Date.parse(copy.due_date))).toDateString()}
                                                    </div>
                                                )
                                            }
                                            else return (
                                                <div key={result.isbn + copy.id}>
                                                    ERROR!
                                                </div>
                                            )
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
                        );
                    })}
            </Modal>
        )
    }

    return (
        <div className={"search-page"}>
            <div>
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
            <ResultsModal />
        </div>
    )
}

export default Search;