import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Table, InputGroup, InputGroupAddon, TabContent, TabPane, Form, Modal, ModalBody,Button, Input, CardTitle,  Nav, NavItem, NavLink, } from "reactstrap";
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {AvForm, AvField} from "availity-reactstrap-validation";
import LinesEllipsisLoose  from 'react-lines-ellipsis/lib/loose'
import classnames from 'classnames';
import {webUrl} from "../../config";
import './product.css';

import umbrella from '../../assets/customer/Shop Umbrella.png';
import flower from '../../assets/customer/flower(1).svg';
import location from '../../assets/customer/g842.svg';
import fee from '../../assets/customer/shipping-fee.svg';
import cycle_flower from '../../assets/customer/cycle-flower.svg';
import circle from '../../assets/customer/circle.svg';
import outline from '../../assets/customer/Out line.svg';
import calendar from '../../assets/customer/Schedue.svg';
import sale from '../../assets/customer/sale(1).svg'
import yaward from '../../assets/customer/YaWard-Favicon-08.svg';
import stopwatch from '../../assets/customer/stopwatch(1).svg';
import coin from '../../assets/customer/coin.svg';
import empty_heart from '../../assets/customer/empty-heart-01.svg';
import fill_heart from '../../assets/customer/fill-heart.svg';
import cart_button from '../../assets/customer/button.svg';
import {infoToastr, successToastr} from "../Toastr";
import {warningToastr} from '../Toastr';
import list_active from '../../assets/customer/list.svg';
import list_deactive from '../../assets/customer/list (1).svg';
import four_grid_active from '../../assets/customer/four-grid-layout-design-interface-symbol.svg';
import four_grid_deactive from '../../assets/customer/four-grid-layout-design-interface-symbol (1).svg';
import plus from '../../assets/customer/add.svg';
import minus from '../../assets/customer/minus(1).svg';
import closeButton from '../../assets/customer/close.svg';
import Cart from "./Cart";
import {withNamespaces} from "react-i18next";

import {addToCart} from "../../store/product/actions";

const pattern = {
    backgroundRepeat: 'repeat-x',
    backgroundImage: `url(${umbrella})`,
    height: '147px'
};
const tableStyle = {borderStyle: 'none', width: '25%', textAlign: 'center', padding: '0px'};

