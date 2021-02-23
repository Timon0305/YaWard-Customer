import React, {Component} from "react";
import {Row, Col, CardBody, Card,  Container} from "reactstrap";
import {AvForm} from "availity-reactstrap-validation";
import { Redirect} from "react-router-dom";
import axios from 'axios';
import PinInput from "react-pin-input";
import {webUrl} from "../../config";
import MuiPhoneNumber from "material-ui-phone-number";
import {errorToastr, infoToastr, successToastr} from '../Toastr';
const url = webUrl + '/v3/api/customer/users/';


class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            time: {},
            seconds: 300,
            phone: '',
            value: "",
            code: '',
            redirect: false,
        };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    componentDidMount() {
        const {code} = this.props.location;
        if (code) {
            infoToastr('Please check your verification code')
        }
        this.setState({value: code});
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
        const phone = localStorage.getItem('phone');
        const code = this.state.code;
        const codeNum = this.state.value;
        if (code === codeNum.toString()) {
            axios.post(url + 'register', {'phone': phone})
                .then(response => {
                    if (response.data['success'] === true) {
                        localStorage.setItem('authCustomer', JSON.stringify(response['data']['token']));
                        const token = localStorage.getItem('authCustomer');
                        if (response['data']['token'] && response['data']['token'] !== undefined) {
                            this.setState({
                                token: token,
                                redirect: true
                            })
                        }
                    }
                })
                .catch(err => console.error(err))
        } else {
            errorToastr('Code Error');
            return false;
        }
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
            this.setState({value: ''})
        }
    }

    onChange = (code) => {
        this.setState({ code: code });
    };

    onClear = () => {
        this.setState({
            value: ""
        });
        this.pin.clear();
    };

    resendCode = (number) => {
        this.state.seconds = 300;
        axios.post(url + '/verify', {phone: number})
            .then(res => {
                infoToastr('Please check your code again');
                localStorage.setItem('code', res['data']['code']);
                this.setState({value: res['data']['code']})
            })
            .catch(err => console.error(err))
    };

    render() {
        const {data} = this.props.location;
        if (!data) {
            return <Redirect to='/login' />
        }

        const {redirect} = this.state;
        if (redirect) {
            successToastr('Successfully Login, Please check your information');
            return  <Redirect to='/profile' />
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
                                                    {/*{this.props.error && this.props.error ?*/}
                                                        {/*<Alert color="danger">{this.props.error}</Alert> : null}*/}
                                                    <MuiPhoneNumber
                                                        value={this.state.phone}
                                                        name='phone'
                                                        phaceholder = 'Enter Phone Number'
                                                        style={{width: '100%'}}
                                                        onChange = {phone => this.setState({phone})}
                                                    />
                                                    {/*<PhoneInput*/}
                                                        {/*name='phone'*/}
                                                        {/*value={this.state.phone}*/}
                                                        {/*disabled*/}
                                                        {/*validate={{*/}
                                                            {/*required: {value: true}*/}
                                                        {/*}}*/}
                                                        {/*onChange={phone => this.setState({phone})}*/}
                                                    {/*/>*/}

                                                    <div className='text-center mt-4'>
                                                        <PinInput
                                                            length={6}
                                                            focus
                                                            // disabled
                                                            name='code'
                                                            ref={p => (this.pin = p)}
                                                            type="numeric"
                                                            onChange={(e) => this.onChange(e)}
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

export default Verify
