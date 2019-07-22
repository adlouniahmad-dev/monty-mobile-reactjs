import React, { Component } from 'react';
import { Consumer } from './Context';

class Header extends Component {

    searchInput = React.createRef();

    render() {
        return (
            <Consumer>
                { ({ actions }) => {
                    const handleSubmit = (e) => {
                        e.preventDefault();
                        actions.searchPerson(this.searchInput.current.value);
                        e.currentTarget.reset();
                    }
                
                    return (
                        <header className="header">
                            <form onSubmit={handleSubmit}>
                                <input type="text" ref={this.searchInput} placeholder="Search by Name" />
                                <input type="submit" value="Search" />
                            </form>
                            <button type="button" onClick={actions.modal.modalOpen}>Add a New Person</button>
                        </header>
                    );
                }}
            </Consumer>
        );
    }
}

export default Header;