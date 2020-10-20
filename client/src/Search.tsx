import React, { useState } from 'react';
import { API_URL } from './constants';
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
}

function Search() {
    const [searchTerm, setSearchTerm] = useState('ulysses');
    const [results, setResults] = useState<IResult[]>([]);

    async function searchForString() {
        try {
            const resp = await fetch(`${API_URL}/books?search=${searchTerm}`);
            if (resp.ok) {
                setResults(await resp.json());
            }
            else if (resp.status === 404) {
                setResults([]);
            }
        }
        catch (err) {
            console.log(err);
            setResults([]);
        }
    }

    function printResults() {
        return results
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
                        <div className={"available"}>
                            Status: {result.available.length ? 'available' : 'not available'}
                        </div>
                    </div>
                );
            });
    }

    return (
        <div className={"search-page"}>
            <div>
                <form onSubmit={searchForString}>
                    <label className={"search-label"}>Book Search:</label>
                    <br />
                    <input
                        className={"search-box"}
                        type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <br />
                    <input
                        className={"search-button"}
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            searchForString();
                        }}
                        value="Search"
                    />
                </form>
            </div>
            <div>
                {printResults()}
            </div>
        </div>
    )
}

export default Search;