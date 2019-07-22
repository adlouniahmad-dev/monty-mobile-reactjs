import React, { PureComponent } from 'react';
import { Consumer } from './Context';

class Person extends PureComponent {

    render() {

        const { person } = this.props;

        return (
            <Consumer>
                {({ actions }) => (
                    <div className="person">
                        <div className="property">
                            <label className="property-title">Name</label>
                            <span className="propert-value">{person.name}</span>
                        </div>
                        <div className="property">
                            <label className="property-title">Mobile</label>
                            <span className="propert-value">{person.mobile}</span>
                        </div>
                        <div className="property">
                            <label className="property-title">Country</label>
                            <span className="propert-value">{person.country.name}</span>
                        </div>
                        <div className="property">
                            <label className="property-title">City</label>
                            <span className="propert-value">{person.city.name}</span>
                        </div>
                        <div className="property full-width">
                            <label className="property-title">Address</label>
                            <span className="propert-value">{person.address}</span>
                        </div>
                        <div className="property full-width">
                            <label className="property-title">Notes</label>
                            <span className="propert-value">{person.notes}</span>
                        </div>
                        <div className="property full-width">
                            <button type="button" className="edit-button" onClick={() => actions.editPerson(person)}>Edit</button>
                            <button type="button" className="delete-button" onClick={() => actions.deletePerson(person)}>Delete</button>
                        </div>
                    </div>
                )}
            </Consumer>
        );
    }
}

export default Person;