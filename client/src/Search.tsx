import React, {useState, ChangeEvent} from "react";
import "./Login.css";
import {API_URL} from "./constants";
import { IBook } from "../../server/src/types";

export type SearchFn = (search: string) => Promise<Response>;
const search: SearchFn = (search) => fetch(`${API_URL}/books/?search=${search}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
});

export const Search: React.FC = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [foundBooks, setFoundBooks] = useState<IBook[]>([]);
    
    const searchForBook = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        return search(searchQuery)
            .then(response => {
                if (response.status === 200) { //successful search!
                    return response.json();
                }
                return null;
            })
            .then(data => {
                setFoundBooks(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    return (
        <div>
            <h2>Search for books</h2>
            <form onSubmit={searchForBook} >
                    <div>
                        <label>Search:</label>
                        <input type="text" id="search" name="search" onChange={onSearchChange} />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
            </form>
            {foundBooks.map((book) => {
                return (
                <div key={book.isbn}>
                    <h2>{book.title}</h2> 
                    <h3>{book.author}</h3>
                </div>)
            })}
        </div>
    )
}
