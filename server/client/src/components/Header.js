import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default: 
                return [
                    <li key="1"><Payments /></li>,
                    <li key="2" style={{ margin: '0 10px' }} className="waves-light red">
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="3"><a className="waves-effect waves-light btn red" href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper red">
                    <Link to={this.props.auth ? '/surveys' : '/'} 
                          className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);