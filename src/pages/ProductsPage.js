import React from "react";
import TableProducts from "../components/Products/TableProducts";
import SectionProduct from "../components/Products/SectionProduct";
import Nav from "../components/shared/Nav"
import Aside from '../components/shared/Aside';
export default function ProductsPage(props) {
    return (
        <React.Fragment>
            <Nav />
            <Aside></Aside>
            <SectionProduct></SectionProduct>
            <TableProducts></TableProducts>
        </React.Fragment>
    )
}