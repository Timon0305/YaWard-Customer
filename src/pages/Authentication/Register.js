import React, {Component} from "react";
import {Row, Col, CardBody, Card, Alert, Container} from "reactstrap";
import {AvForm} from "availity-reactstrap-validation";
import {registerUser, apiError, registerUserFailed} from "../../store/actions";
import {connect} from "react-redux";
import { Redirect} from "react-router-dom";
import axios from 'axios';
import PhoneInput from "react-phone-input-2";
import PinInput from "react-pin-input";
import {webUrl} from "../../config";

const url = webUrl + '/v3/api/customer/users/verify';

class Register extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            time: {},
            seconds: 300,
            phone: '',
            value: "",
            redirect: false,
        };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    componentDidMount() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }

        const {data} = this.props.location;
        if (data === undefined) {
            this.setState({redirect: true})
        } else {
            this.setState({phone: data})
        }
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({
            time: timeLeftVar,
        });
    }

    handleValidSubmit() {
        this.props.registerUser(
            this.state.value,
            this.props.history
        );
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs/(60*60));
        let divisor_for_minutes = secs % (60*60);
        let minutes = Math.floor(divisor_for_minutes/60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            'h': hours,
            'm': minutes,
            's': seconds
        };
        return obj;
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds
        });

        if (seconds === 0) {
            clearInterval(this.timer);
            localStorage.removeItem('code')
        }
    }

    onChange = value => {
        this.setState({ value });
    };

    onClear = () => {
        this.setState({
            value: ""
        });
        this.pin.clear();
    };

    resendCode = (number) => {
       axios.post(url, {phone: number})
           .then(res => {
               console.log(res)
           })
           .catch(err => console.error(err))
    };

    render() {
        const {data} = this.props.location;
        if (!data) {
            return <Redirect to='/login' />
        }

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
                                                <b>Verify your phone number with PIN</b>
                                            </div>
                                            <div className="mt-4 h5 text-sm-center text-black-50">
                                                we sent you a text message
                                            </div>
                                            <div className="p-4">
                                                <AvForm className="form-horizontal"
                                                        onValidSubmit={this.handleValidSubmit}>
                                                    {this.props.error && this.props.error ?
                                                        <Alert color="danger">{this.props.error}</Alert> : null}
                                                    <PhoneInput
                                                        name='phone'
                                                        value={this.state.phone}
                                                        disabled
                                                        validate={{
                                                            required: {value: true}
                                                        }}
                                                        onChange={phone => this.setState({phone})}
                                                    />

                                                    <div className='text-center mt-4'>
                                                        <PinInput
                                                            length={6}
                                                            focus
                                                            // disabled
                                                            name='code'
                                                            ref={p => (this.pin = p)}
                                                            type="numeric"
                                                            onChange={this.onChange}
                                                            style={{height: '24px'}}
                                                        />
                                                    </div>
                                                    <div className="mt-5">
                                                        <button
                                                            className="btn btn-primary btn-block waves-effect waves-light"
                                                            type="submit">Verify
                                                        </button>
                                                    </div>
                                                    <div className='mt-4'>
                                                       <span className='text-secondary font-size-16'>
                                                            Didn't get the PIN
                                                       </span>
                                                        <span
                                                            className='ml-3 text-dark font-size-16'
                                                            style={{cursor: 'pointer'}}
                                                            onClick={() => this.resendCode(this.state.phone)}
                                                        >
                                                            <u>Resend Code</u>
                                                        </span>
                                                        <span className='text-secondary ml-3 font-size-16'>
                                                            After {this.state.time.m} : {this.state.time.s}
                                                        </span>
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
    const {user, registrationError, loading} = state.Account;
    return {user, registrationError, loading};
};

export default connect(mapStatetoProps, {registerUser, apiError, registerUserFailed})(Register);
