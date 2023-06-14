import React, { useEffect } from "react";
import UserContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import db from "../../db";
export default function TableUser(props) {
    const { state, dispatch } = React.useContext(UserContext);
    useEffect(() => {
        console.log(state.user);
    }, [])
    const handleShow = (i) => {
        state.user_detail = i;
        dispatch({ type: "user_detail", payload: state.user_detail });
        localStorage.setItem("state", JSON.stringify(state));
        setTimeout(() => {
            dispatch({ type: "hide_loading" });
        }, 1000)
    }
    const deleteCate = (i) => {
        console.log("deleteCate");
        console.log(i.id)
        if (window.confirm("Bạn chắc chắn muốn xóa danh mục này?")) {
            const objectRef = db.ref(`/user/${i.id - 1}`);
            objectRef.remove()
                .then(() => {
                    console.log('Object deleted successfully!');
                })
                .catch((error) => {
                    console.error(`Error deleting object: ${error}`);
                })
        }
    }
    return (
        <React.Fragment>
            <section class="is-title-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <ul>
                        <li>Admin</li>
                        <li>User</li>
                    </ul>
                </div>
            </section>

            <section class="is-hero-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <h1 class="title">
                        Admin
                    </h1>
                    <div className="d-flex items-center">
                        <button className="button small " data-target="sample-modal" type="button" >
                            <span className="icon"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#3d0003", }} /></span>
                        </button>
                        <input name="nameFood" type="text" class="form-control input " placeholder="searching..." ></input>
                        <NavLink class="btn btn-success ms-3" to="/add_product">Thêm</NavLink>

                    </div>
                </div>
            </section>
            <table className="table" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên người dùng</th>
                        <th className="text-left">Các chức năng</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        state.user ? state.user.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">
                                        {item.id}
                                    </td>
                                    <td data-label="Name" className="text-center">{item.name}</td>

                                    <td className="actions-cell ">
                                        <div className="buttons center nowrap">
                                            <NavLink to="/user_detail" onClick={() => handleShow(item)} className="button small --jb-modal " style={{ backgroundColor: 'rgb(203,112,0)', borderOpacity: '1', color: 'rgb(255,255,255,0.8)' }} data-target="sample-modal-2" type="button">
                                                <span className="icon">Sửa</span>
                                            </NavLink>
                                            <button onClick={() => deleteCate(item)} className="button small red --jb-modal" data-target="sample-modal" type="button">
                                                <span className="icon">Xóa</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : <div>Không có danh mục phù hợp</div>
                    }
                </tbody>
            </table>
        </React.Fragment>
    )
}