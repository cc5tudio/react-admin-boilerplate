import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
            <Navbar className="navbar-dark navbar-expand-md bg-dark" inverse collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        React-Bootstrap
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>
                    <NavItem eventKey="1" href="/login">
                       Logout
                    </NavItem>

                </Nav>
            </Navbar>
            <div className="container-fluid">
                       {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>


            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 