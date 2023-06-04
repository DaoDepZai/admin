import React from "react";
import TableProducts from "../components/Products/TableProducts";
import SectionProduct from "../components/Products/SectionProduct";
export default function ProductsPage(props) {
    return(
        <React.Fragment>
            <SectionProduct></SectionProduct>
            <TableProducts></TableProducts>
        </React.Fragment>
    )
}