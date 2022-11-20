import "./App.css";
import { BrowserRouter as Router} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Routes from "./routes.js";
import store from "./store";
import { loadUser } from "./actions/userAction"
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from "react-redux";

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    React.useEffect(() => {
        WebFont.load({
            google: {
                families:["Roboto", "Droid Sans", "Chilanka"],
            },
        });

        store.dispatch(loadUser());
    },[]);
    
    return (
        <Router>
            {isAuthenticated && <UserOptions user={user} />}
            <Routes />
            <Footer/>
        </Router>
    );
}

export default App;
