import React, {Component} from 'react';
import {Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row} from "reactstrap";
import circle from "../../assets/customer/circle.svg";
import {Link} from "react-router-dom";
import flower from "../../assets/customer/flower(1).svg";
import cycle_flower from "../../assets/customer/cycle-flower.svg";
import fee from "../../assets/customer/shipping-fee.svg";
import yaward from "../../assets/customer/YaWard-Favicon-08.svg";
import {webUrl} from "../../config";
import axios from "axios";
import './main.css';
import {withNamespaces} from "react-i18next";

const url = webUrl + '/v3/api/customer/shops/';

const myLocation = localStorage.getItem('myLocation');

class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Shops: [],
            shopNum: '9',
            origins: [
                myLocation
            ],
            travelMode: 'DRIVING',
            setDistance: true,
            isOpen: false,
            setDeliveryFee: true,
            setDeliveryTime: true,
            setRating: true,
        }
    }

    componentDidMount() {
        const {data} = this.props.myLocation;
        const location = data === undefined ? myLocation : data;
        axios.post(url + 'getShopList', {'origins': [location], 'shopNum': 9}).then(res => {
            this.setState({
                Shops: res['data']['shop']
            })
        });
    }

    filter = () => {

    } ;

    setCloserDistanceHandler = () => {
        this.setState({setDistance: true});
    };

    setFurtherDistanceHandler = () => {
        this.setState({setDistance: false});
    };

    setOpenStatusHandler = () => {
        this.setState({
            isOpen: true
        })
    };

    setCloseStatusHandler = () => {

    };

    setBusyStatusHandler = () => {

    };

    setTemporaryStatusHandler = () => {

    };

    setFreeDeliveryFeeHandler = () => {
        this.setState({setDeliveryFee: !this.state.setDeliveryFee});
    };

    setLowDeliveryFeeHandler = () => {
        this.setState({setDeliveryFee: !this.state.setDeliveryFee});
    };

    setHighDeliveryFeeHandler = () => {
        this.setState({setDeliveryFee: !this.state.setDeliveryFee});
    };

    setHighRatingHandler = () => {
        this.setState({setRating: !this.state.setRating});
    };

    setLowRatingHandler = () => {
        this.setState({setRating: !this.state.setRating})
    };

    render() {
        let {Shops} = this.state;

        if (this.state.setDistance === true) {
            Shops.sort((a, b) => {
                return parseInt(b.distances['distance']['value']) > parseInt(a.distances['distance']['value']) ? -1 : 1
            });

        } else {
            Shops.sort((a, b) => {
                return parseInt(b.distances['distance']['value']) > parseInt(a.distances['distance']['value']) ? 1 : -1
            });
        }

        const avatarUrl = webUrl + '/public/shopAvatar/';
        return (
            <React.Fragment>
                <Col lg="3">
                    <Card className='mt-3'>
                        <CardBody>
                            <CardTitle className="mb-3">
                                <form className="  d-lg-block">
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
                                                placeholder={this.props.t('Search...')}
                                                onChange={(e) => {this.filter(e.target.value)}}
                                            />
                                            <span className="bx bx-search-alt text-secondary"/>
                                        </div>
                                        <div className='mt-2 font-size-12 text-right text-primary'
                                             style={{cursor: 'pointer'}}
                                        >
                                            <i className='bx bx-reset'/>{this.props.t('Reset Filters')}
                                        </div>
                                    </FormGroup>
                                    <FormGroup className='mt-3'>
                                        <Label
                                            className="d-block mb-3 font-size-20 text-secondary">{this.props.t('Distance')}</Label>
                                        <div className="custom-control custom-radio mt-3 ">
                                            <Input
                                                type="radio"
                                                id="setCloserDistance"
                                                name="setDistance"
                                                className="custom-control-input mr-3"
                                                defaultChecked
                                                onChange={(e) => this.setCloserDistanceHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setCloserDistance"
                                            >
                                                {this.props.t('Closer')} {this.props.t('to')} {this.props.t('Furthest')}
                                            </Label>
                                        </div>
                                        <div className="custom-control custom-radio mt-3">
                                            <Input
                                                type="radio"
                                                id="setFurtherDistance"
                                                name="setDistance"
                                                className="custom-control-input mr-3"
                                                onChange = {(e) => this.setFurtherDistanceHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setFurtherDistance"
                                            >
                                                {this.props.t('Furthest')} {this.props.t('to')} {this.props.t('Closer')}
                                            </Label>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className='mt-3'>
                                        <Label
                                            className="d-block mb-3 font-size-20 text-secondary">{this.props.t('Status')}</Label>
                                        <div className="custom-control custom-checkbox mt-3 ">
                                            <Input
                                                type="checkbox"
                                                id="setOpenStatus"
                                                name="setOpen"
                                                className="custom-control-input mr-3"
                                                onChange={(e) => this.setOpenStatusHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setOpenStatus"
                                            >
                                                {this.props.t('Open')}
                                            </Label>
                                        </div>
                                        <div className="custom-control custom-checkbox mt-3">
                                            <Input
                                                type="checkbox"
                                                id="setClosedStatus"
                                                name="setClosed"
                                                className="custom-control-input mr-3"
                                                onChange={(e) => this.setCloseStatusHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setClosedStatus"
                                            >
                                                {this.props.t('Closed')}
                                            </Label>
                                        </div>
                                        <div className="custom-control custom-checkbox mt-3">
                                            <Input
                                                type="checkbox"
                                                id="setBusyStatus"
                                                name="setBusy"
                                                className="custom-control-input mr-3"
                                                onChange={(e) => this.setBusyStatusHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setBusyStatus"
                                            >
                                                {this.props.t('Busy')}
                                            </Label>
                                        </div>
                                        <div className="custom-control custom-checkbox mt-3">
                                            <Input
                                                type="checkbox"
                                                id="setTemporaryStatus"
                                                name="setTemporary"
                                                className="custom-control-input mr-3"
                                                onChange={(e) => this.setTemporaryStatusHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setTemporaryStatus"
                                            >
                                                {this.props.t('Temporary closed')}
                                            </Label>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className='mt-3'>
                                        <Label
                                            className="d-block mb-3 font-size-20 text-secondary">{this.props.t('Delivery Fee')} </Label>
                                        <div className="custom-control custom-radio mt-3 ">
                                            <Input
                                                type="radio"
                                                id="setFreeDeliveryFee"
                                                name="setDeliveryFee"
                                                className="custom-control-input mr-3"
                                                defaultChecked
                                                onChange={(e) => this.setFreeDeliveryFeeHandler(e.target.value) }
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setFreeDeliveryFee"
                                            >
                                                {this.props.t('Free')} {this.props.t('Delivery')}
                                            </Label>
                                        </div>
                                        <div className="custom-control custom-radio mt-3 ">
                                            <Input
                                                type="radio"
                                                id="setLowDeliveryFee"
                                                name="setDeliveryFee"
                                                className="custom-control-input mr-3"
                                                onChange={(e) => this.setLowDeliveryFeeHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setLowDeliveryFee"
                                            >
                                                {this.props.t('Low')} {this.props.t('to')} {this.props.t('High')}
                                            </Label>
                                        </div>
                                        <div className="custom-control custom-radio mt-3 ">
                                            <Input
                                                type="radio"
                                                id="setHighDeliveryFee"
                                                name="setDeliveryFee"
                                                className="custom-control-input mr-3"
                                                onChange={(e) => this.setHighDeliveryFeeHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setHighDeliveryFee"
                                            >
                                                {this.props.t('High')} {this.props.t('to')} {this.props.t('Low')}
                                            </Label>
                                        </div>

                                    </FormGroup>
                                    <FormGroup className='mt-3'>
                                        <Label
                                            className="d-block mb-3 font-size-20 text-secondary">{this.props.t('Rating')} </Label>
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
                                                onChange={(e) => this.setLowRatingHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setLowRating"
                                            >
                                                {this.props.t('Low')} {this.props.t('to')} {this.props.t('High')}
                                            </Label>
                                        </div>

                                    </FormGroup>
                                </form>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="9">
                    <Row className='mt-3'>
                        {
                            Shops.map((list, key) =>
                                <Col xl="4" sm="6" key={"_col_" + key}>
                                    <div className='ml-lg-4  mb-5'>
                                        <div className="product-img position-relative">
                                            <div
                                                className="ml-3 mt-4 avatar-sm product-lebbon"
                                                style={{width: '100%'}}>
                                                <img src={circle}
                                                     alt={circle}
                                                /> {list.shop['status']} | &nbsp;
                                                <span className='text-info'>{list.distances['distance']['text']}</span>
                                            </div>

                                            {list.shop['status'] === 'Open' ? (
                                                    <Link to={'/shop-list?id=' + list.shop['_id'] + '&dis=' + list.distances['distance']['text'] + '&time=' + list.distances['duration']['text']}  >
                                                        <img src={avatarUrl + list.shop['avatar']} alt={list.shop['avatar']} style={{width : '100%'}} />
                                                    </Link>
                                                ) :
                                                <img src={avatarUrl + list.shop['avatar']} alt={list.shop['avatar']} style={{width : '100%'}} />
                                            }
                                        </div>
                                        <div className="mt-3 ml-2 mr-2">
                                            <Row>
                                                <Col xs={9}>
                                                    <h5 className='text-left text-primary'>
                                                        {list.shop['name']}
                                                    </h5>
                                                </Col>
                                                <Col xs={3}>
                                                    <p className='text-right text-primary'>
                                                        <img src={flower} alt={flower}/>
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={8}>
                                                    <p className='text-left text-secondary font-size-14'>
                                                        <img src={cycle_flower} alt={cycle_flower} height='14px' /> {list.distances['duration']['text']}
                                                    </p>
                                                </Col>
                                                <Col xs={4}>
                                                    <p className='text-right text-secondary font-size-14'>
                                                        <img src={fee} alt={fee} height='14px' /> 55 SR
                                                    </p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            )
                        }
                    </Row>
                    <br/>
                    <Row>
                        <Col xl={12}>
                            <div className='mt-5 text-primary text-center'>
                                <h3 className='text-primary' style={{cursor: 'pointer'}}>
                                    <img className='image_rotate' src={yaward} alt={yaward} /> &nbsp; {this.props.t('Load More')}
                                </h3>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        )
    }
}

export default withNamespaces()(ShopList)
