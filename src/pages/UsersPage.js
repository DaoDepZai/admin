import React from "react";
import Aside from "../components/shared/Aside";
import Nav from "../components/shared/Nav";
import TableUser from "../components/Users/TableUser";
export default function UsersPage(props) {
    return (
        <React.Fragment>
            <Aside></Aside>
            <Nav></Nav>
            <TableUser></TableUser>
        </React.Fragment>
    )
}