import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from "../../context/UserContext";
export default function SectionProduct(props) {
    library.add(faMagnifyingGlass);
    const { state, dispatch } = React.useContext(UserContext);
    const [cate, setCate] = useState({
        nameFood:'',
    });
    useEffect(() => {
        console.log(state.products);
    }, [])
    const handleInput = (e) => {
        cate[e.target.name] = e.target.value;
        setCate(cate);
    }
    const findProduct = () => {
        console.log(cate)
        state.products =cate? state.products.filter(product => product.nameFood.toLowerCase().indexOf(cate.nameFood.toLowerCase()) >= 0):state.products
        dispatch({ type: "update_products", payload: state.products });
        localStorage.setItem('state', JSON.stringify(state));
        setTimeout(() => {
            dispatch({ type: "hide_loading" });
        }, 1000)
        window.location.reload();
    }
    return (
        <React.Fragment>
            <section class="is-title-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <ul>
                        <li>Admin</li>
                        <li>Sản phẩm</li>
                    </ul>
                </div>
            </section>

            <section class="is-hero-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <h1 class="title">
                        Sản phẩm
                    </h1>
                    <div className="d-flex items-center">
                        <button className="button small " data-target="sample-modal" type="button" onClick={findProduct}>
                            <span className="icon"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#3d0003", }} /></span>
                        </button>
                        <input name="nameFood" type="text" class="form-control input " placeholder="searching..." onChange={handleInput}></input>
                        <NavLink class="btn btn-success ms-3" to="/add_product">Thêm</NavLink>

                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}