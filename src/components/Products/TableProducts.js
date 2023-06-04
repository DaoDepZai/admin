import React, { useEffect, useState } from "react";
import db from "../../db";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from "../../context/UserContext";
import { NavLink } from 'react-router-dom'
export default function TableProducts(props) {
    library.add(faEye, faTrash);
    const { state, dispatch } = React.useContext(UserContext);
    const refresh = () => {
        const dbRef = db.ref();
        dbRef.child("productsCate").get().then((snapshot) => {
            if (snapshot.exists()) {
                state.products = snapshot.val();
                dispatch({ type: "update_products", payload: state.products });
                localStorage.setItem('state', JSON.stringify(state));
                setTimeout(()=>{
                    dispatch({ type: "hide_loading" });
                },1000)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const [data, setData] = useState(JSON.parse(localStorage.getItem('state')));
    const [pages, setPages] = useState()
    const arrayPages = [];
    useEffect(() => {
        refresh();
        console.log(data.products)
        if (data.products.length > 0) {
            setPages(data.products.length % 9 == 0 ? data.products.length / 9 : parseInt(data.products.length / 9) + 1);
        }
        for (let i = 0; i < pages; i++) {
            arrayPages.push(i + 1);
        }
       db.ref('/productsCate/34').remove();
    }, [])
    const deletePro = (i) => {
        console.log("deletePro");
        if (window.confirm("Bạn chắc chắn muốn xóa danh mục này?")) {
            const objectRef = db.ref(`/productsCate/${i.id-1}`);
            objectRef.remove()
                .then(() => {
                    console.log('Object deleted successfully!');
                })
                .catch((error) => {
                    console.error(`Error deleting object: ${error}`);
                })
        }
        window.location.reload();
    }
    const product_detail = (product) => {
        state.product_detail = product;
        dispatch({ type: "show_product_detail", payload: state.product_detail });
        localStorage.setItem('state', JSON.stringify(state));
    }
    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Danh mục</th>
                        <th>Giá</th>
                        <th>Đánh giá</th>
                        <th>Ngày tạo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?data.products.map((product,index) => {
                            if(product!==null){
                                return (
                                    <tr key={index}>
                                        <td data-label="Name">{product.nameFood}</td>
                                        <td data-label="Company">{product.name}</td>
                                        <td data-label="City">{product.price}</td>
                                        <td data-label="Progress" className="progress-cell">
                                            <progress max="100" value={product.reviewDemo}>{product.reviewDemo}</progress>
                                        </td>
                                        <td data-label="Created">
                                            <small className="text-gray-500" title="Oct 25, 2021">{product.start}</small>
                                        </td>
                                        <td className="actions-cell">
                                            <div className="buttons right nowrap">
                                                <NavLink to="/detail_product" className="button small green --jb-modal" data-target="sample-modal-2" type="button" onClick={() => product_detail(product)}>
                                                    <span className="icon"><FontAwesomeIcon icon={faEye} style={{ color: "#ffffff", }} /></span>
                                                </NavLink>
                                                <button className="button small red --jb-modal" data-target="sample-modal" type="button" onClick={() => deletePro(product)}>
                                                    <span className="icon"><FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff", }} /></span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        }):<div>Không có sản phẩm phù hợp</div>
                    }

                </tbody>
            </table>
            <div class="table-pagination">
                <div class="flex items-center justify-between">
                    <div class="buttons">
                        <button type="button" class="button active">{1}</button>
                        {
                            arrayPages.map(i => {
                                return (
                                    <button type="button" class="button active">{i}</button>
                                )
                            })
                        }
                    </div>
                    <small></small>
                </div>
            </div>
        </React.Fragment>
    )
}