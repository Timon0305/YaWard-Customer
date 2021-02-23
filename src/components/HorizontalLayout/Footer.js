import React, {Component} from "react";
import { Container, Row, Col } from "reactstrap";
import {withNamespaces} from "react-i18next";

import facebook from '../../assets/customer/facebook(1).svg'
import instagram from '../../assets/customer/instagram(1).svg';
import twitter from '../../assets/customer/twitter.svg';
import snapshot from '../../assets/customer/snapchat.svg';
import youtube from '../../assets/customer/youtube.svg';
import google_app from '../../assets/customer/google_app.png';
import apple_app from '../../assets/customer/apple_app.png';


const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid={true}>
                    <Row className='mt-4 text-center'>
                        <Col lg={6}>
                            <Row className='ml-md-5 mt-3'>
                                <Col md={3} sm={4}>
                                    <div className='ml-sm-4 text-md-left'>
                                        <h3 className='cursor'>YaWard</h3>
                                        <p className='cursor'>About Us</p>
                                        <p className='cursor'>Contact Us</p>
                                        <p className='cursor'>Careers</p>
                                    </div>
                                </Col>
                                <Col md={3} sm={4}>
                                    <div className='ml-sm-3 text-md-left'>
                                        <h3 className='cursor'>Support</h3>
                                        <p className='cursor'>Privacy Policy</p>
                                        <p className='cursor'>Terms of Use</p>
                                        <p className='cursor'>FAQs</p>
                                    </div>
                                </Col>
                                <Col md={3} sm={4}>
                                    <div className='ml-sm-3 text-md-left'>
                                        <h3 className='cursor'>Shops</h3>
                                        <p className='cursor'>Add Your Shop</p>
                                        <p className='cursor'>Become a Rider</p>
                                        <p className='cursor'>How to Use</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={6}>
                            <Row>
                                <Col md={6}>
                                    <div className="text-md-left mt-sm-4  d-sm-block">
                                        <h3 className='cursor'>Follow Us</h3>
                                        <div className='mt-5 mb-5'>
                                            <a target='_blank' href="https://www.facebook.com/">
                                                <img src={facebook} alt={facebook} width={30} height={30} className='mr-3' />
                                            </a>
                                            <a target='_blank' href="https://www.instagram.com/">
                                                <img src={instagram} alt={instagram} width={30} height={30} className='mr-3'/>
                                            </a>
                                            <a target='_blank' href="https://twitter.com/">
                                                <img src={twitter} alt={twitter} width={30} height={30} className='mr-3'/>
                                            </a>
                                            <a target='_blank' href="https://www.snapchat.com/">
                                                <img src={snapshot} alt={snapshot} width={30} height={30} className='mr-3'/>
                                            </a>
                                            <a target='_blank' href="https://www.youtube.com/">
                                                <img src={youtube} alt={youtube} width={30} height={30} className='mr-3'/>
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                                <br/>
                                <Col md={6}>
                                    <div className="text-md-left mt-sm-4 d-sm-block">
                                        <h3 className='cursor'>Download App</h3>
                                        <div className='mt-5'>
                                            <a target='_blank' href="https://www.apple.com/">
                                                <img
                                                    src={apple_app}
                                                    alt={apple_app}
                                                    height={40}
                                                    className='mr-xl-2 cursor'
                                                />
                                            </a>
                                            <a target='_blank'  href="https://play.google.com/">
                                                <img
                                                    src={google_app}
                                                    alt={google_app}
                                                    height={40}
                                                    className='ml-xl-2 cursor' />
                                            </a>
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

export default withNamespaces()(Footer);
