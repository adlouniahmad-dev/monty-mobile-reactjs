import React, { Component } from 'react';
import ApiService from '../../api/ApiService';
import * as apiRoutes from '../../api/ApiRoutes'; 

const AppContext = React.createContext();

export class Provider extends Component {

    state = {
        people: [],
        modalShow: false,
        personToUpdate: null,
    }

    componentDidMount() {
        ApiService.get(apiRoutes.persons, (response) => (
            this.setState( prevState => response.success ? prevState.people = response.data : console.log(response.error))
        ));
    }

    handleSearchPerson = (playerName) => {
        ApiService.get(apiRoutes.searchPersons + playerName, response => {
            if (response.success) {
                this.setState( prevState => ( prevState.people = response.data ));
            } else {
                console.log(response.error);
            }
        })
    }

    handleDeletePerson = person => {
        ApiService.delete(apiRoutes.persons + `/${person.id}`, response => {
            if (response.success) {
                this.setState( prevState => {
                    return {
                        people: prevState.people.filter( p => p.id !== person.id)
                    };
                })
            } else {
                console.log('Error deleting person', response.error);
            }
        })
    }

    handleAddPerson = person => {
        ApiService.post(apiRoutes.persons, person, response => {
            if (response.success) {
                this.setState( prevState => {
                    return {
                        people: [
                            ...prevState.people,
                            response.data
                        ],
                        modalShow: false,
                    }
                })
            } else {
                console.log('Error in posting', response.error);
            }
        })
    }

    handleUpdatePerson = person => {
        ApiService.put(apiRoutes.persons + `/${person.id}`, person, response => {
            if (response.success) {
                const personIndex = this.getPersonIndex(person.id);
                if (personIndex > -1) {
                    this.setState( prevState => {
                        prevState.people[personIndex] = response.data;
                    });
                    this.modalHide();
                }
            } else {
                console.log('Error updating person', response.error);
            }
        })
    }

    changePersonToUpdateState = person => {
        this.setState( prevState => prevState.personToUpdate = person);
        this.modalOpen();
    }

    getPersonIndex = personId => {
        for (let i = 0; i < this.state.people.length; i++) {
            if (this.state.people[i].id === personId) {
                return i;
            }
        }
        return -1;
    }

    modalHide = () => {
        this.setState( prevState => {
            return {
                modalShow: false,
                personToUpdate: null,
            }
        })
    }

    modalOpen = () => this.setState( prevState => ( prevState.modalShow = true ) );

    render() {
        return (
            <AppContext.Provider value={{
                people: this.state.people,
                person: this.state.personToUpdate,
                modalShow: this.state.modalShow,
                actions: {
                    searchPerson: this.handleSearchPerson,
                    addPerson: this.handleAddPerson,
                    deletePerson: this.handleDeletePerson,
                    updatePerson: this.handleUpdatePerson,
                    editPerson: this.changePersonToUpdateState,
                    modal: {
                        modalHide: this.modalHide,
                        modalOpen: this.modalOpen,
                    }
                }
            }}>
                { this.props.children }
            </AppContext.Provider>
        );
    };
}

export const Consumer = AppContext.Consumer;