const url = webUrl + '/v3/api/customer/products/';
const token = localStorage.getItem('authCustomer');

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            isModal: false,
            isOpen: false,
            data: {
                flowers: [],
            },
            flowerNum: '9',
            shop: '',
            shopId : '',
            shopDis: '',
            shopTime: '',
            moreClick: 1,
            filterText: '',
            category: [],
            occasion: [],
            setRating: true,
            setPrepare: true,
            setPrice: true,
            categoryName: '',
            occasionName: '',
            flowerId: '',
            modalData: [],
            data_attr: 1,
            totalPrice : '',
            cartProduct: [],
            cartNum: 1,
            cartProductName: '',
            cartProductPrice: '',
            orderPrice: 0,
            deliveryFee: 55,
            discount: 70,
            vatFee: 50,
            cartTotalPrice: '',
            wishList: []
        };
        this.toggleTab = this.toggleTab.bind(this);
        this.openModal = this.openModal.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.countUP.bind(this);
        this.countDown.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeCart = this.removeCart.bind(this);
    }

    componentDidMount() {
        axios.get(url + 'getCategory')
            .then(res => {
                this.setState({category: res['data']['categories']})
            })
            .catch(err => console.log(err));

        axios.get(url + 'getOccasion')
            .then(res => {
                this.setState({occasion: res['data']['occasions']})
            })
            .catch(err => console.log(err));

        this.state.shopId = new URLSearchParams(window.location.search).get('id');
        axios.post(url + 'getAllProducts', this.state)
            .then(res => {
                let shop = res['data']['shop'];
                let flowers = res['data']['product'];
                flowers.sort((a, b) => {
                    return parseInt(b['discount_price']) > parseInt(a['discount_price']) ? -1: 1
                });
                this.setState({
                    shop: shop,
                    data: {...this.state.data, flowers},
                    shopDis : new URLSearchParams(window.location.search).get('dis'),
                    shopTime: new URLSearchParams(window.location.search).get('time')
                });
            })
            .catch(err => console.error(err));
        if (token) {
            axios.post(url + 'getMyWishList', this.state, {
                headers : {
                    'Authorization' : token
                }
            })
                .then(res => {
                    this.setState({
                        wishList: res['data']['wishList']
                    })
                });
        }

        if (sessionStorage.getItem('cartItems')) {
            let cartProduct = JSON.parse(sessionStorage.getItem('cartItems'));
            this.props.addToCart(cartProduct);
            this.setState({
                cartProduct: cartProduct
            });
        }
    }

    filter = (event) => {
        const filter = this.state;
        filter.filterText = event;
        this.setState(filter);
        this.allFilter();
    };

    setHighRatingHandler = () => {
        this.setState({setRating: !this.state.setRating});
    };

    setLowRatingHandler = () => {
        this.setState({setRating: !this.state.setRating});
    };

    setFastPrepareHandler = () => {
        this.setState({setPrepare: !this.state.setPrepare})
    };

    setSlowPrepareHandler = () => {
        this.setState({setPrepare: !this.state.setPrepare})
    };

    setHighPriceHandler = () => {
        this.setState({setPrice: false});
    };

    setLowPriceHandler = () => {
        this.setState({setPrice: true});
    };

    selectCategory = (event) => {
        const category = this.state;
        category.categoryName = event;
        this.setState(category);
        this.allFilter()
    };

    selectOccasion = (event) => {
        const occasion = this.state;
        occasion.occasionName = event;
        this.setState(occasion);
        this.allFilter();
    };

    resetFilter = () => {
        axios.post(url + 'getAllProducts', this.state)
            .then(res => {
                let flowers = res['data']['product'];
                this.setState({
                    data: {...this.state.data, flowers},
                });
            })
            .catch(err => console.log(err));

        this.setState({
            filterText: '',
            categoryName : '',
            occasionName: '',
            setPrice: true
        });
    };

    allFilter() {
        axios.post(url + 'filterProducts', this.state)
            .then(res => {
                const flowers = res['data']['product'];
                flowers.sort((a, b) => {
                    return parseInt(b['discount_price']) > parseInt(a['discount_price']) ? -1: 1
                });
                this.setState({
                    data: {...this.state.data, flowers},
                });
            })
            .catch(err => console.log(err));
    }

    loadMore = (prev_click) => {
        const click = this.state;
        click.moreClick = prev_click + 1;
        const number = click.moreClick * this.state.flowerNum;
        const flowerNumber = this.state;
        flowerNumber.flowerNum = number;
        this.setState(flowerNumber);
        axios.post(url + 'filterProducts', this.state)
            .then(res => {
                const flowers = res['data']['product'];
                this.setState({
                    data: {...this.state.data, flowers},
                    flowerNum: '9'
                })
            });
    };

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    countUP = (id, prev_data_attr) => {
        this.setState({
            data_attr: prev_data_attr + 1,
        });
    };

    countDown = (id, prev_data_attr) => {
        if (isNaN(prev_data_attr) || prev_data_attr <= 1) {
            prev_data_attr = 2;
        }
        this.setState({
            data_attr: prev_data_attr - 1
        });
    };

    /**
     * Add Products into Cart
     * @param id    : String : Product ID
     * @param qty   : Number : Product Count to be added
     */
    addToCart = (id, qty = 1) => {
        let flowers = this.state.data.flowers.slice(0);
        let cartProduct = this.state.cartProduct;
        let price = 0;
        for (let flower of flowers) {
            if (flower['_id'] === id) {
                // if the cart is empty
                if (cartProduct.length === 0) {
                    flower.quantity = qty;
                    cartProduct.push(flower);
                    price = parseInt(flower['discount_price']) * parseInt(qty);
                }
                // else (not empty)
                else {
                    // flag that indicates if this product wasn't added, yet
                    let b_newProduct = true;

                    // check all items in cart
                    for (let cartItem of cartProduct) {
                        if (cartItem['_id'] === id) {
                            price = parseInt(flower['discount_price']) * parseInt(qty);
                            cartItem.quantity += qty;
                            b_newProduct = false;
                        }
                    }
                    // if this product wasn't added, push it.
                    if (b_newProduct) {
                        flower.quantity = qty;
                        price = parseInt(flower['discount_price']) * parseInt(qty);
                        cartProduct.push(flower);

                    }
                }

                this.props.addToCart(cartProduct);

                successToastr(flower['title'] + ' was added!');
                this.setState({
                    orderPrice : this.state.orderPrice + price,
                    cartProduct: cartProduct
                });
                sessionStorage.setItem('cartItems', JSON.stringify(cartProduct));
                break;
            }
        }
    };

    removeCart = (id) => {
        let cartProduct = this.state.cartProduct;
        let filtered = cartProduct.filter(function (item) {
            return item._id !== id;
        });
        for (let item of cartProduct) {
            if (item._id === id) {
                this.removedPrice = item['discount_price'] * item['quantity'];
                infoToastr(item['title'] + ' was removed!');
            }
        }


        this.setState({
            cartProduct: filtered,
            orderPrice: this.state.orderPrice - parseInt(this.removedPrice)
        });

        this.props.addToCart(filtered);

        sessionStorage.setItem('cartItems', JSON.stringify(filtered));
    };

    addToWishList = (flowerId, shopId) => {
        if (token) {
            axios.post(url + 'addWishList', {'flowerId': flowerId, 'shopId': shopId}, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                for (let item of res['data']['wishList']) {
                    if (item['flower_id'] === flowerId) {
                        const msg = item['status'] ? 'Successfully Added in your wishlist' : 'Successfully Removed in your wishlist';
                        successToastr(msg)
                    }
                }
                this.setState({
                    wishList: res['data']['wishList']
                })
            })
        }
        else {
            warningToastr('You have to login')
        }
    };

    render() {
        const {shop, shopDis, shopTime, wishList} = this.state;

        for (let item of this.state.data.flowers) {
            if (item['_id'] === this.state.flowerId) {
                this.state.modalData = item;
                this.state.totalPrice = (this.state.data_attr ) * this.state.modalData['discount_price'];
            }
        }

        let {data} = this.state;
        if (this.state.setPrice === true) {
            data.flowers.sort((a, b) => {
                return parseInt(b['discount_price']) > parseInt(a['discount_price']) ? -1 : 1
            });
        } else
            data.flowers.sort((a, b) => {
                return parseInt(b['discount_price']) > parseInt(a['discount_price']) ? 1 : -1
            });

        const categories = this.state.category;
        const itemCategory = [];
        for (let i = 0; i < categories.length; i++) {
            itemCategory.push(<option className='font-size-18 p-2' key={i} value={categories[i]}>{categories[i]}</option>)
        }

        const occasions = this.state.occasion;
        const itemOccasion = [];
        for (let i = 0; i < occasions.length; i++) {
            itemOccasion.push(<option className='font-size-18 p-2' key={i} value={occasions[i]}>{occasions[i]}</option>)
        }

        sessionStorage.setItem('shopTime', shopTime);

        return (
            <React.Fragment>
                <div style={{'paddingTop': '70px', 'background': 'white'}}>
                    <Container fluid style={{paddingLeft: '0px', paddingRight: '0px'}}>

                        <Row style={{backgroundColor: '#DFDFDF'}}>
                            <Col lg={12} className='mb-3'>
                                <div style={pattern}>
                                </div>
                                {shop ? (
                                    <Row className='text-center'>
                                        <Col xl={7} className='text-xl-left'>
                                            <Row>
                                                <Col lg={4}>
                                                    <div className='text-center ml-sm-5 mr-sm-3'>
                                                        <img src={webUrl + '/public/shopAvatar/' + shop['avatar']} alt={webUrl + shop['avatar']} style={{width: '98%'}} />
                                                    </div>
                                                </Col>
                                                <Col lg={8}>
                                                    <div className='mt-4 ml-3'>
                                                        <h1 className='' style={{color: '#8F0E51'}}>
                                                            {shop['name']}
                                                            <img src={flower} alt={flower} className='ml-4' />
                                                            <span className='font-size-20 ml-1'>
                                                            {}
                                                        </span>
                                                        </h1>
                                                    </div>
                                                    <div className='mt-4 ml-3'>
                                                        <img src={location} alt={location} style={{height: '22px'}}/>
                                                        <span className='ml-3 font-size-16' style={{color: '#888888'}}>
                                                        {shop['address']}
                                                    </span>
                                                        <span className='ml-3' style={{color: '#1C7E8E'}}>
                                                        ({shopDis})
                                                    </span>
                                                    </div>
                                                    <div className='mt-4 ml-3'>
                                                        <img src={cycle_flower} alt={cycle_flower}/>
                                                        <span className='mr-5 font-size-18 ml-2'>{shopTime}</span>
                                                        <img src={fee} alt={fee} className='mr-2  '/>
                                                        <span className='font-size-18'>{this.state.deliveryFee} SR</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={5} className='text-xl-right'>
                                            <div className='mt-4 ml-3 mr-sm-5'>
                                                <button className='btn btn-light text-primary' style={{height: '30px'}}>
                                                    <i className='bx bx-star text-primary mr-4' />
                                                    Ad</button>
                                            </div>
                                            <div className='mt-4 ml-3 mr-sm-5'>
                                                <img src={circle} alt={circle} style={{height: '16px'}}/>
                                                <span className='ml-3 font-size-16 mr-3 mt-2'>
                                                {shop['status']}
                                            </span>
                                                <img src={outline} alt={outline} height='18px'/>
                                                <span className='mr-5 font-size-16 ml-2'>{shop['startTime']} AM - {shop['endTime']} PM</span>
                                                <img src={calendar} alt={calendar} className='mr-2' height='18px'/>
                                                <span className='font-size-16'>Check All Days</span>
                                            </div>
                                            <div className='mt-4 ml-3 mr-sm-5'>
                                                <img src={sale} alt={sale} height='18px'/>
                                                <span className='font-size-18 ml-2 text-primary'>30% discount on selected products</span>
                                            </div>
                                        </Col>
                                    </Row>
                                ) : null}
                            </Col>
                        </Row>

                        <Row className='mt-5' style={{'width': '95%', 'margin': 'auto'}}>
                            <Col xl="3">
                                <Card className='mt-3'>
                                    <CardBody>
                                        <CardTitle className="mb-2">
                                            <AvForm className=" d-lg-block">
                                                <FormGroup className='app-search'>
                                                    <div className="position-relative text-dark">
                                                        <input
                                                            type="text"
                                                            className="form-control text-dark"
                                                            style={{
                                                                borderRadius: '0 0 8px 8px',
                                                                background: 'transparent',
                                                                border: '1px solid #F0F0F0',
                                                            }}
                                                            id='filterText'
                                                            value={this.state.filterText}
                                                            placeholder={this.props.t("Search...")}
                                                            onChange={(e) => {this.filter(e.target.value)}}
                                                        />
                                                        <span className="bx bx-search-alt text-dark"/>
                                                    </div>
                                                    <div className='mt-2 font-size-12 text-right text-primary'
                                                         style={{cursor: 'pointer'}}
                                                         onClick={() => this.resetFilter()}
                                                    >
                                                        <i className='bx bx-reset'/>{this.props.t('Reset Filters')}
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className='mt-3'>
                                                    <Label
                                                        className="d-block mb-3 font-size-20 text-secondary">{this.props.t('Rating')}</Label>
                                                    <div className="custom-control custom-radio mt-3 ">
                                                        <Input
                                                            type="radio"
                                                            id="setHighRating"
                                                            name="setRating"
                                                            className="custom-control-input mr-3"
                                                            defaultChecked
                                                            onChange={(e) => this.setHighRatingHandler(e.target.value)}
                                                        />
                                                        <Label
                                                            className="custom-control-label font-size-16 text-secondary"
                                                            htmlFor="setHighRating"
                                                        >
                                                            {this.props.t('High')} {this.props.t('to')} {this.props.t('Low')}
                                                        </Label>
                                                    </div>
                                                    <div className="custom-control custom-radio mt-3">
                                                        <Input
                                                            type="radio"
                                                            id="setLowRating"
                                                            name="setRating"
                                                            className="custom-control-input mr-3"
                                                            onChange = {(e) => this.setLowRatingHandler(e.target.value)}
                                                        />
                                                        <Label
                                                            className="custom-control-label font-size-16 text-secondary"
                                                            htmlFor="setLowRating"
                                                        >
                                                            {this.props.t('Low')} {this.props.t('to')} {this.props.t('High')}
                                                        </Label>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className='mt-3'>
                                                    <Label className="d-block mb-3 font-size-20 text-secondary">{this.props.t('Preparing')}
                                                        {this.props.t('Time')}</Label>
                                                    <div className="custom-control custom-radio mt-3 ">
                                                        <Input
                                                            type="radio"
                                                            id="setFastPrepare"
                                                            name="setPrepare"
                                                            className="custom-control-input mr-3"
                                                            defaultChecked
                                                            onChange = {(e) => this.setFastPrepareHandler(e.target.value)}
                                                        />
                                                        <Label
                                                            className="custom-control-label font-size-16 text-secondary"
                                                            htmlFor="setFastPrepare"
                                                        >
                                                            {this.props.t('Fastest')} {this.props.t('to')} {this.props.t('Slowest')}
                                                        </Label>
                                                    </div>
                                                    <div className="custom-control custom-radio mt-3">
                                                        <Input
                                                            type="radio"
                                                            id="setSlowPrepare"
                                                            name="setPrepare"
                                                            className="custom-control-input mr-3"
                                                            onChange = {(e) => this.setSlowPrepareHandler(e.target.value)}
                                                        />
                                                        <Label
                                                            className="custom-control-label font-size-16 text-secondary"
                                                            htmlFor="setSlowPrepare"
                                                        >
                                                            {this.props.t('Slowest')} {this.props.t('to')} {this.props.t('Fastest')}
                                                        </Label>
                                                    </div>

                                                </FormGroup>
                                                <FormGroup className='mt-3'>
                                                    <Label
                                                        className="d-block mb-3 font-size-20 text-secondary"> {this.props.t('Price')} </Label>
                                                    <div className="custom-control custom-radio mt-3 ">
                                                        <Input
                                                            type="radio"
                                                            id="setLowPrice"
                                                            name="setPrice"
                                                            className="custom-control-input mr-3"
                                                            defaultChecked={this.state.setPrice}
                                                            onClick={(e) => this.setLowPriceHandler(e.target.value)}
                                                        />
                                                        <Label
                                                            className="custom-control-label font-size-16 text-secondary"
                                                            htmlFor="setLowPrice"
                                                        >
                                                            {this.props.t('Low')} {this.props.t('to')} {this.props.t('High')}
                                                        </Label>
                                                    </div>
                                                    <div className="custom-control custom-radio mt-3">
                                                        <Input
                                                            type="radio"
                                                            id="setHighPrice"
                                                            name="setPrice"
                                                            className="custom-control-input mr-3"
                                                            onClick={(e) => this.setHighPriceHandler(e.target.value)}
                                                        />
                                                        <Label
                                                            className="custom-control-label font-size-16 text-secondary"
                                                            htmlFor="setHighPrice"
                                                        >
                                                            {this.props.t('High')} {this.props.t('to')} {this.props.t('Low')}
                                                        </Label>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className='mt-3 borderRadius'>
                                                    <Label
                                                        className="d-block mb-3 font-size-20 text-secondary">{this.props.t('Category')} </Label>
                                                    <AvField type="select" name='categoryName'
                                                             value={this.state.categoryName}
                                                             className='font-size-16 borderRadius'
                                                             onChange={(e) => this.selectCategory(e.target.value)}>
                                                        <option className='font-size-18 p-2' value=''>{this.props.t('Select')} {this.props.t('Categories')}..</option>
                                                        {itemCategory}
                                                    </AvField>
                                                </FormGroup>
                                                <FormGroup className='mt-3'>
                                                    <Label
                                                        className="d-block mb-3 font-size-20 text-secondary">Occasion </Label>
                                                    <AvField type="select" name='occasionName'
                                                             value={this.state.occasionName}
                                                             className='font-size-16 borderRadius'
                                                             onChange={(e) => this.selectOccasion(e.target.value)}>
                                                        <option className='font-size-18 p-2' value=''>{this.props.t('Select')} {this.props.t('Occasions')}..</option>
                                                        {itemOccasion}
                                                    </AvField>

                                                </FormGroup>
                                            </AvForm>
                                        </CardTitle>

                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xl="9">
                                <Row>
                                    <Col lg={9}>
                                        <Row className="mb-3 mt-3">
                                            <Col lg="4" sm="6">

                                            </Col>
                                            <Col lg="8" sm="6">
                                                <Form className="natIcon mt-4 mt-sm-0 float-right form-inline mr-sm-2">

                                                    <Nav className="product-view-nav" pills>
                                                        <NavItem>
                                                            <NavLink
                                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                                onClick={() => { this.toggleTab('1'); }}
                                                                style={{borderRadius: '0 0 8px 8px'}}
                                                            >
                                                                {
                                                                    this.state.activeTab === '1' ? (
                                                                        <img src={list_active} alt={list_active} height='22'/>
                                                                    ) : (
                                                                        <img src={list_deactive} alt={list_deactive} height='22'/>
                                                                    )
                                                                }
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                                onClick={() => { this.toggleTab('2'); }}
                                                                style={{borderRadius: '0 0 8px 8px'}}
                                                            >
                                                                {
                                                                    this.state.activeTab === '2' ? (
                                                                        <img src={four_grid_deactive} alt={four_grid_deactive} height='22' />
                                                                    ) : (
                                                                        <img src={four_grid_active} alt={four_grid_active} height='22' />
                                                                    )
                                                                }
                                                            </NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </Form>
                                            </Col>
                                        </Row>

                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1" className="p-3">
                                                <Row>
                                                    {
                                                        this.state.data.flowers.map((flower, key) =>
                                                            <Card className='mb-4 ml-sm-4' key={"_col_" + key} style={{width: '100%'}}>
                                                                <Col xl="12" sm="12" >
                                                                    <Row>
                                                                        <Col md={3} sm={5} style={{padding: '0px'}}>
                                                                            <div className=' mr-2'>
                                                                                <Link onClick={() =>
                                                                                this.setState({
                                                                                        isModal: !this.state.modal,
                                                                                        flowerId: flower._id,
                                                                                        data_attr: 1,
                                                                                        totalPrice: ''
                                                                                    })
                                                                                } to = {this.props.location.search}>
                                                                                    <img src={webUrl + '/public/products/' + flower.image}
                                                                                         alt={flower.image}
                                                                                         style={{width: '100%', maxHeight: '200px'}}
                                                                                    />
                                                                                </Link>
                                                                            </div>
                                                                        </Col>

                                                                        <Col md={9} sm={7}>
                                                                            <div className='mt-3'>
                                                                                <Row>
                                                                                    <Col xs={10}>
                                                                                        <Link onClick={() =>
                                                                                            this.setState({
                                                                                                isModal: !this.state.modal,
                                                                                                flowerId: flower._id,
                                                                                                data_attr: 1,
                                                                                                totalPrice: ''
                                                                                            })
                                                                                        } to = {this.props.location.search}>
                                                                                            <div className='mb-3'>
                                                                                                <h3 className='text-primary cursor'>{flower.title}</h3>
                                                                                            </div>
                                                                                        </Link>
                                                                                    </Col>
                                                                                    <Col xs={2}>
                                                                                        <div className='text-right cursor'>
                                                                                            {wishList.length ? (
                                                                                                <div>
                                                                                                    {wishList.map((wishlist, key) =>
                                                                                                        wishlist['flower_id'] === flower._id && wishlist['status'] === false? (
                                                                                                            <img
                                                                                                                key={key}
                                                                                                                src={empty_heart}
                                                                                                                alt={empty_heart}
                                                                                                                height='22px'
                                                                                                                onClick={() => this.addToWishList(flower._id, this.state.shopId)}
                                                                                                            />
                                                                                                        ) : (
                                                                                                            null
                                                                                                        )
                                                                                                    )}
                                                                                                    {wishList.map((wishlist, key) =>
                                                                                                        wishlist['flower_id'] === flower._id && wishlist['status'] ? (
                                                                                                            <img
                                                                                                                key={key}
                                                                                                                src={fill_heart}
                                                                                                                alt={fill_heart}
                                                                                                                height='22px'
                                                                                                                onClick={() => this.addToWishList(flower._id, this.state.shopId)}
                                                                                                            />
                                                                                                        ) : (
                                                                                                            null
                                                                                                        )
                                                                                                    )}
                                                                                                </div>
                                                                                            ) : (
                                                                                                <img
                                                                                                    src={empty_heart}
                                                                                                    alt={empty_heart}
                                                                                                    height='22px'
                                                                                                    onClick={() => this.addToWishList(flower._id, this.state.shopId)}
                                                                                                />
                                                                                            )}
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Link onClick={() =>
                                                                                    this.setState({
                                                                                        isModal: !this.state.modal,
                                                                                        flowerId: flower._id,
                                                                                        data_attr: 1,
                                                                                        totalPrice: ''
                                                                                    })
                                                                                } to = {this.props.location.search}>
                                                                                    <Row>
                                                                                        <Col xs={10} className='font-size-16 cursor text-dark'>
                                                                                            <LinesEllipsisLoose
                                                                                                text={flower.description}
                                                                                                maxLine='2'
                                                                                                lineHeight='25'
                                                                                            />
                                                                                        </Col>
                                                                                        <Col xs={2}/>
                                                                                    </Row>
                                                                                    <Row>
                                                                                        <Col xs={6}>
                                                                                            <div className='mt-sm-2 mb-2'>
                                                                                                <span>
                                                                                                    <img src={coin} alt={coin} height='20px' />
                                                                                                </span>
                                                                                                <span className='text-dark ml-2 font-size-20'>
                                                                                                    {flower['discount_price']} SR
                                                                                                </span>
                                                                                                <span className='text-secondary font-size-14 ml-2'>
                                                                                                    {flower['regular_price'] !== flower['discount_price'] ? (
                                                                                                        <del>{flower['regular_price']} SR</del>
                                                                                                    ) : null}
                                                                                                </span>
                                                                                            </div>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <div className='mt-sm-2 text-right' style={{cursor: 'pointer'}}>
                                                                                                <img src={cart_button} alt={cart_button} height='18px' />
                                                                                                <span className='text-primary ml-2 font-size-16'>Add to Cart</span>
                                                                                            </div>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Link>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Card>
                                                        )
                                                    }
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2" className="p-3">
                                                <Row>
                                                    {
                                                        this.state.data.flowers.map((flower, key) =>
                                                            <Col xl="4" sm="6" key={"_col_" + key}>
                                                                <div className=' mb-5'>
                                                                    <div className="product-img position-relative">
                                                                        <div className="ml-2 mt-2 avatar-sm product-lebbon"
                                                                             style={{width: '100%', display: 'flex'}}>
                                                                        </div>
                                                                        <div className='mt-2 avatar-sm product-ribbon'>
                                                                            {wishList.length ? (
                                                                                <div className='text-right mr-2'>
                                                                                    {wishList.map((wishlist, key) =>
                                                                                        wishlist['flower_id'] === flower._id && wishlist['status'] ? (
                                                                                            <img
                                                                                                key={key}
                                                                                                src={fill_heart}
                                                                                                alt={fill_heart}
                                                                                                height='22px'
                                                                                                className='cursor'
                                                                                                onClick={() => this.addToWishList(flower._id, this.state.shopId)}
                                                                                            />
                                                                                        ) : (
                                                                                            null
                                                                                        )
                                                                                    )}
                                                                                    {wishList.map((wishlist, key) =>
                                                                                        wishlist['flower_id'] === flower._id && wishlist['status'] === false? (
                                                                                            <img
                                                                                                key={key}
                                                                                                src={empty_heart}
                                                                                                alt={empty_heart}
                                                                                                height='22px'
                                                                                                className='cursor'
                                                                                                onClick={() => this.addToWishList(flower._id, this.state.shopId)}
                                                                                            />
                                                                                        ) : (
                                                                                            null
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                            ) : (
                                                                                <img
                                                                                    src={empty_heart}
                                                                                    alt={empty_heart}
                                                                                    height='22px'
                                                                                    className='cursor'
                                                                                    onClick={() => this.addToWishList(flower._id, this.state.shopId)}
                                                                                />
                                                                            )}
                                                                        </div>

                                                                        <Link onClick={() =>
                                                                            this.setState({
                                                                                isModal: !this.state.modal,
                                                                                flowerId: flower._id,
                                                                                data_attr: 1,
                                                                                totalPrice: ''
                                                                            })
                                                                        } to = {this.props.location.search}>
                                                                            <img src={webUrl + '/public/products/' + flower.image}
                                                                                 alt={flower.image}
                                                                                 style={{width : '100%', height: '250px'}}

                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="mt-3 ml-2 mr-2">
                                                                        <Link onClick={() =>
                                                                            this.setState({
                                                                                isModal: !this.state.modal,
                                                                                flowerId: flower._id,
                                                                                data_attr: 1,
                                                                                totalPrice: ''
                                                                            })
                                                                        } to = {this.props.location.search}>
                                                                            <Row>
                                                                                <Col xs={12}>
                                                                                    <h3 className='text-left text-primary'>
                                                                                        {flower.title}
                                                                                    </h3>
                                                                                    <LinesEllipsisLoose
                                                                                        text={flower.description}
                                                                                        maxLine='1'
                                                                                        lineHeight='25'
                                                                                        className='font-size-16 text-dark'
                                                                                    />
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mt-1 text-center'>
                                                                                <Col xl={6}>
                                                                                    <p className='text-xl-left text-dark font-size-20'>
                                                                                        <img src={coin} alt={coin} height='20px' /> {flower['discount_price']} SR
                                                                                    </p>
                                                                                </Col>
                                                                                <Col xl={6}>
                                                                                    <div className='text-xl-right' style={{cursor: 'pointer'}}>
                                                                                        <img src={cart_button} alt={cart_button} height='20px' />
                                                                                        <span className='text-primary ml-2 font-size-20'>Add to Cart</span>
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        )
                                                    }
                                                </Row>
                                            </TabPane>
                                            <Row>
                                                <Col xl={12}>
                                                    <div className='mt-5 pb-4 text-primary text-center'>
                                                        <h3 className='text-primary' onClick={() => {this.loadMore(this.state.moreClick)}} style={{cursor: 'pointer'}} >
                                                            <img className='image_rotate' src={yaward} alt={yaward}  /> &nbsp; {this.props.t('Load More')}
                                                        </h3>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </TabContent>
                                    </Col>
                                    <Col lg={3} className='mt-3 mb-3'>
                                        <Cart cartProduct={this.state.cartProduct} removeCart={this.removeCart} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {
                            this.state.isOpen === false ? (
                                <Modal
                                    size="lg"
                                    isOpen={this.state.isModal}
                                    toggle={() =>
                                        this.setState({ isModal: !this.state.isModal })
                                    }
                                    centered
                                    style={{maxWidth: '1000px'}}
                                >
                                    <ModalBody style={{padding: '0px'}}>
                                        <Row>
                                            <Col md={5}>
                                                <div className='ml-4 mt-3 avatar-sm product-lebbon'>
                                                    {wishList.length ? (
                                                        <div className='text-right mr-2'>
                                                            {wishList.map((wishlist, key) =>
                                                                wishlist['flower_id'] === this.state.modalData._id && wishlist['status'] ? (
                                                                    <img
                                                                        key={key}
                                                                        src={fill_heart}
                                                                        alt={fill_heart}
                                                                        height='22px'
                                                                        className='cursor'
                                                                        onClick={() => this.addToWishList(this.state.modalData._id, this.state.shopId)}
                                                                    />
                                                                ) : (
                                                                    null
                                                                )
                                                            )}
                                                            {wishList.map((wishlist, key) =>
                                                                wishlist['flower_id'] === this.state.modalData._id && wishlist['status'] === false? (
                                                                    <img
                                                                        key={key}
                                                                        src={empty_heart}
                                                                        alt={empty_heart}
                                                                        height='22px'
                                                                        className='cursor'
                                                                        onClick={() => this.addToWishList(this.state.modalData._id, this.state.shopId)}
                                                                    />
                                                                ) : (
                                                                    null
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={empty_heart}
                                                            alt={empty_heart}
                                                            height='22px'
                                                            className='cursor'
                                                            onClick={() => this.addToWishList(this.state.modalData._id, this.state.shopId)}
                                                        />
                                                    )}
                                                </div>
                                                <img src={webUrl + '/public/products/'+ this.state.modalData.image }
                                                     alt={this.state.modalData.image}
                                                     width='100%'
                                                     height='400px'/>
                                            </Col>
                                            <Col md={7}>
                                                <Row>
                                                    <Col xs={10}>
                                                        <div className='mt-5'/>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <div className='mt-2  product-ribbon'>
                                                            <img src={closeButton} alt={closeButton}
                                                                 className='mr-4 cursor'
                                                                 onClick={() => this.setState({ isModal: false })}
                                                                 data-dismiss="modal"
                                                                 aria-label="Close"
                                                                style={{height: '24px'}}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div>
                                                    <h2 className='text-primary rdw-fontfamily-dropdown mb-4' style={{fontFamily: 'auto'}}>{this.state.modalData.title}</h2>
                                                    <LinesEllipsisLoose
                                                        text={this.state.modalData.description}
                                                        maxLine='5'
                                                        lineHeight='20'
                                                        className='font-size-14 mb-4'
                                                        style={{minHeight: '90px'}}
                                                    />
                                                    <hr/>
                                                    <div className='mt-3'>
                                                        <span className='text-dark font-size-16'>Category : </span>
                                                        <span className='text-secondary font-size-12'>{this.state.modalData.categoryName}</span>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <span className='text-dark font-size-16'>Occasions : </span>
                                                        <span className='text-secondary font-size-12'>{this.state.modalData.occasionName}</span>
                                                    </div>
                                                    <hr/>
                                                    <Table className="table mb-2">
                                                        <tbody>
                                                            <tr>
                                                                <td style={tableStyle}>
                                                                    <span className='text-secondary font-size-11'>Quantity</span>
                                                                </td>
                                                                <td style={tableStyle}>
                                                                    <span className='text-secondary font-size-11'>Preparing Time</span>
                                                                </td>
                                                                <td style={tableStyle}>
                                                                    <span className='text-secondary font-size-11'>Total Price</span>
                                                                </td>
                                                                <td style={tableStyle}/>
                                                            </tr>
                                                            <tr>
                                                                <td style={tableStyle}>
                                                                    <InputGroup>
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <Button
                                                                                color="white"
                                                                                className='mr-2 text-primary'
                                                                                onClick={() => { this.countUP(this.state.modalData._id, this.state.data_attr) }}
                                                                                style={{padding: '0px 5px 0px 5px', height: '22px'}}>
                                                                                <img src={plus} alt={plus} height='20px' />
                                                                            </Button>
                                                                        </InputGroupAddon>
                                                                        <Input type="text"
                                                                               className='text-center p-1 borderRadius'
                                                                               value={this.state.data_attr}
                                                                               name="demo_vertical"
                                                                               readOnly
                                                                               min='0'
                                                                               style={{height: '22px'}}/>
                                                                        <InputGroupAddon addonType="append">
                                                                            <Button
                                                                                color="white"
                                                                                className='ml-2 text-primary'
                                                                                onClick={() => { this.countDown(this.state.modalData._id, this.state.data_attr) }}
                                                                                style={{padding: '0px 5px 0px 5px',height: '22px'}}>
                                                                                <img src={minus} alt={minus} height='20px'/>
                                                                            </Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                </td>
                                                                <td style={tableStyle}>
                                                                    <img src={stopwatch} alt={stopwatch}/>
                                                                    <span className='text-dark font-size-13 ml-2'>30-40min</span>
                                                                </td>
                                                                <td style={tableStyle}>
                                                                    <img src={coin} alt={coin}/>
                                                                    <span className='text-dark font-size-16 ml-2'>{this.state.totalPrice} SR</span>
                                                                </td>
                                                                <td style={tableStyle} className='cursor'>
                                                                    <img src={cart_button} alt={cart_button} height='18px' />
                                                                    <span className='font-size-16 text-primary ml-2'
                                                                          style={{cursor: 'pointer'}}
                                                                        onClick={() => this.addToCart(this.state.modalData._id, this.state.data_attr)}
                                                                    >Add to Cart</span>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>
                                    </ModalBody>
                                </Modal>
                            ) : null
                        }

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const {products} = state.Product;
    return { products };
};

export default  withNamespaces()(connect(mapStatetoProps, { addToCart })(ProductsList));
