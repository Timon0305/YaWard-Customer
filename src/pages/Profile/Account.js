import React , {Component} from 'react';
import {Button, CardTitle, Col, Row} from "reactstrap";
import axios from "axios";
import {webUrl} from "../../config";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MuiPhoneNumber from "material-ui-phone-number";
import {successToastr} from "../Toastr";
import {withNamespaces} from "react-i18next";

const url = webUrl + '/v3/api/customer/profile/';
const borderStyle = {
    border: 'none',
    borderBottom: '1px solid #afadad',
    borderRadius: 'unset',
    fontFamily: 'auto',
    width: '100%',
    marginTop: '6px'
};
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('authCustomer'),
            formData: {
                first_name: '',
                username: '',
                email: '',
                birthday: '',
                phone: localStorage.getItem('phone'),
                gender: '',
            },
            value: '',
            submitted: false,
        };
    }

    componentDidMount() {
        axios.get(url + 'getMyAccount', {
            headers: {
                'Authorization': this.state.token
            }
        }).then(res => {
            const account = res['data']['customer'];
            this.setState({
                formData: {
                    first_name: account['first_name'],
                    username: account['first_name'] + ' ' + account['last_name'],
                    email: account['email'],
                    birthday: account['birthday'],
                    gender: account['gender']
                }
            })
        })
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData.phone = localStorage.getItem('phone');
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    };

    handleSubmit = () => {
        axios.post(url + 'addAccountInformation', this.state.formData, {
            headers: {
                'Authorization': this.state.token
            }
        })
            .then(res => {
                successToastr(res['data']['msg']);
                const account = res['data']['customer'];
                this.setState({
                    formData: {
                        first_name: account['first_name'],
                        last_name: account['last_name'],
                        username: account['first_name'] + ' ' + account['last_name'],
                        email: account['email'],
                        birthday: account['birthday'],
                        gender: account['gender']
                    }
                })
            })
            .catch(e => console.error(e))
    };

    render() {
        const {formData} = this.state;

        return (
            <React.Fragment>
                <div className='p-md-4'>
                    <CardTitle>
                        <h1 className='text-primary mb-5'>
                            <b>{this.props.t('Account')} {this.props.t('Information')}</b>
                        </h1>
                    </CardTitle>
                    <ValidatorForm ref='form' onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md={12}>
                                <TextValidator
                                    name="username"
                                    label={this.props.t("Full Name")}
                                    onChange={this.handleChange}
                                    value={formData.username}
                                    errorMessages={['this field is required']}
                                    validators={['required']}
                                    style={{width: '100%'}}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className='mt-3 mt-sm-5'>
                                <TextValidator
                                    name="email"
                                    label={this.props.t("Email Address")}
                                    value={formData.email || ''}
                                    onChange={this.handleChange}
                                    errormessage={['this field is required']}
                                    validators={['required', 'isEmail']}
                                    style={{width: '100%'}}
                                />
                            </Col>
                            <Col md={6} className='mt-3 mt-sm-5'>
                                <MuiPhoneNumber
                                    defaultCountry={'sa'}
                                    name='phone'
                                    onChange={this.handleChange}
                                    phaceholder = 'Enter Phone Number'
                                    style={{width: '100%', paddingTop: '15px'}}
                                    value={formData.phone}
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className='mt-3 mt-sm-5'>
                                <TextValidator
                                    name="birthday"
                                    label={this.props.t("Date of Birth")}
                                    type="date"
                                    value={formData.birthday || ''}
                                    onChange={this.handleChange}
                                    errormessage={['this field is required']}
                                    validators={['required']}
                                    style={{width: '100%'}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Col>
                            <Col md={6} className='mt-3 mt-sm-5'>
                                <select className="form-control"
                                        style={borderStyle}
                                        name='gender'
                                        onChange={this.handleChange}
                                        value={formData.gender}
                                >
                                    <option value='Male'>{this.props.t('Male')}</option>
                                    <option value='Female'>{this.props.t('Female')}</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className='mt-5 pb-4'>
                            <Col md={12}>
                                <Button type='submit' color='primary' className='btn btn-block waves-effect waves-light font-size-22'>
                                    {this.props.t('Save')}
                                </Button>
                            </Col>
                        </Row>
                    </ValidatorForm>

                </div>
            </React.Fragment>
        )
    }
}

export default withNamespaces()(Account);