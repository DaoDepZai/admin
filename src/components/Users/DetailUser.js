import React, { useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import db from "../../db";
export default function DetailUser(props) {
    const { state, dispatch } = React.useContext(UserContext);
    const [name,setName]=useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const handleInput = (e) => {
        cate[e.target.name] = e.target.value;
        setCate(cate);
        setName(cate.name);
        setEmail(cate.email);
        setPassword(cate.password);
        setPhone(cate.phone);
        console.log(cate);
    }
    const [cate, setCate] = useState({});
    useEffect(()=>{
        setCate(state.user_detail);
        setName(state.user_detail.name);
        setEmail(state.user_detail.email);
        setPassword(state.user_detail.password);
        setPhone(state.user_detail.phone);

    },[])
    const configUser = (e) => {
        e.preventDefault();
        // A post entry.
        console.log(name,email,password,phone)
        var postData = {
            id:state.user_detail.id,
            name: name,
            email:email,
            password:password,
            phone:phone,
        };
        // Get a key for a new Post.
        var PostKey =  state.user_detail.id- 1;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/user/' + PostKey] = postData;
        return db.ref().update(updates);

    }
    return (
        <div className="card mb-6" style={{ width: '50%', height: '75%', border: "none" }}>
            <header className="card-header">
                <p className="card-header-title">
                    <span className="icon"><i className="mdi mdi-ballot"></i></span>
                    Thông tin người dùng
                </p>
            </header>
            <form method="post" className="form-control">
                <div className="control icons-left form-group row">
                    <label className="col-2 ">Tên </label>
                    <input name="name" className="input form-control col-9" type="text"   onChange={handleInput} value={name} />
                </div>
                <div className="control icons-left form-group row">
                    <label className="col-2 ">Email </label>
                    <input name="email" className="input form-control col-9" type="text"  onChange={handleInput} value={email} />

                </div>
                <div className="control icons-left form-group row">
                    <label className="col-2 ">Password </label>
                    <input name="password" className="input form-control col-9" type="text"  onChange={handleInput} value={password} />

                </div>

                <div className="control icons-left form-group row">
                    <label className="col-2 ">Số Điện Thoại </label>
                    <input name="phone" className="input form-control col-9" type="text"  onChange={handleInput} value={phone} />

                </div>

                <div className="field grouped mt-4" >
                    <div className="control">
                        <button className="button  red --jb-modal mx-1" data-target="sample-modal" type="button"
                            onClick={configUser}>
                            <span className="icon">Sửa</span>
                        </button>
                        <NavLink to="/user" className="button red" >
                            Back
                        </NavLink>
                    </div>
                </div>
            </form>
        </div>
    )
}