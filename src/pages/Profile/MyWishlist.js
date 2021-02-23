import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, CardTitle, Col, Row} from "reactstrap";
import axios from 'axios';
import {webUrl} from "../../config";
import fill_heart from "../../assets/customer/fill-heart.svg";
import LinesEllipsisLoose from "react-lines-ellipsis/lib/loose";
import coin from "../../assets/customer/coin.svg";
import cart_button from "../../assets/customer/button.svg";
import wishlist_deactive from "../../assets/customer/wishlist (1).svg";
import {withNamespaces} from "react-i18next";

const token = localStorage.getItem('authCustomer');
const url = webUrl + '/v3/api/customer/profile/';

class MyWishList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            myWishList: []
        }

    }

    componentDidMount() {
        axios.get(url + 'getMyWishList', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            this.setState({
                myWishList: res['data']['wishlist']
            })
        })
    }

    render() {
        const {myWishList} = this.state;
        return (
            <React.Fragment>
                <div className='p-md-4'>
                    <CardTitle>
                        <h1 className='text-primary mb-5'>
                            <b>{this.props.t('My Wishlist')}</b>
                        </h1>
                    </CardTitle>
                    {myWishList.length ? (
                        myWishList.map((flower, key) =>
                            <Card className='mb-4' key={"_col_" + key} style={{width: '100%'}}>
                                <Col xl="12" sm="12" >
                                    <Row>
                                        <Col md={3} sm={5} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                            <div className=' mr-2'>
                                                <img src={webUrl + '/public/products/' + flower['product']['image']}
                                                     alt={flower['product']['image']}
                                                     style={{width: '100%', maxHeight: '200px'}}
                                                />
                                            </div>
                                        </Col>

                                        <Col md={9} sm={7}>
                                            <div className='mt-3'>
                                                <Row>
                                                    <Col xs={10}>
                                                        <div className='mb-3'>
                                                            <h3 className='text-primary cursor'>{flower['product']['title']}</h3>
                                                        </div>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <div className='text-right'>
                                                            <img
                                                                key={key}
                                                                src={fill_heart}
                                                                alt={fill_heart}
                                                                height='22px'
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={10} className='font-size-16 cursor text-dark'>
                                                        <LinesEllipsisLoose
                                                            text={flower['product']['description']}
                                                            maxLine='1'
                                                            lineHeight='25'
                                                        />
                                                    </Col>
                                                    <Col xs={2}/>
                                                </Row>
                                                <Row>
                                                    <Col xs={12}>
                                                        <div className='mt-3'>
                                                            <span className='mr-3'>
                                                                <img src={webUrl + '/public/shopAvatar/' + flower['shop']['avatar']}
                                                                     alt={flower['shop']['avatar']}
                                                                     style={{borderRadius: '50%', height: '35px'}}
                                                                />
                                                            </span>
                                                            <span className='text-primary'>
                                                                {flower['shop']['name']}
                                                            </span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={6}>
                                                        <div className='mt-sm-2 mb-2'>
                                                            <span>
                                                                <img src={coin} alt={coin} height='20px' />
                                                            </span>
                                                            <span className='text-dark ml-2 font-size-22'>
                                                                {flower['product']['discount_price']} SR
                                                            </span>
                                                            <span className='text-secondary font-size-16 ml-2'>
                                                                {flower['regular_price'] !== flower['discount_price'] ? (
                                                                    <del>{flower['product']['regular_price']} SR</del>
                                                                ) : null}
                                                            </span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className='mt-sm-2 text-right' style={{cursor: 'pointer'}}>
                                                            <img src={cart_button} alt={cart_button} height='18px' />
                                                            <span className='text-primary ml-2 font-size-16'>{this.props.t('Add')} {this.props.t('to')} {this.props.t('Cart')}</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Card>
                        )
                    ): (
                        <div>
                            <Row>
                                <Col md={12}>
                                    <div className='text-center'>
                                        <img src={wishlist_deactive} alt={wishlist_deactive} height='90' />
                                        <h1 className='mt-4 text-secondary pb-5'>
                                            {this.props.t('You')} {this.props.t("don't")} {this.props.t('have')} {this.props.t('any')} {this.props.t('product')} {this.props.t('in')} {this.props.t('your')} {this.props.t('wishlist')}</h1>
                                    </div>
                                </Col>
                            </Row>

                            <Row className='mt-5 pb-4'>
                                <Col md={12}>
                                    <Link to='/'>
                                        <Button type='button' color='primary' className='btn btn-block waves-effect waves-light font-size-22'>
                                            {this.props.t('Find')} {this.props.t('Your')} {this.props.t('First')} {this.props.t('Favorite')} {this.props.t('Product')}
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    )}

                </div>
            </React.Fragment>
        )
    }
}

export default withNamespaces()(MyWishList);