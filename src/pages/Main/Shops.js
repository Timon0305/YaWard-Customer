import React, {Component} from 'react';
import {Container, Row, Col, Button, Card, Nav, NavItem, NavLink} from "reactstrap";
import {Link} from 'react-router-dom';
import classnames from "classnames";
import "nouislider/distribute/nouislider.css";
import './main.css'

import Slide from './Slides';

import edit from '../../assets/customer/edit-icon.svg';

import {GoogleApiWrapper} from 'google-maps-react';
import ShopList from "./ShopList";
import TopOffers from "./TopOffers";
import TopProducts from './TopProducts';
import Occasions from './Occasions';
import {withNamespaces} from "react-i18next";

const LoadingContainer = props => <div>Loading...</div>;

class Shops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab : '5'
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
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
                    <Container fluid style={{'width': '95%', 'margin': 'auto'}}>
                        <Row>
                            <Col lg={12} className='mb-5 mt-5'>
                                <Slide/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl={12} lg={12}>
                                <div className='text-xl-left text-sm-center mb-5'>
                                    <Button className='text-primary' color='white'>
                                        {
                                            this.state.activeTab === '5' ? (
                                                <h2 className='text-primary' style={{'marginBottom': '0px'}}>
                                                    {this.props.t('All Flowers Shop at')}
                                                </h2>
                                            ) : null
                                        }
                                        {
                                            this.state.activeTab === '6' ? (
                                                <h2 className='text-primary' style={{'marginBottom': '0px'}}>
                                                    {this.props.t('Top Offers at')}
                                                </h2>
                                            ) : null
                                        }
                                        {
                                            this.state.activeTab === '7' ? (
                                                <h2 className='text-primary' style={{'marginBottom': '0px'}}>
                                                    {this.props.t('Top Products at')}
                                                </h2>
                                            ) : null
                                        }
                                        {
                                            this.state.activeTab === '8' ? (
                                                <h2 className='text-primary' style={{'marginBottom': '0px'}}>
                                                    {this.props.t('Occasions at')}
                                                </h2>
                                            ) : null
                                        }
                                    </Button>
                                    <Button className='ml-2 mr-2 mt-1 buttonStyle'>{localStorage.getItem('myAddressName')}</Button>
                                    <Button color='white' className='mt-1'> > </Button>
                                    <Link to='/'>
                                        <img src={edit} alt={edit} className='ml-2 mr-2 cursor' height='20px' />
                                    </Link>
                                </div>
                            </Col>
                            <Col xl={7} lg={0}/>
                        </Row>

                        <Row>
                            <Col xl={12}>
                                <Card style={{boxShadow: 'none'}} className='mainBorder'>
                                    <Nav pills className="navtab-bg nav-justified">
                                        <NavItem>
                                            <NavLink
                                                style={{border: '1px solid #E8E8E8', minWidth: '150px', fontSize: '30px'}}
                                                className={classnames({
                                                    active: this.state.activeTab === "5"
                                                })}
                                                onClick={() => {
                                                    this.toggle("5");
                                                }}
                                            >
                                                {this.props.t('Shop')}
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{border: '1px solid #E8E8E8', minWidth: '150px', fontSize: '30px'}}
                                                className={classnames({
                                                    active: this.state.activeTab === "6"
                                                })}
                                                onClick={() => {
                                                    this.toggle("6");
                                                }}
                                            >
                                                {this.props.t('Top Offers')}
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{border: '1px solid #E8E8E8', minWidth: '150px', fontSize: '30px'}}
                                                className={classnames({
                                                    active: this.state.activeTab === "7"
                                                })}
                                                onClick={() => {
                                                    this.toggle("7");
                                                }}
                                            >
                                                {this.props.t('Top Products')}
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{border: '1px solid #E8E8E8', minWidth: '150px', fontSize: '30px'}}
                                                className={classnames({
                                                    active: this.state.activeTab === "8"
                                                })}
                                                onClick={() => {
                                                    this.toggle("8");
                                                }}
                                            >
                                                {this.props.t('Occasions')}
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Card>
                            </Col>
                        </Row>

                        <Row className='mt-5 mb-5'>
                            {
                                this.state.activeTab === '5' ? (
                                    <ShopList myLocation = {this.props.location}/>
                            ) : null}
                            {
                                this.state.activeTab === '6' ? (
                                    <TopOffers/>
                            ) : null}
                            {
                                this.state.activeTab === '7' ? (
                                    <TopProducts />
                            ) : null}
                            {
                                this.state.activeTab === '8' ? (
                                    <Occasions />
                                ) : null
                            }
                        </Row>


                    </Container>
                </div>

            </React.Fragment>
        );
    }
}

export default withNamespaces(
    null
)(
    GoogleApiWrapper({
        apiKey: 'AIzaSyD8LVZs12SZOf5za-1Z5x3CqKrQ3oVCesY',
        LoadingContainer: LoadingContainer,
        v: '3'
    })(Shops)
)