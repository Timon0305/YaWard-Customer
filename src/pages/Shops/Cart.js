import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Table} from "reactstrap";
import {withNamespaces} from "react-i18next";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartNum: 1,
            cartProductName: '',
            cartProductPrice: '',
            orderPrice: '',
            deliveryFee: 55,
            discount: 70,
            vatFee: 50,
            cartTotalPrice: '',
            cartProduct: [],
            shopTime: sessionStorage.getItem('shopTime')
        }
    }

    render () {
        const {cartProduct} = this.props;
        let totalPrice = 0;
        for (let item of cartProduct) {
            totalPrice += parseInt(item.quantity) * parseInt(item.discount_price);
        }
        let orderPrice = totalPrice;

        return (
            <React.Fragment>
                <Card>
                    <div color='primary' className="btn btn-primary font-size-18 text-center borderRadius">{this.props.t('Your')} {this.props.t('Cart')}</div>
                    {cartProduct.length !== 0 ? (
                        <div className="table-responsive mt-3">
                            <Table className="table p-0">
                                <tbody>
                                {
                                    cartProduct.map((flower, key) =>
                                        <tr key={key}>
                                            <td>
                                                <span className='text-primary font-size-14'>{flower.quantity}</span>
                                                <span className='text-secondary font-size-10 ml-1'>*</span>
                                                <span className='text-secondary font-size-14 ml-1'>{flower.title}</span>
                                                <i className='ml-2 bx bx-pencil' />
                                            </td>
                                            <td className='text-right'>
                                                <span>{parseInt(flower.quantity) * parseInt(flower['discount_price'])} SR</span>
                                                <i className='bx bx-trash text-primary ml-1 cursor'
                                                   onClick={() => this.props.removeCart(flower._id)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>

                            <Table className="table mb-2">
                                <tbody>
                                <tr>
                                    <td>
                                        {this.props.t('Order')} {this.props.t('Amount')}
                                    </td>
                                    <td className='text-right text-primary'>
                                        {orderPrice} SR
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {this.props.t('Delivery')} {this.props.t('Fees')}
                                    </td>
                                    <td className='text-right text-primary'>
                                        {this.state.deliveryFee} SR
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {this.props.t('Discount')} ({this.props.t('if')} {this.props.t('any')})
                                    </td>
                                    <td className='text-right text-primary'>
                                        - {this.state.discount} SR
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {this.props.t('VAT')}
                                    </td>
                                    <td className='text-right text-primary'>
                                        {this.state.vatFee} SR
                                    </td>
                                </tr>
                                <tr>
                                    <td className='font-size-18'>
                                        {this.props.t('Total')}
                                    </td>
                                    <td className='text-right text-primary font-size-18'>
                                        {parseInt(orderPrice) + parseInt(this.state.deliveryFee) - parseInt(this.state.discount) + parseInt(this.state.vatFee)} SR
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <div className='mt-3 text-center'>
                                <span className='text-secondary font-size-12'>{this.props.t('Estimate')} {this.props.t('Preparing')} {this.props.t('Time')}</span>
                                <span className='text-dark font-size-14 ml-1'>({sessionStorage.getItem('shopTime')})</span>
                            </div>
                        </div>
                    ) : (
                        <div className='pt-4'>
                            <h1 className='text-center text-primary cursor'>
                                <i className='mdi mdi-cart-plus'/>
                            </h1>
                            <h5 className='text-primary text-center'>
                                {this.props.t('Your')} {this.props.t('Cart')} {this.props.t('is')} {this.props.t('Empty')}
                            </h5>
                        </div>
                    )}
                    <Link to='/checkout' style={{textAlign: 'center'}}>
                        <Button color='primary'
                                className='mt-3 mb-3 font-size-16 btn btn-primary text-white borderRadius'
                                style={{width: '90%'}}
                        >
                            {this.props.t('Go')} {this.props.t('to')} {this.props.t('Checkout')}
                        </Button>
                    </Link>
                </Card>
            </React.Fragment>
        )
    }
}

export default withNamespaces()(Cart)