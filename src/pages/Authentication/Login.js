import React, {Component} from 'react';

import { Row, Col, CardBody, Card, Alert,Container } from "reactstrap";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AvForm } from 'availity-reactstrap-validation';

import MuiPhoneNumber from 'material-ui-phone-number';

import { loginUser,apiError } from '../../store/actions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {  };

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    handleValidSubmit(event, values) {
        values = this.state.phone;
        this.props.loginUser(values, this.props.history);
    }

    componentDidMount()
    {
        this.props.apiError("");
    }

    render() {

        return (
            <React.Fragment>
                <div className='account-pages my-5 pt-5' style={{height: '70vh'}}>
                    <div className="account-pages my-5 pt-sm-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={9} lg={7} xl={7}>
                                    <Card className="overflow-hidden">
                                        <CardBody className="pt-0">
                                            <div className="h1 mt-5 text-sm-center text-black-50">
                                                Log in
                                            </div>
                                            <div className="mt-4 h5 text-sm-center text-black-50">
                                                Enter your mobile number please
                                            </div>
                                            <div className="p-4">
                                                <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>
                                                    {this.props.error && this.props.error ? <Alert color="danger">{this.props.error}</Alert> : null}
                                                        <MuiPhoneNumber
                                                            defaultCountry={'sa'}
                                                            name='phone'
                                                            phaceholder = 'Enter Phone Number'
                                                            style={{width: '100%'}}
                                                            onChange = {phone => this.setState({phone})}
                                                        />
                                                    <div className="mt-5">
                                                        <button className="btn btn-primary btn-block waves-effect waves-light h3" type="submit">Log In</button>
                                                    </div>
                                                </AvForm>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { error } = state.Login;
    return { error };
};

export default withRouter(connect(mapStatetoProps, { loginUser,apiError })(Login));

