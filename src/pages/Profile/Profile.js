import React, { Component } from 'react';
import {Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody} from "reactstrap";
import classnames from 'classnames';

import Account from "./Account";
import Addresses from "./Addresses";
import MyOccasions from "./MyOccasions";
import MyWishList from "./MyWishlist";
import MyOrders from "./MyOrders";
import MyTickets from "./MyTickets";
import portfolio_active from '../../assets/customer/portfolio.svg';
import portfolio_deactive from '../../assets/customer/portfolio (1).svg';
import bookmark_active from '../../assets/customer/bookmark.svg';
import bookmark_deactive from '../../assets/customer/bookmark (1).svg';
import occasion_active from '../../assets/customer/occasion.svg';
import occasion_deactive from '../../assets/customer/occasion (1).svg';
import wishlist_active from '../../assets/customer/wishlist.svg';
import wishlist_deactive from '../../assets/customer/wishlist (1).svg';
import test_active from '../../assets/customer/test.svg';
import test_deactive from '../../assets/customer/test (1).svg';
import manual_active from '../../assets/customer/manual.svg';
import logout from '../../assets/customer/logout(1).svg';
import {withNamespaces} from "react-i18next";
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            redirect: false
        };
        this.toggleTab = this.toggleTab.bind(this);

    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content" style={{'marginTop': '0px', 'background': 'white'}}>
                    <Container fluid>

                        <div className="checkout-tabs mt-5 p-lg-5">
                            <Row>
                                <Col lg="3 profileTab">
                                    <Nav className="flex-column mr-lg-5 mb-3" pills style={{display: 'block'}}>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggleTab('1'); }}
                                                style={{marginBottom: '0px'}}
                                            >
                                                <Row className='mt-3'>
                                                    <Col xs='2'>
                                                        {this.state.activeTab === '1' ? (
                                                            <img src={portfolio_active} alt={portfolio_active}/>
                                                        ) : (
                                                            <img src={portfolio_deactive} alt={portfolio_deactive} />
                                                        )}
                                                    </Col>
                                                    <Col xs='10'>
                                                        <p className='text-left font-size-22'>{this.props.t('Account')} {this.props.t('Information')}</p>
                                                    </Col>
                                                </Row>

                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggleTab('2'); }}
                                                style={{marginBottom: '0px'}}
                                            >
                                                <Row className='mt-3'>
                                                    <Col xs='2'>
                                                        {this.state.activeTab === '2' ? (
                                                            <img src={bookmark_deactive} alt={bookmark_deactive} />
                                                        ) : (
                                                            <img src={bookmark_active} alt={bookmark_active}/>
                                                        )}
                                                    </Col>
                                                    <Col xs='10'>
                                                        <p className='text-left font-size-22'>{this.props.t('My Addresses')}</p>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '3' })}
                                                onClick={() => { this.toggleTab('3'); }}
                                                style={{marginBottom: '0px'}}
                                            >
                                                <Row className='mt-3'>
                                                    <Col xs='2'>
                                                        {this.state.activeTab === '3' ? (
                                                            <img src={occasion_deactive} alt={occasion_deactive} />
                                                        ) : (
                                                            <img src={occasion_active} alt={occasion_active}/>
                                                        )}
                                                    </Col>
                                                    <Col xs='10'>
                                                        <p className='text-left font-size-22'>{this.props.t('My Occasions')}</p>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '4' })}
                                                onClick={() => { this.toggleTab('4'); }}
                                                style={{marginBottom: '0px'}}
                                            >
                                                <Row className='mt-3'>
                                                    <Col xs='2'>
                                                        {this.state.activeTab === '4' ? (
                                                            <img src={wishlist_deactive} alt={wishlist_deactive} />
                                                        ) : (
                                                            <img src={wishlist_active} alt={wishlist_active}/>
                                                        )}
                                                    </Col>
                                                    <Col xs='10'>
                                                        <p className='text-left font-size-22'>{this.props.t('My Wishlist')}</p>
                                                    </Col>
                                                </Row>

                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '5' })}
                                                onClick={() => { this.toggleTab('5'); }}
                                                style={{marginBottom: '0px'}}
                                            >
                                                <Row className='mt-3'>
                                                    <Col xs='2'>
                                                        {this.state.activeTab === '5' ? (
                                                            <img src={test_deactive} alt={test_deactive} />
                                                        ) : (
                                                            <img src={test_active} alt={test_active}/>
                                                        )}
                                                    </Col>
                                                    <Col xs='10'>
                                                        <p className='text-left font-size-22'>{this.props.t('My Orders')}</p>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '6' })}
                                                onClick={() => { this.toggleTab('6'); }}
                                                style={{marginBottom: '0px'}}
                                            >
                                                <Row className='mt-3'>
                                                    <Col xs='2'>
                                                        {this.state.activeTab === '6' ? (
                                                            <img src={manual_active} alt={manual_active} />
                                                        ) : (
                                                            <img src={manual_active} alt={manual_active}/>
                                                        )}
                                                    </Col>
                                                    <Col xs='10'>
                                                        <p className='text-left font-size-22'>{this.props.t('My Tickets')}</p>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '7' })}
                                                onClick={() => { this.toggleTab('7'); }}
                                                style={{marginBottom: '0px'}}
                                            >
                                                <Row className='mt-3'>
                                                    <Col xs='2'>
                                                        {this.state.activeTab === '7' ? (
                                                            <img src={logout} alt={logout} width='23' height='29' />
                                                        ) : (
                                                            <img src={logout} alt={logout} width='23' height='29' />
                                                        )}
                                                    </Col>
                                                    <Col xs='10'>
                                                        <p className='text-left text-primary font-size-22' onClick={() => this.logout}>{this.props.t('Logout')}</p>
                                                    </Col>
                                                </Row>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Col>
                                <Col lg="9">
                                    <Card>
                                        <CardBody>
                                            <TabContent activeTab={this.state.activeTab}>
                                                <TabPane tabId="1" role="tabpanel">
                                                    <Account/>
                                                </TabPane>
                                                <TabPane tabId="2" id="v-pills-payment" role="tabpane2" aria-labelledby="v-pills-payment-tab">
                                                    <Addresses/>
                                                </TabPane>
                                                <TabPane tabId="3" id="v-pills-confir" role="tabpane3">
                                                    <MyOccasions/>
                                                </TabPane>
                                                <TabPane tabId="4" id="v-pills-confir" role="tabpane4">
                                                    <MyWishList/>
                                                </TabPane>
                                                <TabPane tabId="5" id="v-pills-payment" role="tabpane5" aria-labelledby="v-pills-payment-tab">
                                                    <MyOrders/>
                                                </TabPane>
                                                <TabPane tabId="6" id="v-pills-confir" role="tabpane6">
                                                    <MyTickets/>
                                                </TabPane>
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>


                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(Profile);
