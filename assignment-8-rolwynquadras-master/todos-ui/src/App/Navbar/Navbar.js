import React, { Component } from 'react';
import './Navbar.scss';

export class Navbar extends Component {
    
    constructor(props) {
        super(props);
    }

    /**
     * Show todo add view box
     */
    showView() {
        // todo id is null and show add view to implement add todo logic
	    this.props.handleViewEvent(null, true)
    }

    render () {
        return (
            <header className="main_header">
               {/* <!-- Main navigation bar for the web page --> */}
               <nav className="navbar_container">
                    <div className="brand_logo">
                        <img alt="todo-logo" src="assets/images/todoIcon.png"></img>
                        <span>Todo App</span>
                    </div>
                    <div className="btn-wrapper">
                        <button id="add-todo-btn" type="button" onClick={this.showView.bind(this)}>Add</button>
                    </div>
               </nav>
           </header>
        )
    }
}