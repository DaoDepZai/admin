import React, { useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import db from "../../db";
export default function FormAddProducts(props) {
    const [cate, setCate] = useState({});
    const { state, dispatch } = React.useContext(UserContext);
    const length = state.products.length
    const ref = React.createRef();
    const handleInput = (e) => {
        if (length > 0) {
            cate["id"] = length + 1;
            cate[e.target.name] = e.target.value;
            setCate(cate);
            console.log(cate);
        }
    }
    let obj = {};
    const formSubmit = (e) => {
        const value = { ...cate };
        obj[length] = value;
        const data = { ...state.products, ...obj }
        console.log("submit")
        e.preventDefault();
        db.ref('productsCate/').set(data);
    }
    return (
        <React.Fragment>
            <div className="card mb-6" style={{ width: '50%', height: '75%' }}>
                <header className="card-header">
                    <p className="card-header-title">
                        <span className="icon"><i className="mdi mdi-ballot"></i></span>
                        Thêm Sản Phẩm
                    </p>
                </header>
                <form method="post" onSubmit={formSubmit} className="form-control">
                    <div className="control icons-left form-group">
                        <input name="nameFood" className="input form-control" type="text" placeholder="Tên " onChange={handleInput} required />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="control icons-left form-group">
                        <input name="name" className="input form-control" type="text" placeholder="Tên danh mục" onChange={handleInput} required />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="control icons-left form-group">
                        <input name="img" className=" form-control" type="file" placeholder="Ảnh" onChange={handleInput} required ref={ref} />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>

                    </div>
                    <div className="control icons-left form-group">
                        <input name="price" className="input form-control" type="number" placeholder="Giá" onChange={handleInput} required />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="control icons-left form-group">
                        <input name="review" className="input form-control" type="text" placeholder="Review" onChange={handleInput} required />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="control icons-left form-group">
                        <input name="reviewDemo" className="input form-control" type="text" placeholder="Mức độ đánh giá" onChange={handleInput} required />
                        <span className="icon left"><i className="mdi mdi-account"></i></span>
                    </div>
                    <div className="control icons-left form-group">
                        <input name="start" className="input form-control" type="date" placeholder="Ngày tạo" onChange={handleInput} required />
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
                        <div className="control">
                            <NavLink to="/products" className="button red">
                                Back
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>

        </React.Fragment>
    )
}