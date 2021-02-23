import React, {Component} from 'react';
import {Card, CardBody, CardTitle, Col, FormGroup, Input, Label, Row} from "reactstrap";
import mini_flower from "../../assets/customer/c3ab86706ab978f4f7f0853e7f2a55b3.png";
import empty_heart from "../../assets/customer/empty-heart-01.svg";
import coin from "../../assets/customer/coin.svg";
import stopwatch from "../../assets/customer/stopwatch(1).svg";
import yaward from "../../assets/customer/YaWard-Favicon-08.svg";
import {withNamespaces} from "react-i18next";

class TopOffers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Offers: [],
            setRating: true,
            setPreparing: true,
            setPrice: true,
            setDistance: true,
        }
    }

    setHighRatingHandler = () => {
        this.setState({setRating: !this.state.setRating});
    };

    setLowRatingHandler = () => {
        this.setState({setRating: !this.state.setRating})
    };

    setFastPreparingHandler = () => {
        this.setState({setPreparing: !this.state.setPreparing});
    };

    setSlowPreparingHandler = () => {
        this.setState({setPreparing: !this.state.setPreparing});
    };

    setLowPriceHandler = () => {
        this.setState({setPrice: !this.state.setPrice});
    };

    setHighPriceHandler = () => {
        this.setState({setPrice: !this.state.setPrice})
    };

    setCloserDistanceHandler = () => {
        this.setState({setDistance: true});
    };

    setFurtherDistanceHandler = () => {
        this.setState({setDistance: false});
    };

    render() {
        return (
            <React.Fragment>
                <Col lg="3">
                    <Card className='mt-3'>
                        <CardBody>
                            <CardTitle className="mb-3">
                                <form className="  d-lg-block">
                                    <FormGroup className='app-search'>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{
                                                    borderRadius: '0 0 8px 8px',
                                                    background: 'transparent',
                                                    border: '1px solid #F0F0F0',
                                                }}
                                                id='filterText'
                                                placeholder={this.props.t("Search...")}
                                                // value={this.state.filterText}
                                                onChange={(e) => this.filter(e.target.value)}
                                            />
                                            <span className="bx bx-search-alt text-secondary"/>
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
                                    <FormGroup className='mt-3'>
                                        <Label className="d-block mb-3 font-size-20 text-secondary">{this.props.t('Preparing')}
                                            {this.props.t('Time')}</Label>
                                        <div className="custom-control custom-radio mt-3 ">
                                            <Input
                                                type="radio"
                                                id="setFastPreparing"
                                                name="setPreparing"
                                                className="custom-control-input mr-3"
                                                defaultChecked
                                                onChange={(e) => this.setFastPreparingHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setFastPreparing"
                                            >
                                                {this.props.t('Fastest')} {this.props.t('to')} {this.props.t('Slowest')}
                                            </Label>
                                        </div>
                                        <div className="custom-control custom-radio mt-3">
                                            <Input
                                                type="radio"
                                                id="setSlowPreparing"
                                                name="setPreparing"
                                                className="custom-control-input mr-3"
                                                onChange={(e) => this.setSlowPreparingHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setSlowPreparing"
                                            >
                                                {this.props.t('Slowest')} {this.props.t('to')} {this.props.t('Fastest')}
                                            </Label>
                                        </div>

                                    </FormGroup>
                                    <FormGroup className='mt-3'>
                                        <Label
                                            className="d-block mb-3 font-size-20 text-secondary">{this.props.t('Price')} </Label>
                                        <div className="custom-control custom-radio mt-3 ">
                                            <Input
                                                type="radio"
                                                id="setLowPrice"
                                                name="setPrice"
                                                className="custom-control-input mr-3"
                                                defaultChecked
                                                onChange={(e) => this.setLowPriceHandler(e.target.value)}
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
                                                onChange={(e) => this.setHighPriceHandler(e.target.value)}
                                            />
                                            <Label
                                                className="custom-control-label font-size-16 text-secondary"
                                                htmlFor="setHighPrice"
                                            >
                                                {this.props.t('High')} {this.props.t('to')} {this.props.t('Low')}
                                            </Label>
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
                                </form>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="9">
                    <Row className='mt-3'>
                        {
                            this.state.Offers.map((offer, key) =>
                                <Col xl="4" sm="6" key={"_col_" + key}>
                                    <div className='ml-lg-4 mr-lg-4 mb-5'>
                                        <div className="product-img position-relative">
                                            <div className="ml-2 mt-2 avatar-sm product-lebbon"
                                                 style={{width: '100%', display: 'flex'}}>
                                                <img src={mini_flower}
                                                     alt={mini_flower}
                                                /> {offer.status} &nbsp;
                                                <div className='mt-2 ml-2'>
                                                                        <span>
                                                                            {offer.name}
                                                                        </span>
                                                    <br/>
                                                    <span className='text-info'>
                                                                            1.4km
                                                                        </span>
                                                </div>
                                            </div>
                                            <div className='mr-2 mt-3 avatar-sm product-ribbon'>
                                                <img src={empty_heart} alt={empty_heart}/>
                                            </div>

                                            <img src={offer.image} alt={offer.image} style={{width : '100%'}} />
                                        </div>
                                        <div className="mt-3 ml-2 mr-2">
                                            <Row>
                                                <Col xs={12}>
                                                    <h5 className='text-left text-primary'>
                                                        {offer.name}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={8}>
                                                    <p className='text-left text-dark font-size-12'>
                                                        <img src={coin} alt={coin} height='15px' className='ml-2' /> {offer.price} SR
                                                    </p>
                                                </Col>
                                                <Col xs={4}>
                                                    <p className='text-right text-dark font-size-12'>
                                                        <img src={stopwatch} alt={stopwatch} height='15px' /> 30~40 min
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
                                    <img src={yaward} alt={yaward} /> &nbsp; {this.props.t('Load More')}
                                </h3>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        )
    }
}

export default withNamespaces()(TopOffers)