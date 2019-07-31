import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../logo-complete.svg'

const Navbar = props => {
  return (
    <div className='nav-bar'>
        <div className='navLogo'>
            <Link to="/" className="item">
                <div className='navLogo'><img src={logo} alt='Sweet and Salty Snacks' /></div>
            </Link>
        </div>
      <div>
      <Link to="/snacks" className="item">
            <div className="button">Snack Index</div>
        </Link>
        <Link to="/new_snacks" className="item">
            <div className="button">New Snack</div>
        </Link>
        {
          props.user ? 
            <a className="item" onClick={() => {
              props.handleLogout()
              props.history.push('/login')
            }}>
            <div className="button">Log out</div>
          </a>
          :
          <Link to="/login" className="item">
            <div className="button">Sign In</div>
          </Link>
        }
      </div>
    </div>
  );
};
export default withRouter(Navbar);
