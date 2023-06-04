import React, { useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

import db from "../../db";
export default function FormCategories(props) {
    const [cate, setCate] = useState({});
    const { state, dispatch } = React.useContext(UserContext);
    const length = state.categories.length
    const handleInput = (e) => {
        if (length > 0) {
            cate["id"] = length + 1;
            cate[e.target.name] = e.target.value;
            setCate(cate);
        }
    }
   
    let obj = {};
    const formSubmit = (e) => {
        const value = { ...cate };
        obj[length] = value;
        const data = { ...state.categories, ...obj }
        console.log(obj)
        console.log(data)
        e.preventDefault();
        db.ref('categories/').set(data);
    }
  
    return (
        <React.Fragment>
            <div className="card mb-6" style={{ width: '50%', height: '75%' }}>
                <header className="card-header">
                    <p className="card-header-title">
                        <span className="icon"><i className="mdi mdi-ballot"></i></span>
                        Thêm Danh Mục
                    </p>
                </header>
                <div className="card-content">
                    <form method="post" onSubmit={formSubmit} className="form-control">
                        <div className="control icons-left">
                            <input name="name" className="input" type="text" placeholder="Tên danh mục" onChange={handleInput} required />
                            <span className="icon left"><i className="mdi mdi-account"></i></span>
                        </div>
                        
                        <div className="field grouped mt-4" >
                            <div className="control">
                                <button type="submit" className="button green" >
                                    Thêm
                                </button>
                            </div>
                            <div className="control">
                                <button type="reset" className="button red">
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </React.Fragment>
    )
}