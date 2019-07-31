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
      <Link to="/snacks" className="button">Snack Index</Link>
        <Link to="/new_snack" className="button">New Snack</Link>
        {
          localStorage.getItem("user") ?
            <a onClick={() => {
              props.handleLogout()
              props.history.push('/login')
            }}>
            <div className="button">Log out</div>
          </a>
          :
          <Link to="/login" className="button">Sign In</Link>
        }
      </div>
    </div>
  );
};
export default withRouter(Navbar);
