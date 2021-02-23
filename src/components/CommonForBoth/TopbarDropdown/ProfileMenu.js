import React, { Component } from 'react';
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link, Redirect} from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import userAvatar from '../../../assets/customer/teacher.svg';
import lock from '../../../assets/customer/padlock.svg';
import {successToastr} from "../../../pages/Toastr";
class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            token: localStorage.getItem('authCustomer'),
            redirect: false,
            username: localStorage.getItem('name')
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    logout = () => {
        localStorage.clear();
        successToastr('Successfully Log out');
        this.setState({
            token: '',
            redirect: true,
        })
    };


    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='dashboard' />
        }

        const token = this.state.token;
        if (token) {
            this.first_name = jwtDecode(token)['result']['first_name'];
        }

        return (
            <React.Fragment>
                {token ? (
                    <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block" >
                        <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                            <img className="rounded-circle header-profile-user" src={userAvatar} alt="Header Avatar"  />
                            <span className="d-none d-xl-inline-block ml-2 mr-1 text-primary">{this.first_name}</span>
                            <i className="mdi mdi-chevron-down d-none d-xl-inline-block text-primary"/>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag="a" href="profile">
                                <i className="bx bx-user font-size-16 align-middle mr-1"/>
                                {this.props.t('Profile')}
                            </DropdownItem>
                            <DropdownItem tag="a" href="/crypto-wallet">
                                <i className="bx bx-wallet font-size-16 align-middle mr-1"/>
                                {this.props.t('My Wallet')}
                            </DropdownItem>
                            <div className="dropdown-divider"/>
                            <Link to="/dashboard" className="dropdown-item">
                                <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"/>
                                <span onClick={this.logout}>{this.props.t('Logout')}</span>
                            </Link>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <div className='flex-center' style={{alignItems: 'center', display: 'flex'}}>
                        <span className='ml-2 text-secondary'>|</span>
                        <img src={lock} alt={lock} height='20px' className='mr-2 ml-3' />
                        <Link to='/login'>
                            <Button color='white' className='btn btn-white'>
                                <span className='text-primary font-size-18'>Log in</span>
                            </Button>
                        </Link>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(ProfileMenu));
