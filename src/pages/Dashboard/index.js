import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Container, Row, FormGroup, Col, Button, Card, CardBody} from "reactstrap";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { withNamespaces } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';

import {GoogleApiWrapper} from 'google-maps-react';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import Geocode from "react-geocode";
import './dashboard.scss'

import aim from '../../assets/customer/aim.svg';
import evory_off from '../../assets/customer/ivory-off-white-paper-texture.png';
import iphone_mockup from '../../assets/customer/iPhone_MockUp.png';
import apple_app from "../../assets/customer/apple_app.png";
import google_app from "../../assets/customer/google_app.png";
import track from '../../assets/customer/track.svg';
import gift from '../../assets/customer/gift-box.svg';
import send from '../../assets/customer/send.svg';
import flowerBack from '../../assets/customer/yaward-bg-3.png';
import iPad from '../../assets/customer/FrontandBack.png';
import welcome from '../../assets/customer/290bb5f5ab6bc88c55c167c7dd47f281.png'

const borderImage = {
    'border': '1px solid #A7A6A3',
    'borderRadius': '0 0 8px 8px',
    'padding': '36px',
    'height': '150px'
};

const sectionImage = {
    background: '#e6e6e6',
    backgroundImage: `url(${evory_off})`,

};
const yawardBack = {
    backgroundColor: ' #8A1652',
    backgroundImage: `url(${flowerBack})`
};
Geocode.setApiKey('AIzaSyD8LVZs12SZOf5za-1Z5x3CqKrQ3oVCesY');
const LoadingContainer = props => <div>Loading...</div>;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            currentLatLng: {
                lat: 0,
                lng: 0
            },
            phone: '',
            address: '',
            myAddressName: '',
            loading: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.currentLatLng !== this.state.currentLatLng) {
            this.recenterMap();
        }
    }

    componentDidMount() {
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
                        phone: places[i]['formatted_phone_number'],
                        address: places[i]['formatted_address']
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

    findMyLocation = () => {
        Geocode.fromLatLng(this.state.currentLatLng.lat, this.state.currentLatLng.lng).then(
            response => {
                const address = response.results[0].formatted_address;
                localStorage.setItem('myAddressName', address);
                this.setState({
                    address: address
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    handleChange = (event) => {
        const shop = this.state;
        shop.address = event.target.value;
        this.setState({shop})
    };

    handleSubmit() {
        localStorage.setItem('myLocation', this.state.currentLatLng.lat.toString() + "," + this.state.currentLatLng.lng.toString());
        Geocode.fromLatLng(this.state.currentLatLng.lat.toString(),  this.state.currentLatLng.lng.toString()).then(
            response => {
                const address = response.results[0].formatted_address;
                localStorage.setItem('myAddressName', address);
            },
            error => {
                console.error(error);
            }
        );
        this.props.history.push({
            pathname: '/shop',
            data: this.state.currentLatLng.lat.toString() + "," + this.state.currentLatLng.lng.toString()
        });
    }

    render() {
        const {address} = this.state;
        return (
            <React.Fragment>
                <div style={{'marginTop': '70px', 'paddingTop': '79px'}}>
                    <Container fluid>

                        <Row>
                            <Col xl="2">
                            </Col>
                            <Col xl="8">
                                <div className='text-center'>
                                    <h1 className='text-primary'>{this.props.t('Delivered')} {this.props.t('or')} {this.props.t('pick up')} {this.props.t('your')} {this.props.t('flowers')} ... {this.props.t('Order')} {this.props.t('now')}!</h1>
                                    <h1 className='text-primary'>{this.props.t('Select')} {this.props.t('your')} {this.props.t('location')} {this.props.t('to')} {this.props.t('browsing')} {this.props.t('the')} {this.props.t('best')} {this.props.t('florist')} {this.props.t('in')} {this.props.t('your')} {this.props.t('area')}</h1>
                                    <Card className="mt-5 cardBorder">
                                        <CardBody className='mt-4 mb-1'>
                                            <ValidatorForm className="needs-validation" onSubmit={this.handleSubmit}>
                                                <Row className='ml-4 mr-4'>
                                                    <Col md='7'>
                                                        <Row>
                                                            <Col md="12">
                                                                <FormGroup>
                                                                    <StandaloneSearchBox
                                                                        ref={this.state.onSearchBoxMounted}
                                                                        bounds={this.state.bounds}
                                                                        onPlacesChanged={this.state.onPlacesChanged}
                                                                    >
                                                                        <TextValidator
                                                                            name="address"
                                                                            label = {this.props.t("Select City and District")}
                                                                            value={address || ''}
                                                                            onChange={this.handleChange}
                                                                            errormessage={['Please provide a valid Dist.']}
                                                                            validators = {['required']}
                                                                            style={{width: '100%'}}
                                                                        />
                                                                    </StandaloneSearchBox>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md="5">
                                                        <Row className='text-center'>
                                                            <Col md='3'>
                                                                <Tooltip title="Locate your location">
                                                                    <img className='mt-2 mb-3 cursor'
                                                                         src={aim} alt={aim}
                                                                         width='30' height='30'
                                                                         onClick={() => this.findMyLocation()} />
                                                                </Tooltip>
                                                            </Col>
                                                            <Col md='9'>
                                                                <Button color='primary' className='h4 btn btn-block waves-effect waves-light mainBorder' type="submit">{this.props.t('Search')}</Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <div>
                                                    <div hidden ref='map' style={{minHeight: '500px', height: '100%'}} />
                                                </div>
                                            </ValidatorForm>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Col>
                            <Col xl='2'>

                            </Col>
                        </Row>

                        <div className='mt-5'/>
                        <br/>

                        <Row className='mt-5' style={sectionImage}>
                            <Col xl="2" />
                            <Col xl="8">
                                <Row style={{'alignItems': 'center'}}>
                                    <Col xl='3' md='4' className='text-center'>
                                        <img src={iphone_mockup} alt={iphone_mockup} style={{'marginTop': '-60px', 'maxWidth': '309px'}} />
                                    </Col>
                                    <Col xl='1' md='1' />
                                    <Col xl='8' md='7'  className='mt-5'>
                                        <Row>
                                            <Col md='8'>
                                                <h1 className='text-primary'>
                                                    {this.props.t('Download')} {this.props.t('Our')} {this.props.t('Mobile')} {this.props.t('App')}
                                                </h1>
                                                <h5 className='text-secondary font-size-22' style={{'lineHeight': '30px'}}>
                                                    {this.props.t('Lorem Ipsum is simply summy text of the printing and typesetting industry')}.
                                                    {this.props.t('Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s')}.
                                                </h5>
                                            </Col>
                                            <Col md='4' className='text-center text-md-center'>
                                                <div className='mb-3'>
                                                    <a target='_blank' href="https://www.apple.com/">
                                                        <img src={apple_app} alt={apple_app} height={40} />
                                                    </a>
                                                </div>
                                                <div className='mt-3'>
                                                    <a target='_blank' href="https://play.google.com/">
                                                        <img src={google_app} alt={google_app} height={40} />
                                                    </a>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl="2" />
                        </Row>

                        <Row className='text-center' style={{'background': 'white', 'paddingBottom': '60px'}}>
                            <Col xl="2"/>
                            <Col xl="8" className='mt-5 mb-5'>
                                <div className='text-center'>
                                    <h1 className='text-dark'>{this.props.t('How')} {this.props.t('it')} {this.props.t('Works')}</h1>
                                </div>
                                <Row className='mt-5'>
                                    <Col md='4'>
                                        <div>
                                            <img src={track} alt={track} style={borderImage}/>
                                        </div>
                                        <div className='mt-4 mb-4'>
                                            <h2 className='text-dark'>{this.props.t('Select')} {this.props.t('Destination')}</h2>
                                            <h6 className='font-size-20 text-secondary mr-5 ml-5' style={{'lineHeight': '20px'}}>
                                                {this.props.t('Lorem Ipsum is simply summy text of the printing and typesetting industry')}
                                            </h6>
                                        </div>
                                    </Col>
                                    <Col md='4'>
                                        <div>
                                            <img src={gift} alt={gift} style={borderImage}/>
                                        </div>
                                        <div className='mt-4 mb-4'>
                                            <h2 className='text-dark'>{this.props.t('Choose')} {this.props.t('Your')} {this.props.t('Gift')}</h2>
                                            <p className='font-size-20 text-secondary mr-5 ml-5' style={{'lineHeight': '20px'}}>
                                                {this.props.t('Lorem Ipsum is simply summy text of the printing and typesetting industry')}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md='4'>
                                        <div>
                                            <img src={send} alt={send} style={borderImage}/>
                                        </div>
                                        <div className='mt-4 mb-4'>
                                            <h2 className='text-dark'>{this.props.t('Pay')} {this.props.t('and')} {this.props.t('Send')}</h2>
                                            <p className='font-size-20 text-secondary mr-5 ml-5' style={{'lineHeight': '20px'}}>
                                                {this.props.t('Lorem Ipsum is simply summy text of the printing and typesetting industry')}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl='2'/>
                        </Row>

                        <Row style={yawardBack}>
                            <Col xs='12' xl='8'>
                                <div className='ml-md-5'>
                                    <h1 className='mt-5 mb-5'>{this.props.t('Why')} {this.props.t('Use')} {this.props.t('YaWard')}?</h1>
                                    <p className='font-size-22 text-white' style={{'lineHeight': '31.6px'}}>
                                        {this.props.t('Lorem Ipsum is simply summy text of the printing and typesetting industry')}.
                                        {this.props.t('Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s')},
                                        {this.props.t('when as unknown printer took a gallery of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electric typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum')}.
                                    </p>
                                    <div className='mt-5'>
                                        <Button color='none'
                                                style={{
                                                    'border': '1px solid #fff',
                                                    'borderRadius': '0 0 8px 8px',
                                                    'width': '320px',
                                                    'height': '50px',
                                                    'color': 'white'}}
                                                className='font-size-20'
                                        >{this.props.t('Read More')}</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col xl='4' >
                                <div className='mr-5 text-xl-right text-md-center text-sm-center'>
                                    <img src={iPad} alt={iPad} height='450px' />
                                </div>
                            </Col>
                        </Row>
                        <Row className='text-center' style={{'background': 'white', 'paddingBottom': '60px', 'paddingTop': '100px'}}>
                            <Col xl={4}>
                                <div className='ml-xl-5 ml-md-5 text-xl-left text-md-center text-sm-center'>
                                    <img src={welcome} alt={welcome} width='450px' height='450px' style={{width: '100%', maxWidth: 'fit-content'}} />
                                </div>
                            </Col>
                            <Col xl={8}>
                                <div className='text-dark text-left mr-xl-5'>
                                    <h1 className='text-primary mb-3 '><b>{this.props.t('Are you Flower Shop Owner')}?</b></h1>
                                    <br/>
                                    <p className='font-size-22 text-dark mt-3' style={{'lineHeight': '31.6px'}}>
                                        {this.props.t('Lorem Ipsum is simply summy text of the printing and typesetting industry')}.
                                        {this.props.t('Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s')},
                                        {this.props.t('when as unknown printer took a gallery of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electric typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum')}.
                                    </p>
                                    <div className='mt-5'>
                                        <Button color='none'
                                                style={{
                                                'borderRadius': '0 0 8px 8px',
                                                'width': '340px',
                                                'backgroundColor': '#BA1F6A',
                                                'height': '50px',
                                                'color': 'white'
                                            }}
                                            className='font-size-20'
                                        >{this.props.t('Add Your Shop')}</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        );
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
    })(Dashboard)
)
