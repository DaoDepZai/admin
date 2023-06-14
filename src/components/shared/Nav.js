import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
export default function Nav(props) {
  library.add(faRightFromBracket, faUser);
  const {state,dispatch}=React.useContext(UserContext)
  return (
    <div>
      <nav id="navbar-main" className="navbar is-fixed-top" style={{top:"-4em"}}>
        <div className="navbar-brand is-right">
          <a className="navbar-item --jb-navbar-menu-toggle" data-target="navbar-menu">
            <span className="icon"><i className="mdi mdi-dots-vertical mdi-24px"></i></span>
          </a>
        </div>
        <div className="navbar-menu" id="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item dropdown has-divider">
              <a className="navbar-link">
                <span className="icon"><FontAwesomeIcon icon={faUser} /></span>
                <span>Chào mừng  {state.user_login.name} trở lại</span>

              </a>

              <div className="navbar-item dropdown has-divider has-user-avatar">
                <NavLink to="/" title="Log out" className="navbar-item desktop-icon-only">
                  <span className="icon"><FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#081730", }} /></span>
                  <span>Log out</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}