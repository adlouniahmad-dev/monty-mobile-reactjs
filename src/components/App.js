import React from 'react';
import Header from './Header';
import PersonList from './PersonList';
import AddEditPerson from './AddEditPerson';
import '../App.css';
import { Consumer } from './Context';

const App = () => {
    return (
      <Consumer>
        {( { modalShow, actions } ) => (
            <main className="main-app">
            <Header />
            <PersonList />
            {modalShow ? <AddEditPerson show={modalShow} onHide={actions.modal.modalHide} /> : null}
        </main>
        )}
      </Consumer>
    );
}

export default App;
