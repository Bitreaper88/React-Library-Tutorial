import React from "react";
import "./Profile.css";
import {IUser} from "../../server/src/types";

interface IProfileProps {
    user: IUser | null
};

const Profile: React.FC<IProfileProps> = props => {
    const { user } = props;
    return user ? (
        <div>
            <div>Hello, <strong>{user.name}</strong></div>
            <div>
            This is your email: <span>{user.email}</span>
            </div>
        </div>
    ) : null;
}

export default Profile;
