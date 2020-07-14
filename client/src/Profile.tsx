import React from "react";
import {IUser} from "./types";

interface IProfileProps {
    user: IUser | null
};

const Profile: React.FC<IProfileProps> = props => {
    const { user } = props;
    return user ? (
        <div>
            Hello, <h3>{user.name}</h3>
            This is your email: <span>{user.email}</span>
        </div>
    ) : null;
}

export default Profile;
