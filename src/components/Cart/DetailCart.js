import React, { useEffect } from "react";
import UserContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";
export default function DetailCart(props) {
    const { state, dispatch } = React.useContext(UserContext);
    useEffect(() => {
        console.log(state.cart_detail.listPro)
    }, [])
    return (
        <React.Fragment>
            {state ?
                <div className="card mb-6" style={{ width: '50%', height: '75%', border: "none" }}>
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-ballot"></i></span>
                            Thông tin đơn hàng
                        </p>
                    </header>
                    <form method="post" className="form-control">
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Tên </label>
                            <input className="input form-control col-9" type="text" required value={state.cart_detail.order["contact-name"]} disabled />
                        </div>
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Email </label>
                            <input className="input form-control col-9" type="text" required value={state.cart_detail.order["contact-email"]} disabled />

                        </div>

                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Số Điện Thoại </label>
                            <input className="input form-control col-9" type="text" required value={state.cart_detail.order["contact-phone"]} disabled />

                        </div>
                        {/* <div className="control icons-left form-group row">
                            <label className="col-2 ">Địa chỉ </label>
                            <input className="input form-control col-9" type="text" required value={state.cart_detail.address} disabled />

                        </div> */}
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Ngày đặt </label>
                            <input className="input form-control col-9" type="date" required value={state.cart_detail.day} disabled />

                        </div>
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Danh sách các món </label>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tên món</th>
                                        <th>Danh mục</th>
                                        <th>Giá</th>
                                        <th>Đánh giá</th>
                                        <th>Ngày tạo</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {state ? state.cart_detail.listPro.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td data-label="Name">{item.nameFood}</td>
                                                <td data-label="Company">{item.name}</td>
                                                <td data-label="City">{item.price}</td>
                                                <td data-label="City">{item.reviewDemo}/5</td>

                                                <td data-label="Created">
                                                    <small className="text-gray-500" title="Oct 25, 2021">{item.start}</small>
                                                </td>

                                            </tr>
                                        )

                                    }) : <div>Không tồn tại sản phẩm</div>}

                                </tbody>
                            </table>

                        </div>
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Giờ ăn </label>
                            <input className="input form-control col-9" type="text" required value={`${state.cart_detail.order["contact-hour"]}:${state.cart_detail.order["contact-minute"] < 10 ? "0" + state.cart_detail.order["contact-minute"] : state.cart_detail.order["contact-minute"]}`} disabled />
                        </div>
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Tổng tiền </label>
                            <input className="input form-control col-9" type="text" required value={state.cart_detail.total} disabled />
                        </div>
                        <div className="field grouped mt-4" >
                            <div className="control">
                                <NavLink to="/cart" className="button red" >
                                    Back
                                </NavLink>
                            </div>
                        </div>
                    </form>
                </div>
                : <div>Không có sản phảm</div>}
        </React.Fragment>
    )
}