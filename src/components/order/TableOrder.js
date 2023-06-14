import React, { useEffect, useState } from "react";
import db from "../../db";
import UserContext from "../../context/UserContext";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
export default function TableOrder(props) {
    library.add(faEye);
    const detailRef = React.createRef();
    const { state, dispatch } = React.useContext(UserContext);
    const refresh = () => {
        const dbRef = db.ref();
        dbRef.child("Order").get().then((snapshot) => {
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
        console.log(typeof state.order)
    }, [])
    let obj = {};
    const ref = React.createRef();
    const confirm = (item) => {
        confirmOrder(item);
        refresh();

    }
    const confirmOrder = (item) => {
        item.checked = true;
        console.log("config");
        var postData = item;
        // Get a key for a new Post.
        var PostKey = item.id - 1;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/Order/' + PostKey] = postData;
        return db.ref().update(updates);
    }
    const detailOrder = (item) => {
        state.order_detail = item;
        dispatch({ type: "update_order", payload: state.order_detail });
        localStorage.setItem('state', JSON.stringify(state));
        setTimeout(() => {
            dispatch({ type: "hide_loading" });
        }, 1000)
    }
    return (

        <React.Fragment>
            <section className="is-title-bar">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <ul>
                        <li>Admin</li>
                        <li>Đặt bàn</li>
                    </ul>

                </div>
            </section>
            <h1 class="title text-left my-4 mx-3">
                Đặt bàn
            </h1>
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
                            {state ? state.order.map(item => {
                                if (item != null) {
                                    return (
                                        <tr className="text-center" key={item.id} style={{ height: '1.7rem' }}>
                                            <td data-label="Tên Khách Hàng">{item.name}</td>
                                            <td data-label="Địa chỉ">{item.address}</td>
                                            <td data-label="Ngày đặt">{item.date}</td>
                                            <td data-label="Thời gian">{item.hour}:{item.minutes < 10 ? "0" + item.minutes : item.minutes}</td>
                                            <td data-label="Số khách">{item.guests}</td>
                                            <td className="actions-cell">
                                                <div className="buttons right nowrap">
                                                    <button className="button small red --jb-modal"
                                                        data-target="sample-modal-2" type="button"
                                                        onClick={() => confirm(item)} ref={ref} style={item.checked ? confirmButton : { padding: '8px' }}>
                                                        {item.checked ? "Đã xác nhận" :
                                                            "Chờ xác nhận"}
                                                    </button>
                                                    <NavLink to="/detail_order" className="button small green --jb-modal" data-target="sample-modal-2" type="button"
                                                        onClick={() => detailOrder(item)} ref={detailRef}>
                                                        <span className="icon"><FontAwesomeIcon icon={faEye} style={{ color: "#ffffff", }} /></span>
                                                    </NavLink>

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                // if(item.checked) {
                                //     setText("Đã xác nhận");
                                // }else{
                                //     setText("Chờ xác nhận")
                                // }
                                // item.checked==true?setText("Đã xác nhận"):setText("Chờ xác nhận");

                            }) : <div>Không có đơn đặt bàn</div>}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}