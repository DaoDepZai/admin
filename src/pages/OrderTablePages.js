import React from "react";
import TableOrder from "../components/order/TableOrder";
import Nav from "../components/shared/Nav"
import Aside from '../components/shared/Aside';
export default function OrderTablePages(props) {
    return (
        <React.Fragment>
            <Nav />
            <Aside></Aside>
            <TableOrder></TableOrder>
        </React.Fragment>
    )
}