import React, { useEffect } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import db from "../../db";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
export default function TableCart(props) {
    library.add(faEye)
    const { state, dispatch } = React.useContext(UserContext)
    const refsArr = Array.from({ length: state.cart.length }, () => React.createRef())
    const refresh = () => {
        const dbRef = db.ref();
        dbRef.child("/cartlist").get().then((snapshot) => {
            if (snapshot.exists()) {
                state.cart = snapshot.val();
                dispatch({ type: "update_cart", payload: state.cart });
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
    const updateSelect = () => {
        state.cart.forEach((item, index) => {
            for (let i = 0; i < 4; i++) {
                if (item[refsArr[index].current.options[i].value] == true) {
                    for (let j = 0; j < i; j++) {
                        refsArr[index].current.options[j].disabled = true;
                    }
                    refsArr[index].current.options[i].selected = true;
                }
            }
        })
    }
    const updateStatus = (item, index) => {
        console.log("config");
        item[refsArr[index].current.value] = true
        const arrCheck = [
            "isConfirm", "isShip", "isPurchased"
        ]
        var postData = item;
        for (let i = 0; i < arrCheck.length; i++) {
            if (refsArr[index].current.value != arrCheck[i]) {
                item[arrCheck[i]] = false;
            }
        }
        // Get a key for a new Post.
        var PostKey = item.id - 1;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/cartlist/' + PostKey] = postData;
        return db.ref().update(updates);
    }
    const deleteCart = (i) => {
        console.log("deletePro");
        if (window.confirm("Bạn chắc chắn muốn xóa danh mục này?")) {
            const objectRef = db.ref(`/cartlist/${i.id - 1}`);
            objectRef.remove()
                .then(() => {
                    console.log('Object deleted successfully!');
                })
                .catch((error) => {
                    console.error(`Error deleting object: ${error}`);
                })
        }
        refresh();
    }
    const config = (item, index) => {
        updateStatus(item, index);
        refresh();
        updateSelect();
    }
    useEffect(() => {
        refresh();
        updateSelect();
        state.cart_statis=state.cart.sort((a,b)=>new Date(a.order["contact-time"]).getTime()-new Date(b.order["contact-time"]).getTime());
        dispatch({type: 'get_cart_statis',payload: state.cart_statis});
        localStorage.setItem('state',JSON.stringify(state));
        setTimeout(()=>{
            dispatch({type:"hide_loading"});
        },1000)
        
    }, [])
    
    const checkDisabled = (i) => {
        if (i.guest_cancel == false) {

            return true;
        }
        else {
            return false;
        }
    };
    const detailCart=(i)=>{
        state.cart_detail=i;
        localStorage.setItem("state",JSON.stringify(state));
        dispatch({type: "show_cart_detail",payload:state.cart_detail})
        setTimeout(()=>{
            dispatch({type: "hide_loading"})
        },1000)
    }
    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Số điện thoại</th>
                        <th>Ngày đặt</th>
                        <th>Giờ</th>
                        <th>Lời nhắn</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>

                    {state ? state.cart.map((i, index) => {
                        return (
                            <tr >
                                <td data-label="Name">{i.order["contact-name"]}</td>
                                <td data-label="Company">{i.order["contact-phone"]}</td>
                                <td data-label="City">{i.day}</td>
                                <td data-label="City">{`${i.order["contact-hour"]}:${i.order["contact-minute"] < 10 ? "0" + i.order["contact-minute"] : i.order["contact-minute"]}`}</td>
                                <td data-label="City">{i.order["contact-message"]}</td>

                                <td data-label="Created">
                                    {i.total}
                                </td>
                                <td className="actions-cell">
                                    <div className="buttons right nowrap">
                                        <select className="form-control w-25 mx-2" ref={refsArr[index]}>
                                            <option value="default">Chờ xác nhận</option>
                                            <option value="isConfirm" >Đã xác nhận</option>
                                            <option value="isShip" >Đã vận chuyển</option>
                                            <option value="isPurchased">Đã thanh toán</option>
                                        </select>
                                        <button className="button green w-1 --jb-modal " onClick={() => config(i, index)}>Cập nhật trạng thái</button>
                                        {/* <button type="button" class="button red w-1 --jb-modal" onClick={() => deleteCart(i)} style={i.guest_cancel == false ? {
                                            background: "#c9bdbd",
                                            border: "none",
                                            color: "#fff",
                                            cursor: "auto"
                                        }:{}} disabled={() => checkDisabled(i)}>Hủy đơn</button> */}
                                        <NavLink to="/cart_detail" className="button small green --jb-modal" data-target="sample-modal-2" type="button" onClick={()=>detailCart(i)}>
                                            <span className="icon"><FontAwesomeIcon icon={faEye} style={{ color: "#ffffff", }} /></span>
                                        </NavLink>
                                    </div>
                                </td>
                            </tr>
                        )
                    }) : <div>Không tồn tại dữ liệu</div>}


                </tbody>
            </table>
        </React.Fragment>
    )
}