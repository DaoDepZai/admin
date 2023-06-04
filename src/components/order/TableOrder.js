import React, { useEffect, useState } from "react";
import db from "../../db";
import UserContext from "../../context/UserContext";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function TableOrder(props) {
    library.add(faEye);
    const [text, setText] = useState();
    const { state, dispatch } = React.useContext(UserContext);
    const refresh = () => {
        const dbRef = db.ref();
        dbRef.child("order").get().then((snapshot) => {
            if (snapshot.exists()) {
                state.order = snapshot.val();
                dispatch({ type: "update_order", payload: state.order });
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
    const confirmButton = {
        backgroundColor: "#4ca453",
        borderColor: "#4ca453",
        padding: "8px"
    };
    useEffect(() => {
        refresh();
    }, [])
    let obj = {};
    const ref = React.createRef();
    const confirmOrder = (item) => {
        item.checked = true;
        ref.current.style.backgroundColor = "#4ca453";
        ref.current.style.borderColor = "#4ca453";
        console.log("config");
        setText("Đã xác nhận")
        var postData = item;
        // Get a key for a new Post.
        var PostKey = item.id - 1;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/order/' + PostKey] = postData;
        return db.ref().update(updates);
    }
    return (

        <React.Fragment>
            <section className="is-title-bar">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <ul>
                        <li>Admin</li>
                        <li>Tables</li>
                    </ul>
                    <a href="https://justboil.me/" onclick="alert('Coming soon'); return false" target="_blank" className="button blue">
                        <span className="icon"><i className="mdi mdi-credit-card-outline"></i></span>
                        <span>Premium Demo</span>
                    </a>
                </div>
            </section>

            <div className="card has-table">
                <div className="card-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên Khách Hàng</th>
                                <th>Địa chỉ</th>
                                <th>Ngày đặt</th>
                                <th>Thời gian</th>
                                <th>Số khách</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.order.map(item => {
                                // if(item.checked) {
                                //     setText("Đã xác nhận");
                                // }else{
                                //     setText("Chờ xác nhận")
                                // }
                                // item.checked==true?setText("Đã xác nhận"):setText("Chờ xác nhận");
                                return (
                                    <tr className="text-center" key={item.id} style={{ height: '1.7rem' }}>
                                        <td data-label="Tên Khách Hàng">{item.name}</td>
                                        <td data-label="Địa chỉ">{item.address}</td>
                                        <td data-label="Ngày đặt">{item.date}</td>
                                        <td data-label="Thời gian">{item.hour}:{item.minute}</td>
                                        <td data-label="Số khách">{item.guests}</td>
                                        <td className="actions-cell">
                                            <div className="buttons right nowrap">
                                                <button className="button small red --jb-modal"
                                                    data-target="sample-modal-2" type="button"
                                                    onClick={() => confirmOrder(item)} ref={ref} style={item.checked ? confirmButton : {padding:'8px'}}>
                                                    {item.checked ? "Đã xác nhận" :
                                                        "Chờ xác nhận"}
                                                </button>
                                                <button className="button small green --jb-modal" data-target="sample-modal-2" type="button"
                                                >
                                                    <span className="icon"><FontAwesomeIcon icon={faEye} style={{ color: "#ffffff", }} /></span>
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}