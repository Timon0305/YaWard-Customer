import React, {Component} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Modal, ModalBody, Row} from "reactstrap";
import {Link} from "react-router-dom";
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {webUrl} from "../../config";
import cake from '../../assets/customer/cake(1).svg';
import {successToastr} from "../Toastr";
import occasion_deactive from "../../assets/customer/occasion.svg";
import closeButton from '../../assets/customer/close.svg';
import editButton from "../../assets/customer/edit-icon.svg";
import deleteButton from "../../assets/customer/delete.svg";
import {withNamespaces} from "react-i18next";

const token = localStorage.getItem('authCustomer');
const url = webUrl + '/v3/api/customer/profile/';
const borderStyle = {
    border: 'none',
    borderBottom: '1px solid #afadad',
    borderRadius: 'unset',
    fontFamily: 'auto',
    width: '100%',
    marginTop: '6px'
};

const fontFamily = {
    fontFamily: 'auto',
};

class MyOccasions extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            isModal1: false,
            formData: {
                title: '',
                occasionType: '',
                occasionDate: '',
                occasionRemain: ''
            },
            occasion: [],
            myOccasion: [],
            occasionId: '',
            modalData: '',
            modal1: ''
        }
    }

    componentDidMount() {
        axios.get(url + 'getOccasionList', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            this.setState({
                occasion: res['data']['occasion']
            })
        });

        axios.get(url + 'getMyOccasion', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            this.setState({
                myOccasion: res['data']['occasion']
            });
        })
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData.phone = localStorage.getItem('phone');
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    };

    handleChange1 = (event) => {
        const { modalData } = this.state;
        modalData.phone = localStorage.getItem('phone');
        modalData[event.target.name] = event.target.value;
        this.setState({ modalData });
    };

    handleSubmit = () => {
        axios.post(url + 'addNewOccasion', this.state.formData, {
            headers: {
                'Authorization': token
            }
        })
            .then(res => {
                successToastr(res['data']['msg']);
                this.setState({
                    myOccasion: res['data']['occasion'],
                    isModal: false
                });
            })
            .catch(e => console.error(e))
    };

    handleSubmit1 = () => {
        this.state.modalData['id'] = this.state.occasionId;
        axios.post(url + 'editNewOccasion', this.state.modalData, {
            headers: {
                'Authorization': token
            }
        })
            .then(res => {
                successToastr('Successfully Edited');
                this.setState({
                    myOccasion: res['data']['occasion'],
                    isModal1: false
                });
            })
            .catch(e => console.error(e))
    };

    deleteOccasion = (id) => {
        const alert = window.confirm('Are you going to delete address?');
        if (alert) {
            axios.post(url + 'deleteOccasion', {'id': id}, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                successToastr('Successfully Removed');
                this.setState({
                    myOccasion: res['data']['occasion']
                })
            })
        } else {
            return false;
        }
    };

    render() {
        const {formData, occasion, myOccasion} = this.state;
        let itemOccasion = [];
        for (let i = 0; i < occasion.length; i++) {
            itemOccasion.push(<option key={i} value={occasion[i].title}>{occasion[i].title}</option>)
        }

        for (let item of myOccasion) {
            if (item['_id'] === this.state.occasionId) {
                this.state.modalData = item;
            }
        }

        return (
            <React.Fragment>
                <div className='p-md-4'>
                    <CardTitle>
                        <h1 className='text-primary mb-5'>
                            <b>{this.props.t('My Occasions')}</b>
                        </h1>
                    </CardTitle>
                    <Row>
                        <Col md={12}>
                            {myOccasion && myOccasion.length ? (
                                <div>
                                    {
                                        myOccasion.map((list, key) =>
                                            <Card key={key}>
                                                <CardBody>
                                                    <Row className='mt-3 mb-1'>
                                                        <Col sm={8}>
                                                            <div className='ml-3'>
                                                                <h3 className='text-dark'>
                                                                    <span className='mr-1'>
                                                                        <img src={cake} alt={cake} height='25px' style={{marginTop: '-8px'}} />
                                                                    </span>
                                                                    {list.title}
                                                                    <span className='text-secondary'/>
                                                                </h3>
                                                            </div>
                                                        </Col>
                                                        <Col sm={4}>
                                                            <div className='text-sm-right text-primary'>
                                                                <Link onClick={() =>
                                                                    this.setState({
                                                                        isModal1: !this.state.modal1,
                                                                        occasionId: list._id
                                                                    })
                                                                }
                                                                      to="#">
                                                                    <img src={editButton} alt={editButton}
                                                                         className='mr-3'
                                                                         style={{height: '18px'}}/>
                                                                </Link>
                                                                <img src={deleteButton} alt={deleteButton}
                                                                     onClick={() => this.deleteOccasion(list._id)}
                                                                     className='cursor'
                                                                     style={{height: '18px', }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={9}>
                                                            <div className='ml-3 mr-3'>
                                                                <h1 className='text-primary'>
                                                                    {list.occasionDate}
                                                                </h1>
                                                            </div>
                                                        </Col>
                                                        <Col xs={3}>
                                                            <div className='text-sm-right'>
                                                                <p className='text-secondary mt-3'>{this.props.t('Reminder')} {this.props.t('Before')} {list.occasionRemain}</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        )
                                    }
                                </div>
                            ) : (
                                    <div className='text-center'>
                                        <img src={occasion_deactive} alt={occasion_deactive} height='90' />
                                        <h1 className='mt-4 text-secondary pb-5'>{this.props.t('You')} {this.props.t("don't")} {this.props.t('have')} {this.props.t('any')} {this.props.t('occasion')} {this.props.t('yet')}</h1>
                                    </div>
                                )
                            }
                        </Col>
                    </Row>

                    <Row className='mt-5 pb-4'>
                        <Col md={12}>
                            <Link onClick={() =>
                                this.setState({ isModal: !this.state.modal })
                            }
                                  to="#">
                                <Button type='button' color='primary' className='btn btn-block waves-effect waves-light font-size-22'>
                                    {this.props.t('Add')} {this.props.t('Occasion')}
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                </div>
                <Modal
                    size="lg"
                    isOpen={this.state.isModal}
                    toggle={() =>
                        this.setState({ isModal: !this.state.isModal })
                    }
                    centered
                    style={{maxWidth: '1000px'}}
                >
                    <ModalBody style={{padding: '0px'}}>
                        <Card style={{marginBottom: '0px'}}>
                            <CardBody style={{paddingTop: '0px'}}>
                                <Row>
                                    <Col md={6}/>
                                    <Col md={6}>
                                        <div className='text-right mt-2 mr-1'>
                                            <img src={closeButton} alt={closeButton}
                                                 onClick={() => this.setState({
                                                     isModal: false,
                                                 })}
                                                 data-dismiss="modal"
                                                 aria-label="Close"
                                                 className='cursor'
                                                 style={{marginTop: '4px',
                                                        height: '22px'
                                                 }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <div className='text-center'>
                                            <h1 className='text-primary' style={{fontFamily: 'auto'}}>{this.props.t('Add')} {this.props.t('New')} {this.props.t('Occasion')}</h1>
                                        </div>
                                    </Col>
                                </Row>
                                <ValidatorForm  ref='form' onSubmit={this.handleSubmit}  className='p-sm-5'>
                                    <Row>
                                        <Col md={6}  className='mt-3 mt-sm-2'>
                                            <TextValidator
                                                name="title"
                                                label={this.props.t("Occasion Title")}
                                                onChange={this.handleChange}
                                                value={formData.title || ''}
                                                errorMessages={['this field is required']}
                                                validators={['required']}
                                                style={{width: '100%'}}
                                            />
                                        </Col>
                                        <Col md={6}  className='mt-3 mt-sm-2'>
                                            <select className="form-control"
                                                    style={borderStyle}
                                                    name='occasionType'
                                                    onChange={this.handleChange}
                                                    value={formData.occasionType || this.state.modalData.occasionType}
                                            >
                                                <option value="">{this.props.t('unselected')}</option>
                                                {itemOccasion}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}  className='mt-3 mt-sm-5'>
                                            <TextValidator
                                                name="occasionDate"
                                                label={this.props.t("Occasion Date")}
                                                type="date"
                                                value={formData.occasionDate || ''}
                                                shoulddisabledate={new Date(Date.now())}
                                                onChange={this.handleChange}
                                                errorMessages={['this field is required']}
                                                validators={['required']}
                                                style={{width: '100%'}}
                                                InputLabelProps={{ shrink: true, required: true}}
                                            />
                                        </Col>
                                        <Col md={6}  className='mt-3 mt-sm-5'>
                                            <select className="form-control"
                                                    style={borderStyle}
                                                    required
                                                    name='occasionRemain'
                                                    onChange={this.handleChange}
                                                    value={formData.occasionRemain || this.state.modalData.occasionRemain}
                                            >
                                                <option value='3 Days'>{this.props.t('3 Days')}</option>
                                                <option value='2 Days'>{this.props.t('2 Days')}</option>
                                                <option value='1 Day'>{this.props.t('1 Day')}</option>
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row  className='mt-3 mt-sm-5'>
                                        <Col md={12}>
                                            <Button type='submit' color='primary' className='btn btn-block waves-effect waves-light font-size-18 fontFamily' style={fontFamily}>
                                                {this.props.t('Add')} {this.props.t('My')} {this.props.t('Occasions')}
                                            </Button>
                                        </Col>
                                    </Row>
                                </ValidatorForm>
                            </CardBody>
                        </Card>
                    </ModalBody>
                </Modal>

                <Modal
                    size="lg"
                    isOpen={this.state.isModal1}
                    toggle={() =>
                        this.setState({ isModal1: !this.state.isModal1 })
                    }
                    centered
                    style={{maxWidth: '1000px'}}
                >
                    <ModalBody style={{padding: '0px'}}>
                        <Card style={{marginBottom: '0px'}}>
                            <CardBody style={{paddingTop: '0px'}}>
                                <Row>
                                    <Col md={6}/>
                                    <Col md={6}>
                                        <div className='text-right mt-2 mr-1'>
                                            <img src={closeButton} alt={closeButton}
                                                 onClick={() => this.setState({
                                                     isModal1: false,
                                                 })}
                                                 data-dismiss="modal"
                                                 aria-label="Close"
                                                 className='cursor'
                                                 style={{marginTop: '4px',
                                                     height: '22px'
                                                 }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <div className='text-center'>
                                            <h1 className='text-primary' style={{fontFamily: 'auto'}}>Edit Occasion</h1>
                                        </div>
                                    </Col>
                                </Row>
                                <ValidatorForm ref='form' onSubmit={this.handleSubmit1} className='p-sm-5'>
                                    <Row>
                                        <Col md={6}  className='mt-3 mt-sm-2'>
                                            <TextValidator
                                                name="title"
                                                label={this.props.t("Occasion Title")}
                                                onChange={this.handleChange1}
                                                value={this.state.modalData.title}
                                                errorMessages={['this field is required']}
                                                validators={['required']}
                                                style={{width: '100%'}}
                                            />
                                        </Col>
                                        <Col md={6}  className='mt-3 mt-sm-2'>
                                            <select className="form-control"
                                                    style={borderStyle}
                                                    name='occasionType'
                                                    onChange={this.handleChange1}
                                                    value={this.state.modalData.occasionType}
                                            >
                                                <option value="">unselected</option>
                                                {itemOccasion}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}  className='mt-3 mt-sm-5'>
                                            <TextValidator
                                                name="occasionDate"
                                                label={this.props.t("Occasion Date")}
                                                type="date"
                                                value={this.state.modalData.occasionDate}
                                                shoulddisabledate={new Date(Date.now())}
                                                onChange={this.handleChange1}
                                                errorMessages={['this field is required']}
                                                validators={['required']}
                                                style={{width: '100%'}}
                                                InputLabelProps={{ shrink: true, required: true}}
                                            />
                                        </Col>
                                        <Col md={6}  className='mt-3 mt-sm-5'>
                                            <select className="form-control"
                                                    style={borderStyle}
                                                    required
                                                    name='occasionRemain'
                                                    onChange={this.handleChange1}
                                                    value={this.state.modalData.occasionRemain}
                                            >
                                                <option value='3 Days'>{this.props.t('3 Days')}</option>
                                                <option value='2 Days'>{this.props.t('2 Days')}</option>
                                                <option value='1 Day'>{this.props.t('1 Day')}</option>
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row  className='mt-3 mt-sm-5'>
                                        <Col md={12}>
                                            <Button type='submit' color='primary' className='btn btn-block waves-effect waves-light font-size-18 fontFamily' style={fontFamily}>
                                                {this.props.t('Edit')} {this.props.t('Occasions')}
                                            </Button>
                                        </Col>
                                    </Row>
                                </ValidatorForm>
                            </CardBody>
                        </Card>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default withNamespaces()(MyOccasions);