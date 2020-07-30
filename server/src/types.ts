export interface IUser {
    _id: string
    name: string,
    email: string
}
export interface ICopy {
    home_library: string,
    id: string,
    status: "borrowed" | "in_library",
    borrower_id: string | null,
    due_date: string | null,
}
export interface IBook {
    isbn: string,
    title: string,
    author: string,
    published: string,
    publisher: string,
    pages: number,
    description: string,
    copies: ICopy[],
}
