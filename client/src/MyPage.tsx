import React, { useContext, useState, useEffect } from 'react';
import './MyPage.css';
import AuthContext from './AuthContext';
import { API_URL } from "./constants";
import { IUser } from '../../server/src/types';


interface IResult {
    author: string;
    copies: IFrontCopy[];
    description: string;
    isbn: string;
    pages: number;
    published: string;
    publisher: string;
    title: string;
}

interface IFrontCopy {
    home_library: string;
    id: string;
    status: string;
    borrower_id: string,
    due_date: string
}

interface IBookProps extends IResult {
    callBack: () => Promise<void>;
}

interface MyPageProps {
    user: IUser | null;
}

interface IBookCopiesProps extends IFrontCopy {
    callBack: () => Promise<void>;
    isbn: string;
}

const BookCopies: React.FC<IBookCopiesProps> = props => {

    const { token } = useContext(AuthContext);

    let { home_library, id,
        due_date, isbn
    } = props;

    async function retrunUserBooks() {
        try {
            const resp = await fetch(`${API_URL}/books/${isbn}/return/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include"
            });

            if (resp.ok) {
                const body = await resp.json();
                if (body[0].operationValid) {
                    props.callBack();
                }
                else {
                    alert('Error!');
                }
            }
            else if (resp.status === 404) {
                await resp.json();
            }

        }
        catch (err) {
            console.log(err);
        }
    }
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
    };
    var date = new Date(due_date);

    return (
        <div className={"copie-info"}>

            <div className="title">
                Due date:<small> {date.toLocaleDateString("en-US", options)}</small>
            </div>
            <div className="title">
                Return to: <small> {home_library}</small>
            </div>
            <div className="btnRightContainer">
                <button className="return-button" onClick={retrunUserBooks}>
                    Return
                </button>
            </div>
        </div>
    );
}

const Book: React.FC<IBookProps> = props => {
    let { author, copies, description,
        isbn, title
    } = props;

    let borrowedCopiesToRender;
    if (copies.length) {
        borrowedCopiesToRender = copies.map((copies: IFrontCopy, index: number) => {
            return (<BookCopies key={index + copies.id} isbn={isbn} {...copies} callBack={props.callBack} />)
        })
    } else {
        borrowedCopiesToRender = "Loading...";
    }

    return (
        <div className={"borrowed-bookslist"}>
            <div className="book-info">
                <div className={"title"}>{title}</div>
                <div className={"author"}>
                    Author: {author}
                </div>
                <small>
                    ISBN: {isbn}
                </small>
                <div className={"description"}>
                    {description}
                </div>
            </div>

            <div>

            </div>

            <div>
                {borrowedCopiesToRender}
            </div>

        </div>
    );
}

const MyPage: React.FC<MyPageProps> = (props) => {
    const user = props.user;
    const { token } = useContext(AuthContext);
    const [results, setResults] = useState<IResult[]>([]);

    useEffect(onUserUpdate, [user]);

    function onUserUpdate() {
        getUserBooks();
    }

    async function getUserBooks() {
        if (user) {
            try {
                const resp = await fetch(`${API_URL}/user/${user.id}/books`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include"
                });

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
    }

    function renderBorrowedBooks() {
        if (results) {
            return results.map((results: IResult, index: number) => {
                return (
                    <Book key={index + results.isbn} {...results} callBack={getUserBooks} />
                )
            })
        } else {
            return "Loading...";
        }
    }

    return (
        <>
            <div className="hero-image3">

                <div className="text-container">

                    <div className="hero-text">

                        <div id="hello">Hello  {user?.name}</div>
                        <div><small> {user?.email}</small> </div>
                        <div className="text-info">
                            This is your page where you can review and return books you borrowed.
                    </div>


                    </div>
                </div>
            </div>

            <div className="page">

                <div>
                    {renderBorrowedBooks()}
                </div>
                {results.length <= 0 &&
                    <h2 className="centered">
                        You havent borrowed any books yet. Head over to the search tab to borrow some!
                    </h2>
                }
            </div>
        </>
    )
}

export default MyPage;