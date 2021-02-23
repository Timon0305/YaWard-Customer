import React, {Component} from 'react';
import {
    Container, Row, Col, Nav, NavItem, NavLink, Card, FormGroup, Button, Input, Label, CardBody, Modal, ModalBody
} from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import MyCart from "./MyCart";
import './checkout.css';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {withNamespaces} from "react-i18next";
import classnames from "classnames";
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";
import MuiPhoneNumber from "material-ui-phone-number";
import "react-datepicker/dist/react-datepicker.css";

import giftImage from '../../assets/customer/flower(2).svg';
import respect from '../../assets/customer/respect.svg';
import calendar from '../../assets/customer/Schedue.svg';
import occasion from '../../assets/customer/occasion.svg';
import axios from "axios";
import {webUrl} from "../../config";
import deliveryCard from '../../assets/customer/Money.svg';
import creditCard from '../../assets/customer/CC Icon.svg';
import payPal from '../../assets/customer/paypal.svg';
import stcCard from '../../assets/customer/stc pay.svg';
import applyCard from '../../assets/customer/apple pay.svg';
import flowerTrack from '../../assets/customer/cycle-flower.svg';
import flowerHouse from '../../assets/customer/flower(5).svg';

const token = localStorage.getItem('authCustomer');
const url = webUrl + '/v3/api/customer/checkout/';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderTab : '1',
            dateTab: '1',
            timeTab: '1',
            paymentTab: '1',
            recipientTab: '1',
            customer: [],
            occasion: [],
            isModal: false,
            isModal1: false,
            startDate: new Date(),
            selectedOccasion: '',
            setChecked: false,
            formData: {
                username: '',
                phone: ''
            },
    };
        this.orderToggle = this.orderToggle.bind(this);
        this.dateToggle = this.dateToggle.bind(this);
        this.timeToggle = this.timeToggle.bind(this);
        this.paymentToggle = this.paymentToggle.bind(this);
        this.recipientToggle = this.recipientToggle.bind(this)
    }

    componentDidMount() {
        axios.get(url + 'getAddress', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            this.setState({customer: res['data']['customer']})
        });

        axios.get(url + 'getOccasion' , {
            headers: {
                'Authorization': token
            }
        })
        .then(res => {
            this.setState({occasion: res['data']['occasions']})
        })
        .catch(err => console.log(err));
    }

    orderToggle(tab) {
        if (this.state.orderTab !== tab) {
            this.setState({
                orderTab: tab
            });
        }
    }

    dateToggle(tab) {
        if (this.state.dateTab !== tab) {
            this.setState({
                dateTab: tab
            });
        }
    }

    recipientToggle(tab) {
        if (this.state.recipientTab !== tab) {
            this.setState({
                recipientTab: tab
            });
        }
    };

    timeToggle(tab) {
        if (this.state.timeTab !== tab) {
            this.setState({
                timeTab: tab
            });
        }
    }

    paymentToggle(tab) {
        if (this.state.paymentTab !== tab) {
            this.setState({
                paymentTab: tab
            });
        }
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleSubmit() {

    }

    selectOccasion = (event, value) => {
        this.setState({
            selectedOccasion: value.category
        })
    };

    selectRecipient = () => {
        this.setState({setChecked: !this.state.setChecked});
    };

    handleValidChange = (event) => {
        const {formData} = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({formData});
    };

    addRecipient = () => {

    };

    render() {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const {customer, startDate, setChecked, formData} = this.state;

        let pickDate = null;
        if (new Date().toDateString() === startDate.toDateString()) {
            pickDate = null
        } else {
            pickDate = startDate
        }

        const occasions = this.state.occasion;
        const itemOccasion = [];
        for (let i = 0; i < occasions.length; i++) {
            itemOccasion.push(<option className='font-size-18 p-2' key={i} value={occasions[i]}>{occasions[i]}</option>)
        }

        return (
            <React.Fragment>
                <div className="page-content" style={{'marginTop': '70px', 'background': 'white'}}>
                <Container fluid style={{width: '98%'}}>
                    <Row className='checkout'>
                        <Col xl={10} lg={9} className='pr-lg-5'>
                            <h4 className='text-primary borderBottom'>Promo Code</h4>
                            <ValidatorForm className="needs-validation mt-5" onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col md={8}>
                                        <FormGroup>
                                            <TextValidator
                                                name="address"
                                                label = {this.props.t("Have a Coupon ?")}
                                                onChange={this.handleChange}
                                                errormessage={['Please provide a valid Dist.']}
                                                validators = {['required']}
                                                style={{width: '100%'}}
                                                />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <Button color='primary'
                                                className='h3 btn btn-block waves-effect waves-light borderRadius'
                                                type="submit">
                                            <span className='font-size-22'>{this.props.t('Apply')} {this.props.t('Code')}</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </ValidatorForm>

                            <Row>
                                <Col xs={12}>
                                    <h4 className='text-primary borderBottom mt-5'>Type of Order</h4>
                                </Col>
                            </Row>

                            <Row className='mt-4 mb-3 '>
                                <Col md={6}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{
                                                        border: '1px solid #E8E8E8',
                                                        borderRadius: '0 0 0 8px',
                                                    }}
                                                    className={classnames({
                                                        active: this.state.orderTab === "1"
                                                    })}
                                                    onClick={() => {
                                                        this.orderToggle("1");
                                                    }}
                                                >
                                                    <img src={giftImage} alt={giftImage}/>
                                                    <span className='text-dark tabAlign ml-5'>{this.props.t('Send')} {this.props.t('Gift')}</span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 0'}}
                                                    className={classnames({
                                                        active: this.state.orderTab === "2"
                                                    })}
                                                    onClick={() => {
                                                        this.orderToggle("2");
                                                    }}
                                                >
                                                    <img src={respect} alt={respect} height='46px'/>
                                                    <span className='text-dark tabAlign ml-5'>
                                                        {this.props.t('For')} {this.props.t('Me')}
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                            </Row>

                            {this.state.orderTab === '2' ? (
                                <div>
                                    <Row>
                                        <Col xs={12}>
                                            <h4 className='text-primary borderBottom mt-3'>How do you want to receive the order?</h4>
                                        </Col>
                                    </Row>

                                    <Row className='mt-4 mb-3 '>
                                        <Col md={6}>
                                            <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                                <Nav pills className="navtab-bg nav-justified">
                                                    <NavItem>
                                                        <NavLink
                                                            style={{
                                                                border: '1px solid #E8E8E8',
                                                                borderRadius: '0 0 8px 8px',
                                                            }}
                                                            className={classnames({
                                                                active: this.state.recipientTab === "1"
                                                            })}
                                                            onClick={() => {
                                                                this.recipientToggle("1");
                                                            }}
                                                        >
                                                            <img src={flowerTrack} alt={flowerTrack}/>
                                                            <span className='text-dark tabAlign ml-5'>
                                                                Delivery
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                                <Nav pills className="navtab-bg nav-justified">
                                                    <NavItem>
                                                        <NavLink
                                                            style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                            className={classnames({
                                                                active: this.state.recipientTab === "2"
                                                            })}
                                                            onClick={() => {
                                                                this.recipientToggle("2");
                                                            }}
                                                        >
                                                            <img src={flowerHouse} alt={flowerHouse} height='41px'/>
                                                            <span className='text-dark tabAlign ml-5'>
                                                                Pick Up
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null}

                            <Row>
                                <Col xs={12}>
                                    <h4 className='text-primary borderBottom mt-3'>Date and Time of Receipt</h4>
                                </Col>
                            </Row>

                            <Row className='mt-4 mb-3 '>
                                <Col xl={3}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.dateTab === "1"
                                                    })}
                                                    onClick={() => {
                                                        this.dateToggle("1");
                                                    }}
                                                >
                                                    <span className='text-primary font-size-22 mr-4'>{this.props.t('Today')}</span>
                                                    <span className='text-dark font-size-22'>
                                                        {new Date().toDateString()}
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col xl={3}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.dateTab === "2"
                                                    })}
                                                    onClick={() => {
                                                        this.dateToggle("2");
                                                    }}
                                                >
                                                    <span className='text-primary font-size-22 mr-4'>{this.props.t('Tomorrow')}</span>
                                                    <span className='text-dark font-size-22'>
                                                        {tomorrow.toDateString()}
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col xl={3}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.dateTab === "3"
                                                    })}
                                                    onClick={() => {
                                                        this.dateToggle("3");
                                                        this.setState({ isModal: !this.state.modal })
                                                    }}
                                                    to = '#'
                                                >
                                                    {
                                                        pickDate ? (
                                                            <span className='text-dark font-size-22'>
                                                                {pickDate.toDateString()}
                                                            </span>
                                                        ) : (
                                                            <div>
                                                                <img src={calendar} alt={calendar}/>
                                                                <span className='text-primary font-size-22 ml-4' style={{verticalAlign: 'bottom'}}>
                                                                    {this.props.t('Pick')} {this.props.t('a')} {this.props.t('Date')}
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                </NavLink>

                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col xl={3}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.dateTab === "4"
                                                    })}
                                                    onClick={() => {
                                                        this.dateToggle("4");
                                                        this.setState({ isModal1: !this.state.modal1 })
                                                    }}
                                                    to='#'
                                                >
                                                    {
                                                        this.state.selectedOccasion ? (
                                                            <div>
                                                                <span className='text-dark font-size-22'>
                                                                    {this.state.selectedOccasion}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <img src={occasion} alt={occasion} className='pr-3' />
                                                                <span className='text-primary font-size-22 ' style={{verticalAlign: 'bottom'}}>
                                                                    {this.props.t('Select')} {this.props.t('Occasion')}
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className='mt-4 mb-3 '>
                                <Col xl={4}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.timeTab === "1"
                                                    })}
                                                    onClick={() => {
                                                        this.timeToggle("1");
                                                    }}
                                                >
                                                    <span className='text-dark font-size-22'>
                                                        9:00 AM - 12:00 PM
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col xl={4}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.timeTab === "2"
                                                    })}
                                                    onClick={() => {
                                                        this.timeToggle("2");
                                                    }}
                                                >
                                                    <span className='text-dark font-size-22'>
                                                        2:00 PM - 6:00 PM
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col xl={4}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.timeTab === "3"
                                                    })}
                                                    onClick={() => {
                                                        this.timeToggle("3");
                                                    }}
                                                >
                                                    <span className='text-dark font-size-22'>
                                                        7:00 PM - 11:00 PM
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <h4 className='text-primary borderBottom mt-5'>{this.props.t('Gift')} {this.props.t('Message')}</h4>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <TextField
                                        id="standard-multiline-static"
                                        multiline
                                        rows={5}
                                        fullWidth={true}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <h4 className='text-primary borderBottom mt-5 text-center'>
                                        <Row>
                                            <Col lg={7} className='text-lg-left'>
                                                <span className='text-left'>
                                                    {this.props.t('Recipient')} {this.props.t('Address')}
                                                </span>
                                            </Col>
                                            <Col lg={5} className='text-lg-right'>
                                                <div className="checkbox-wrapper-mail">
                                                    <Input type="checkbox" id="chk20" style={{height: '23px'}} onClick={(e) => this.selectRecipient(e.target.value)} />
                                                    <Label htmlFor="chk20" className="toggle text-dark font-size-18" >
                                                        {this.props.t('I')} {this.props.t("don't")} {this.props.t('have')} {this.props.t('Recipient')} {this.props.t('Address')}
                                                    </Label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </h4>
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <Col xs={12}>
                                    {
                                        setChecked === true ? (
                                            <div>
                                                <p className='text-dark font-size-18'>
                                                    Do not worry, we will contact the recipient to obtain the delivery address
                                                </p>
                                                <ValidatorForm ref='form' onSubmit={this.addRecipient}>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <TextValidator
                                                                name="username"
                                                                label={this.props.t("Full Name")}
                                                                onChange={this.handleValidChange}
                                                                value={formData.username}
                                                                errorMessages={['this field is required']}
                                                                validators={['required']}
                                                                style={{width: '100%'}}
                                                            />
                                                        </Col>
                                                        <Col lg={6}>
                                                            <MuiPhoneNumber
                                                                defaultCountry={'sa'}
                                                                name='phone'
                                                                phaceholder = 'Enter Phone Number'
                                                                style={{width: '100%', paddingTop: '15px'}}
                                                                value={formData.phone}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </ValidatorForm>
                                            </div>
                                        ) : (
                                            <div>
                                                <Card className='borderRadius'>
                                                    <CardBody>
                                                        <Row className='mt-3 mb-1'>
                                                            <Col sm={12}>
                                                                <div className='ml-3'>
                                                                    <h3 className='text-dark'>
                                                                        {customer.recipient}
                                                                        <span className='text-secondary'/>
                                                                    </h3>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <div className='ml-3 mr-3'>
                                                                    <p className='font-size-18 text-secondary'>
                                                                        {customer.address}
                                                                    </p>
                                                                </div>
                                                                <div className='ml-3 mr-3'>
                                                                    <p className='font-size-18 text-primary'> {customer.phone}</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                                <Button type='button' color='primary' className='btn btn-block waves-effect waves-light font-size-22 borderRadius'>
                                                    {this.props.t('Add')} {this.props.t('Address')}
                                                </Button>
                                            </div>
                                        )
                                    }
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <h4 className='text-primary borderBottom mt-5'>{this.props.t('Payment')} {this.props.t('Methods')}</h4>
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <Col xl={12}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder paymentMethod'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.paymentTab === "1"
                                                    })}
                                                    onClick={() => {
                                                        this.paymentToggle("1");
                                                    }}
                                                >
                                                    <img className='ml-3' src={deliveryCard} alt={deliveryCard}/>
                                                    <span className='text-dark font-size-18 ml-4' style={{verticalAlign: 'bottom'}}>
                                                        {this.props.t('Cash')} {this.props.t('on')} {this.props.t('Delivery')}
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col xl={12}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder paymentMethod'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.paymentTab === "2"
                                                    })}
                                                    onClick={() => {
                                                        this.paymentToggle("2");
                                                    }}
                                                >
                                                    <img className='ml-3' src={creditCard} alt={creditCard}/>
                                                    <span className='text-dark font-size-18 ml-4' style={{verticalAlign: 'bottom'}}>
                                                        {this.props.t('Credit')} {this.props.t('Card')}
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col xl={12}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder paymentMethod'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.paymentTab === "3"
                                                    })}
                                                    onClick={() => {
                                                        this.paymentToggle("3");
                                                    }}
                                                >
                                                    <img className='ml-3' src={payPal} alt={payPal}/>
                                                    <span className='text-dark font-size-18 ml-4' style={{verticalAlign: 'bottom'}}>
                                                        {this.props.t('PayPal')}
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col xl={12}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder paymentMethod'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.paymentTab === "4"
                                                    })}
                                                    onClick={() => {
                                                        this.paymentToggle("4");
                                                    }}
                                                >
                                                    <img className='ml-3' src={stcCard} alt={stcCard}/>
                                                    <span className='text-dark font-size-18 ml-4' style={{verticalAlign: 'bottom'}}>
                                                        {this.props.t('STC Pay')}
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col xl={12}>
                                    <Card style={{boxShadow: 'none'}} className='cornerBorder paymentMethod'>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{border: '1px solid #E8E8E8', borderRadius: '0 0 8px 8px'}}
                                                    className={classnames({
                                                        active: this.state.paymentTab === "5"
                                                    })}
                                                    onClick={() => {
                                                        this.paymentToggle("5");
                                                    }}
                                                >
                                                    <img className='ml-3' src={applyCard} alt={applyCard}/>
                                                    <span className='text-dark font-size-18 ml-4' style={{verticalAlign: 'bottom'}}>
                                                        {this.props.t('Apple Pay')}
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Card>
                                </Col>
                            </Row>

                        </Col>
                        <Col xl={2} lg={3}>
                            <MyCart/>
                        </Col>
                    </Row>

                    <Modal
                        size="sm"
                        isOpen={this.state.isModal}
                        toggle={() =>
                            this.setState({ isModal: !this.state.isModal })
                        }
                        centered
                    >
                        <ModalBody>
                            <label htmlFor="" className='text-dark'>
                                Select Date
                            </label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </ModalBody>
                    </Modal>

                    <Modal
                        size='md'
                        isOpen={this.state.isModal1}
                        toggle={() => this.setState({isModal1: !this.state.isModal1})}
                        centered
                    >
                        <ModalBody>
                            <AvForm onValidSubmit={this.selectOccasion}>
                                <Row form>
                                    <Col className="col-12">
                                        <AvField type="select" name="category" label="Select Occasion">
                                            {itemOccasion}
                                        </AvField>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="text-right">
                                            <button type="button" className="btn btn-sm btn-light mr-2" onClick={() => this.setState({
                                                isModal1: false,
                                            })}>Close</button>
                                            <button type="submit" className="btn btn-sm btn-primary save-event">Select</button>
                                        </div>
                                    </Col>
                                </Row>
                            </AvForm>
                        </ModalBody>
                    </Modal>

                </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(Checkout);
