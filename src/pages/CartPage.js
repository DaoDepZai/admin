import React from "react";
import Aside from "../components/shared/Aside";
import Nav from "../components/shared/Nav";
import TableCart from "../components/Cart/TableCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
export default function CartPage(props) {
    const findProduct=()=>{

    }
    const handleInput=()=>{

    }
    return (
        <React.Fragment>
            <Aside></Aside>
            <Nav></Nav>
            <section class="is-title-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <ul>
                        <li>Admin</li>
                        <li>Đơn hàng</li>
                    </ul>
                </div>
            </section>

            <section class="is-hero-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <h1 class="title">
                        Đơn hàng
                    </h1>
                    <div className="d-flex items-center">
                        <button className="button small " data-target="sample-modal" type="button" onClick={findProduct}>
                            <span className="icon"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#3d0003", }} /></span>
                        </button>
                        <input name="nameFood" type="text" class="form-control input " placeholder="searching..." onChange={handleInput}></input>
                    </div>
                </div>
            </section>
            <TableCart></TableCart>

        </React.Fragment>
    )
}