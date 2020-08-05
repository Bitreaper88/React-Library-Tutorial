import React, {useState, ChangeEvent, useEffect} from "react";
import "./Login.css";
import {API_URL} from "./constants";
import { IBook, IUser } from "../../server/src/types";
import { loadAccessTokenFromLocalStorage } from "./utils";

export type GetBorrowedBooksFn = (search: string) => Promise<Response>;
const getborrowedbooks: GetBorrowedBooksFn = (userId) => fetch(`${API_URL}/user/${userId}/books/`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${loadAccessTokenFromLocalStorage()}`,
        "Content-Type": "application/json",
    },
    credentials: "include",
});

interface IProps {
    user: IUser | null,
}

export const MyPage: React.FC<IProps> = (props) => {
    const { user } = props;
    const [myBooks, setMyBooks] = useState<IBook[]>([]);
    console.log("USER", user)
    useEffect(() => {
        listBorrowedBooks();
    },[user])

    const listBorrowedBooks = async () => {
        if (user) {
            console.log("NOH", user)
            return getborrowedbooks(user._id)
                .then(response => {
                    if (response.status === 200) { //successful search!
                        return response.json();
                    }
                    return [];
                })
                .then(data => {
                    setMyBooks(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div>
            Hi {user?.name}, welcome to librarby
            <h2>You have borrowed these books.....:</h2>

            {myBooks.map((book) => {
                return (
                <div key={book.isbn}>
                    <h2>{book.title}</h2> 
                    <h3>{book.author}</h3>
                </div>)
            })}
        </div>
    )
}
