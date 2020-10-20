import React, { useState } from 'react';
import { API_URL } from './constants';

function Search() {
    const [searchTerm, setSearchTerm] = useState('ulysses');

    async function searchForString() {
        const resp = await fetch(`${API_URL}/books?search=${searchTerm}`);
        console.log(await resp.json());
    }

    return (
        <div>
            <label>Search:</label>
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button onClick={searchForString}>Search</button>
        </div>
    )
}

export default Search;