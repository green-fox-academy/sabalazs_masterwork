import React, { useContext } from "react";
import { AuthContext } from "../App";

export const Home = () => {
    const { state } = useContext(AuthContext);
    return (
        <div className="home">
            {JSON.stringify(state, null, 2)}
        </div>
    );
};
export default Home;