import React from "react";
import UserContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";
export default function DetailOrderTable(props) {
    const { state, dispatch } = React.useContext(UserContext);
    return (
        <React.Fragment>
            {state ?
                <div className="card mb-6" style={{ width: '50%', height: '75%', border: "none" }}>
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-ballot"></i></span>
                            Thông tin Sản Phẩm
                        </p>
                    </header>
                    <form method="post" className="form-control">
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Tên </label>
                            <input className="input form-control col-9" type="text" required value={state.order_detail.name} disabled />
                        </div>
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Email </label>
                            <input className="input form-control col-9" type="text" required value={state.order_detail.email} disabled />

                        </div>

                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Số Điện Thoại </label>
                            <input className="input form-control col-9" type="number" required value={state.order_detail.phone} disabled />

                        </div>
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Địa chỉ </label>
                            <input className="input form-control col-9" type="text" required value={state.order_detail.address} disabled />

                        </div>
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Ngày đặt </label>
                            <input className="input form-control col-9" type="date" required value={state.order_detail.date} disabled />

                        </div>
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Số Khách </label>
                            <input className="input form-control col-9" type="number" required value={state.order_detail.guests} disabled />

                        </div>
                        <div className="control icons-left form-group row">
                            <label className="col-2 ">Giờ ăn </label>
                            <input className="input form-control col-9" type="text" required value={`${state.order_detail.hour}:${state.order_detail.minutes < 10 ? "0" + state.order_detail.minutes : state.order_detail.minutes}`} disabled />

                        </div>
                        <div className="field grouped mt-4" >
                            <div className="control">
                                <NavLink to="/order_table" className="button red" >
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