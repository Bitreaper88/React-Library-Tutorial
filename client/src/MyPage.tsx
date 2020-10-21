import React, { useContext } from 'react';
import './App.css';
import AuthContext from './AuthContext';


const MyPage: React.FC = () => {
    const { token } = useContext(AuthContext);

    return (
        <>
            <div className="page">
                {token}
                My page
            </div>
        </>
    )
}
export default MyPage;

