import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Card, CardBody, CardTitle, Col, Modal, ModalBody, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {GoogleApiWrapper, InfoWindow, Map, Marker} from "google-maps-react";
import aim from "../../assets/customer/aim.svg";
import {withNamespaces} from "react-i18next";
import axios from 'axios';
import {webUrl} from "../../config";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import MuiPhoneNumber from "material-ui-phone-number";
import {successToastr} from "../Toastr";
import address from '../../assets/customer/bookmark.svg'
import editButton from '../../assets/customer/edit-icon.svg';
import deleteButton from '../../assets/customer/delete.svg';

const token = localStorage.getItem('authCustomer');
const url = webUrl + '/v3/api/customer/profile/';

const LoadingContainer = props => <div>Loading...</div>;

class Addresses extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            isOpen: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            currentLatLng: {
                lat: 0,
                lng: 0
            },
            loading: true,
            formData: {
                recipient: '',
                address: '',
                phone: localStorage.getItem('phone'),
            },
            myAddress: {
                recipient: '',
                address: '',
                phone: localStorage.getItem('phone'),
            },
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.currentLatLng !== this.state.currentLatLng) {
            this.recenterMap();
        }
    }
    componentDidMount() {
        axios.post(url + 'getUserName', this.state, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            this.setState({
                myAddress: {
                    recipient: res['data']['customer']['recipient'],
                    phone: localStorage.getItem('phone'),
                    address: res['data']['customer']['address'],
                },
            })
        });

        axios.get(url + 'getAddress', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const address = res['data']['customer'];
            this.setState({
                myAddress: {
                    recipient: address['recipient'],
                    address: address['address'],
                    phone: address['phone'],
                }
            })
        });

        const refs = {};

        this.setState({
            places: [],
            onSearchBoxMounted: ref => {

                refs.searchBox = ref;
            },
            onPlacesChanged: () => {
                const places = refs.searchBox.getPlaces();

                for (let i= 0 ; i < places.length; i++){
                    this.setState({
                        currentLatLng : {
                            lat: places[i].geometry.location.lat(),
                            lng: places[i].geometry.location.lng()
                        },
                    });
                }
                this.setState({
                    places
                });
                this.recenterMap();
            }
        });

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLatLng: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
        this.loadMap();
    }

    loadMap = () => {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const {lat, lng} = this.state.currentLatLng;
            const center = new maps.LatLng(lat, lng);

            const mapConfig = Object.assign({}, {
                center: center,
                zoom: 16
            });
            this.map = new maps.Map(node, mapConfig);
        }
    };

    recenterMap  = () => {
        const map = this.map;
        const curr = this.state.currentLatLng;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            let geocoder = new maps.Geocoder;
            geocoder.geocode({'location': this.state.currentLatLng}, (results, status) => {
                this.setState({
                    formData: {
                        address: results[0].formatted_address
                    }
                })
            });
            let marker = new maps.Marker({
                position: center,
            });
            map.panTo(center);
            marker.setMap(map);
        }
    };

    onMarkerClick(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    handleChange = (event) => {
        const { formData, myAddress } = this.state;
        formData.phone = localStorage.getItem('phone');
        myAddress[event.target.name] = event.target.value;
        this.setState({ formData, myAddress });
    };

    handleSubmit = () => {
        axios.post(url + 'addAddress', this.state, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            successToastr(res['data']['msg']);
            const address = res['data']['customer'];
            this.setState({
                myAddress: {
                    recipient: address['recipient'],
                    address: address['address'],
                    phone: address['phone']
                }
            })
        })
    };

    deleteAddress = (phone) => {
        const alert = window.confirm('Are you going to delete address?');
        if (alert) {
            axios.post(url + 'deleteAddress', {'phone': phone}, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                successToastr(res['data']['msg']);
                const address = res['data']['customer'];
                this.setState({
                    myAddress: {
                        recipient: address['recipient'],
                        address: address['address'],
                        phone: address['phone'],
                    }
                })
            })
        } else {
            return false;
        }
    };

    render() {
        let {formData, currentLatLng, myAddress} = this.state;
        const { google } = this.props;
        return (
            <React.Fragment>
                <div className='p-md-4'>
                    <CardTitle>
                        <h1 className='text-primary mb-5'>
                            <b>{this.props.t('My Addresses')}</b>
                        </h1>
                    </CardTitle>
                    <Row>
                        <Col md={12}>
                            {myAddress.address ? (
                                <div>
                                    <Card>
                                        <CardBody>
                                            <Row className='mt-3 mb-1'>
                                                <Col sm={8}>
                                                    <div className='ml-3'>
                                                        <h3 className='text-dark'>
                                                            {myAddress.recipient}
                                                            <span className='text-secondary'/>
                                                        </h3>
                                                    </div>
                                                </Col>
                                                <Col sm={4}>
                                                    <div className='text-sm-right text-primary'>
                                                        <Link onClick={() =>
                                                            this.setState({ isModal: !this.state.modal })
                                                        }
                                                              to="#">
                                                            <img src={editButton} alt={editButton}
                                                                 className='mr-3'
                                                                 style={{height: '18px'}}/>
                                                        </Link>
                                                        <img src={deleteButton} alt={deleteButton}
                                                             onClick={() => this.deleteAddress(myAddress.phone)}
                                                             className='cursor'
                                                             style={{height: '18px', }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12}>
                                                    <div className='ml-3 mr-3'>
                                                        <p className='font-size-18 text-secondary'>
                                                            {myAddress.address}
                                                        </p>
                                                    </div>
                                                    <div className='ml-3 mr-3'>
                                                        <p className='font-size-18 text-primary'> {myAddress.phone}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </div>
                            ) : (
                                <div className='text-center'>
                                    <img src={address} alt={address} height='90' />
                                    <h1 className='mt-4 text-secondary pb-5'>
                                        {this.props.t('You')} {this.props.t("don't")} {this.props.t('have')} {this.props.t('any')} {this.props.t('saved')} {this.props.t('address')} {this.props.t('yet')}</h1>
                                </div>
                            )}
                            <div hidden ref='map' style={{height: '500px', width: '1000px'}}/>
                        </Col>
                    </Row>

                    <Row className='mt-5 pb-4'>
                        <Col md={12}>
                            <Link onClick={() =>
                                this.setState({ isModal: !this.state.modal })
                            }
                                  to="#">
                                <Button type='button' color='primary' className='btn btn-block waves-effect waves-light font-size-22'>
                                    {this.props.t('Add')} {this.props.t('Address')}
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
                    style={{maxWidth: '1400px'}}
                >
                    <ModalBody style={{padding: '0px'}}>
                        <Card style={{height: '500px', marginBottom: '0px'}}>
                            <Map
                                google={google}
                                style={{ width: "100%", height: "100%" }}
                                zoom={18}
                                initialCenter={currentLatLng}
                            >
                                <Marker
                                    onClick={this.onMarkerClick}
                                    title={"The marker`s title will appear as a tooltip."}
                                    name={this.state.selectedPlace.name}
                                    position={currentLatLng}
                                />
                                <Marker name={"Dolores park"} />
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                    onClose={this.onClose}
                                 >
                                    <div>
                                        <h1 className='text-primary'>{this.state.selectedPlace.name}</h1>
                                    </div>
                                </InfoWindow>
                            </Map>
                            <Row>
                                <Col md={12}>
                                    <div className='text-center'>
                                        <h1 className='text-primary' style={{fontFamily: 'auto'}}>{this.props.t('Add')} {this.props.t('New')} {this.props.t('Address')}</h1>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <Card style={{marginBottom: '0px'}}>
                            <CardBody>
                                <Row className='text-center'>
                                    <Col md={6}>
                                        <h4 className='text-sm-left text-dark' style={{fontFamily: 'auto'}}>
                                            {formData.address}
                                        </h4>
                                    </Col>
                                    <Col md={6}>
                                        <div className='text-sm-right mr-sm-4'>
                                            <img src={aim} alt={aim} height='22px'/>
                                            <span className='text-primary font-size-16 ml-2 cursor' id='myLocation'>{this.props.t('Use')} {this.props.t('my')} {this.props.t('location')}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <hr/>
                                <ValidatorForm ref='form' onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col md={6} className='mt-3 mt-sm-5'>
                                            <TextValidator
                                                name="recipient"
                                                label={this.props.t("Recipient's Name")}
                                                value={myAddress.recipient || ''}
                                                onChange={this.handleChange}
                                                errorMessages={['this field is required']}
                                                validators={['required']}
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
                                                value={localStorage.getItem('phone')}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}  className='mt-3 mt-sm-5'>
                                            <TextValidator
                                                name="address"
                                                label={this.props.t("Address Description")}
                                                value={formData.address || ''}
                                                onChange={this.handleChange}
                                                errorMessages={['this field is required']}
                                                validators={['required']}
                                                style={{width: '100%'}}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}  className='mt-3 mt-sm-5'>
                                            <Button type='submit' color='primary' className='btn btn-block waves-effect waves-light font-size-18'>
                                                {this.props.t('Add')} {this.props.t('Address')}
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

export default withNamespaces(
    null,
    {}
)(
    GoogleApiWrapper({
        apiKey: 'AIzaSyD8LVZs12SZOf5za-1Z5x3CqKrQ3oVCesY',
        LoadingContainer: LoadingContainer,
        v: '3'
    })(Addresses)
)
