import React, { useState } from "react";
import {NavLink} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse,faGift ,faTable,faUsers,faPlus,faList,faMinus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Aside(props) {
  library.add(faHouse,faGift,faTable,faUsers,faPlus,faList,faMinus);
  const icon=React.createRef()
  const menuProSub = React.createRef();
  const [show, setShow] = useState(false);
  const showSubMenu = () => {
    setShow(!show);
    if (show) {
      icon.current.dangerouslySet=`<FontAwesomeIcon icon={faMinus} style={{color: "#ffffff",}} />`;
      menuProSub.current.style.display = "block";
    } else {
      icon.current.dangerouslySet=`<FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />`;
      menuProSub.current.style.display = "none";
    }
  }
  return (
    <aside className="aside is-placed-left is-expanded">
      <div className="aside-tools">
        <div>
          Admin <b className="font-black">One</b>
        </div>
      </div>
      <div className="menu is-menu-main">
        <p className="menu-label">Chung</p>
        <ul className="menu-list">
          <li className="active">
            <NavLink to="/">
              <span className="icon"><FontAwesomeIcon icon={faHouse}  style={{color: "#ffffff",}} /></span>
              <span className="menu-item-label text-left" >Dashboard</span>
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Chức năng</p>
        <ul className="menu-list">
          <li>
            <a href="login.html">
              <span className="icon"><FontAwesomeIcon icon={faGift} style={{color: "#ffffff",}} /></span>
              <span className="menu-item-label text-left">Quản lý đơn hàng</span>
            </a>
          </li>
          <li>
            <NavLink to="/order_table">
              <span className="icon"><FontAwesomeIcon icon={faTable} style={{color: "#ffffff",}} /></span>
              <span className="menu-item-label text-left">Quản lý đặt bàn</span>
            </NavLink>
          </li>
          <li>
            <a href="login.html">
              <span className="icon"><FontAwesomeIcon icon={faUsers} style={{color: "#ffffff",}} /></span>
              <span className="menu-item-label text-left">Quản lý người dùng</span>
            </a>
          </li>
          <li>
            <a className="dropdown">
              <span className="icon"><FontAwesomeIcon icon={faList} style={{color: "#ffffff",}} /></span>
              <span className="menu-item-label text-left" onClick={showSubMenu}>Quản lý sản phẩm</span>
              <span className="icon" ref={icon}><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} /></span>
            </a>
            <ul ref={menuProSub} >
              <li>
                <NavLink to="/categories">
                  <span>Danh mục</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/products">
                  <span>Sản phẩm</span>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>

      </div>
    </aside>
  )
}