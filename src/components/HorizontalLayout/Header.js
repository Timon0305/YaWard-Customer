import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logoDark from "../../assets/customer/Yaward-Logo.svg";
import { toggleRightSidebar } from "../../store/actions";

import { withNamespaces } from 'react-i18next';
import CartMenu from "../CommonForBoth/TopbarDropdown/CartMenu";
import {Progress} from "reactstrap"

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isSearch: false,
        token: localStorage.getItem('authCustomer')
    };
  }

  render() {
      const token = this.state.token;

        return (
          <React.Fragment>
            <header id="page-topbar">
                <Progress color="secondary" value={17} style={{background: '#BA1F6A'}}/>
              <div className="navbar-header" style={{background: 'white'}}>
                <div className="d-flex">
                  <div className="navbar-brand-box">
                    <Link to="/dashboard" className="logo ">
                      <span className="logo-lg">
                        <img src={logoDark} alt="" height="69" width='120' />
                      </span>
                    </Link>
                  </div>
                </div>

                  <div className="d-flex">

                      <LanguageDropdown />

                      {token ? (
                          <NotificationDropdown />
                      ) : null}

                      <ProfileMenu />

                      <CartMenu/>
                  </div>
              </div>
            </header>
          </React.Fragment>
        );
  }
}

const mapStatetoProps = state => {
  const { layoutType } = state.Layout;
  return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(withNamespaces()(Header));
