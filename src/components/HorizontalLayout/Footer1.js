import React from "react";
import { Container, Row, Col } from "reactstrap";

import facebook from '../../assets/customer/facebook(1).svg'
import instagram from '../../assets/customer/instagram(1).svg';
import twitter from '../../assets/customer/twitter.svg';
import snapshot from '../../assets/customer/snapchat.svg';
import youtube from '../../assets/customer/youtube.svg';
import apple_app from "../../assets/customer/apple_app.png";
import google_app from "../../assets/customer/google_app.png";

const Footer1 = () => {


    return (
        <React.Fragment>
            <footer className='footer' >
                <Container fluid={true}>
                    <Row className='mt-4'>
                        <Col lg={6}>
                            <Row className='mt-4 text-center'>
                                <Col md={3}>
                                    <div className='ml-4'>
                                        <h4>YaWard</h4>
                                        <p>About Us</p>
                                        <p>Contact Us</p>
                                        <p>Careers</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className='ml-3'>
                                        <h4>Support</h4>
                                        <p>Privacy Policy</p>
                                        <p>Terms of Use</p>
                                        <p>FAQs</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className='ml-3'>
                                        <h4>Shops</h4>
                                        <p>Add Your Shop</p>
                                        <p>Become a Rider</p>
                                        <p>How to Use</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={6}>
                            <Row>
                                <Col md={6}>
                                    <div className="text-sm-left  d-sm-block">
                                        <h4>Follow Us</h4>
                                        <div className='mt-5'>
                                            <img src={facebook} alt={facebook} width={30} height={30} className='mr-3' />
                                            <img src={instagram} alt={instagram} width={30} height={30} className='mr-3'/>
                                            <img src={twitter} alt={twitter} width={30} height={30} className='mr-3'/>
                                            <img src={snapshot} alt={snapshot} width={30} height={30} className='mr-3'/>
                                            <img src={youtube} alt={youtube} width={30} height={30} className='mr-3'/>
                                        </div>
                                    </div>
                                </Col>
                                <br/>
                                <Col md={6}>
                                    <div className="text-sm-left mt-sm-4 d-sm-block">
                                        <h4>Download App</h4>
                                        <div className='mt-5'>
                                            <img src={apple_app} alt={apple_app} height={40} className='mr-2' />
                                            <img src={google_app} alt={google_app} height={40} className='ml-2' />
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer1;
