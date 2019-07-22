import React from 'react';
import { Consumer } from './Context';
import Person from './Person'

const PersonList = () => {
    return (
        <Consumer>
            { ({ people }) => (
                <React.Fragment>
                    <div className="persons">
                        {people.map( person => 
                            <Person 
                                person={person}
                                key={person.id.toString()}
                            />
                        )}
                    </div>
                </React.Fragment>
            )}
        </Consumer>
        
    );
}

export default PersonList;