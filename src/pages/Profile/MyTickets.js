import React, {Component} from 'react';
import {Button, CardTitle, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import manual_active from "../../assets/customer/manual.svg";
import {withNamespaces} from "react-i18next";

class MyTickets extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                <div className='p-md-4'>
                    <CardTitle>
                        <h1 className='text-primary mb-5'><b>{this.props.t('My Occasions')}</b></h1>
                    </CardTitle>
                    <Row>
                        <Col md={12}>
                            <div className='text-center'>
                                <img src={manual_active} alt={manual_active} height='90' />
                                <h1 className='mt-4 text-secondary pb-5'>
                                    {this.props.t('You')} {this.props.t("don't")} {this.props.t('have')} {this.props.t('any')} {this.props.t('ticket')} {this.props.t('yet')}</h1>
                            </div>
                        </Col>
                    </Row>

                    <Row className='mt-5 pb-4'>
                        <Col md={12}>
                            <Link onClick={() =>
                                this.setState({ isModal1: !this.state.modal1 })
                            }
                                  to="#">
                                <Button type='button' color='primary' className='btn btn-block waves-effect waves-light font-size-22'>
                                    {this.props.t('Add')} {this.props.t('Ticket')}
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                </div>
            </React.Fragment>
        )
    }
}

export default withNamespaces()(MyTickets)