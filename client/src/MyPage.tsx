import React, { useContext, useState, useEffect } from 'react';
import { IApp } from './App';
import './MyPage.css';
import AuthContext from './AuthContext';
import { API_URL } from "./constants";


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

interface IBookProps extends IResult {
    callBack: () => Promise<void>;
}

interface IFrontCopy {
    home_library: string;
    id: string;
    status: string;
    borrower_id: string,
    due_date: string
}

interface IReturnableCopy extends IFrontCopy {
    callBack: () => Promise<void>;
    isbn: string;
}

const BookCopies: React.FC<IReturnableCopy> = props => {

    let { home_library, id, status,
        borrower_id, due_date, isbn
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

    const { token, user } = useContext(AuthContext);
    return (
        <div className={"copie-info"}>

            <div className="title">
                Due date:
            <div>{date.toLocaleDateString("en-US", options)}</div>
            </div>
            <div>
                <button className="return-button" onClick={retrunUserBooks}>
                    Return
            </button>
            </div>
        </div>
    );
}

const Book: React.FC<IBookProps> = props => {
    let { author, copies, description,
        isbn, pages, published,
        publisher, title
    } = props;

    //  const { token,user } = useContext(AuthContext);

    let itemsToRender;
    if (copies.length) {
        itemsToRender = copies.map((copies: IFrontCopy, index: number) => {
            return (<BookCopies key={index + copies.id} isbn={isbn} {...copies} callBack={props.callBack} />)
        })
    } else {
        itemsToRender = "Loading...";
    }


    return (
        <div className={"borrowed-bookslist"}>
            <div className="book-info">
                <div className={"title"}>{title}</div>
                <div className={"author"}>
                    Author: {author}
                </div>
                <div className={"author"}>
                    ISBN: {isbn}
                </div>
                <div className={"description"}>
                    Description: {description}
                </div>
            </div>

            <div>

            </div>

            <div>
                {itemsToRender}
            </div>

        </div>
    );
}

const MyPage: React.FC<IApp> = (props) => {
    const user = props.user;
    const { token } = useContext(AuthContext);
    const [results, setResults] = useState<IResult[]>([]);

    //console.log("Results are in: "  + results[0].available[0].due_date);

    async function getUserBooks() {
        try {
            console.log("User:" + user?.id);
            const resp = await fetch(`${API_URL}/user/${user?.id}/books`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include"
            });
            console.log("get Books triggered");
            if (resp.ok) {
                setResults(await resp.json());
            }
            else if (resp.status === 404) {
                setResults([]);
            }
            console.log("Results: " + resp);
        }
        catch (err) {
            console.log(err);
            setResults([]);
        }
    }

    let itemsToRender;
    if (results) {
        itemsToRender = results.map((results: IResult, index: number) => {
            return (
                <Book key={index + results.isbn} {...results} callBack={getUserBooks} />
            )
        })
    } else {
        itemsToRender = "Loading...";

    }

    function noBook() {
        if (results.length === 0){
            return (
                <div>
                    No books
                </div>
            )
        }
      
    }

    useEffect(() => {
        getUserBooks();
    }, []);

    useEffect(() => {
        getUserBooks();
    }, [user]);

    return (
        <>  
            <div className="hero-image3">
         
                <div className="text-container">
                    
                    <div className="hero-text">
          
                    <div id="hello">Hello  {user?.name}</div>
                    <div> {user?.email} </div>
                    <div className="text-info">
                    This is your page where you can review and return books you borrowed.
                    </div>
                
      
                    </div>
                </div>
            </div>
    
            <div className="page">

                <div>
                    {itemsToRender}
                </div>
                {itemsToRender.length >= 0 &&
                    <h2 className="centered">
                        You havent borrowed any books yet. Head over to the search tab to borrow some!
                    </h2>
                }
            </div>
        </>
    )
}

export default MyPage;

