import React, { Component } from 'react';
import { Consumer } from './Context';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import ApiService from '../api/ApiService';
import * as apiRoutes from '../api/ApiRoutes';

class AddEditPerson extends Component {

    initialState = {
        validated: false,
        name: '',
        mobile: '',
        country: '',
        city: '',
        address: '',
        notes: '',
        countries: [],
        cities: [],
    }

    state = this.initialState;
    title = 'Add';
    personToUpdate = null;

    getCountries = () => {
        return new Promise(resolve => {
            ApiService.get(apiRoutes.countries, response => {
                if (response.success) {
                    this.setState( prevState => prevState.countries = response.data );
                } else {
                    console.log('Error loading countries', response.error)
                }
                resolve();
            })
        });
    }

    getCities = countryId => {
        if (countryId !== '' && countryId !== null) {
            this.getCountryFromArray(countryId).then( country => {
                ApiService.post(apiRoutes.cities, country, response => response.success ? this.setState( prevState => prevState.cities = response.data ) : console.log('Error loading cities', response.error));
            });
        } else {
            this.setState( prevState => prevState.cities = []);
        }
    }

    getCountryFromArray = countryId => {
        return new Promise(resolve => {
            for (let i = 0; i < this.state.countries.length; i++) {
                if (this.state.countries[i].id.toString() === countryId.toString()) {
                    resolve(this.state.countries[i]);
                }
            }
        })
    }

    getCountryArray = countryId => {
        for (let i = 0; i < this.state.countries.length; i++) {
            if (this.state.countries[i].id.toString() === countryId.toString()) {
                return this.state.countries[i];
            }
        }
    }

    getCityArray = cityId => {
        for (let i = 0; i < this.state.cities.length; i++) {
            if (this.state.cities[i].id.toString() === cityId.toString()) {
                return this.state.cities[i];
            }
        }
    }

    componentDidMount() {
        this.getCountries().then( () => {
            if (this.personToUpdate !== null) {
                const countryId = this.personToUpdate.country.id;
                this.getCities(countryId);
                this.setState( prevState => {
                    return {
                        name: this.personToUpdate.name,
                        mobile: this.personToUpdate.mobile,
                        country: this.personToUpdate.country.id,
                        city: this.personToUpdate.city.id,
                        address: this.personToUpdate.address,
                        notes: this.personToUpdate.notes,
                    }
                })
            }
        });
    }

    onChangeValue = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getPersonObject = () => {
        const person = {
            name: this.state.name,
            mobile: this.state.mobile,
            country: this.getCountryArray(this.state.country),
            city: this.getCityArray(this.state.city),
            address: this.state.address,
            notes: this.state.notes
        }

        if (this.personToUpdate !== null) {
            person.id = this.personToUpdate.id;
        }

        return person;
    }

    render() {
        return (
            <Consumer>
                {({ actions, person }) => {

                    this.title = person !== null ? 'Edit' : 'Add';
                    if (person !== null) {
                        this.personToUpdate = person;
                    }

                    const handleSubmit = e => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        if (!form.checkValidity()) { 
                            e.stopPropagation();
                        } else {
                            if (this.personToUpdate !== null) {
                                actions.updatePerson(this.getPersonObject());
                            } else {
                                actions.addPerson(this.getPersonObject());
                            }
                        }

                        this.setState({validated: true});  
                    }

                    return (
                        <Modal
                            onExit={() => this.setState( prevState => prevState = this.initialState)}
                            {...this.props}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {this.title} Person
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form noValidate validated={this.state.validated} onSubmit={handleSubmit}>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="name">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control name="name" type="text" value={this.state.name} onChange={this.onChangeValue} placeholder="Name" required />
                                                </Form.Group>
                                                <Form.Group controlId="mobile">
                                                    <Form.Label>Mobile Number</Form.Label>
                                                    <Form.Control name="mobile" type="number" value={this.state.mobile} onChange={this.onChangeValue} placeholder="Mobile Number" required />
                                                </Form.Group>
                                                <Form.Group controlId="country">
                                                    <Form.Label>Country</Form.Label>
                                                    <Form.Control as="select" name="country" value={this.state.country} placeholder="Select Country" onChange={(e) => {this.onChangeValue(e); this.getCities(e.target.value)}} required>
                                                    <option key="-1" value="">Select Country</option>
                                                        {this.state.countries.map( country => 
                                                            <option key={country.id} value={country.id}>{country.name}</option>    
                                                        )}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="city">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control as="select" name="city" placeholder="Select City" value={this.state.city} onChange={this.onChangeValue} required>
                                                        <option key="-1" value="">Select City</option>
                                                        {this.state.cities.map( city => 
                                                            <option key={city.id} value={city.id}>{city.name}</option>    
                                                        )}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="address">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control type="text" name="address" value={this.state.address} placeholder="Address" onChange={this.onChangeValue} required />
                                                </Form.Group>
                                                <Form.Group controlId="notes">
                                                    <Form.Label>Notes</Form.Label>
                                                    <Form.Control as="textarea" value={this.state.notes} name="notes" onChange={this.onChangeValue} required />
                                                </Form.Group>
                                                <Button type="submit">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={actions.modal.modalHide}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    );

                }}

            </Consumer>
        );
    }

}

export default AddEditPerson;

