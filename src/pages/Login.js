import React, { useEffect, useState } from "react";
import db from "../db";
import UserContext from "../context/UserContext";
import { NavLink } from "react-router-dom";
export default function Login(props) {
    // const [button, setButton] = useState(<button type="submit" className="button blue" disabled>
    //     Login
    // </button>);
    const [isEnable, SetisEnable] = useState(true);
    const { state, dispatch } = React.useContext(UserContext)
    const [input, setInput] = useState({});
    const refresh = () => {
        const dbRef = db.ref();
        dbRef.child("user").get().then((snapshot) => {
            if (snapshot.exists()) {
                state.user = snapshot.val();
                dispatch({ type: "get_user_info", payload: state.user });
                localStorage.setItem('state', JSON.stringify(state));
                setTimeout(() => {
                    dispatch({ type: "hide_loading" });
                }, 1000)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const handleInput = (e) => {
        input[e.target.name] = e.target.value;
        setInput(input);

    }
    const login = (e) => {
        const check = state.user.filter(item => item.name == input.name && item.password == input.password);
        console.log(check);
        if (check.length == 0) {
            alert("Bạn đã nhập sai tên hoặc mật khẩu")
            e.preventDefault();
        }
        else {
            state.user_login = check[0]
            dispatch({ type: "user_login", payload: state.user_login });
            localStorage.setItem('state', JSON.stringify(state));
            setTimeout(() => {
                dispatch({ type: "hide_loading" });
            }, 1000)
        }
    }
    useEffect(() => {
        refresh();
        console.log(state.user)
    }, {})
    return (
        <section className="section main-section w-50 " style={{ margin: "0 10rem" }}>
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        <span className="icon"><i className="mdi mdi-lock"></i></span>
                        Login
                    </p>
                </header>
                <div className="card-content">
                    <form method="get">

                        <div className="field spaced">
                            <label className="label">Login</label>
                            <div className="control icons-left">
                                <input className="input" type="text" name="name" placeholder="user@example.com" autocomplete="username" onChange={handleInput} required />
                                <span className="icon is-small left"><i className="mdi mdi-account"></i></span>
                            </div>
                            <p className="help">
                                Please enter your login
                            </p>
                        </div>

                        <div className="field spaced">
                            <label className="label">Password</label>
                            <p className="control icons-left">
                                <input className="input" type="password" name="password" placeholder="Password" autocomplete="current-password" onChange={handleInput} required />
                                <span className="icon is-small left"><i className="mdi mdi-asterisk"></i></span>
                            </p>
                            <p className="help">
                                Please enter your password
                            </p>
                        </div>

                        <hr />

                        <div className="field grouped">
                            <div className="control">
                                <NavLink to="/dashboard" type="submit" className="button blue" onClick={login} >
                                    Login
                                </NavLink>


                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </section>
    )
}