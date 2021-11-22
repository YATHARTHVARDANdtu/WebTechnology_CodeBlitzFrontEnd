import './Header.css';
import React from 'react';
import logo from './logo.png'
import { Link } from 'react-router-dom';
import { useStateValue } from '../stateProvider';

function Header() {

    const [{user}, dispatch] = useStateValue();

    

    return (
        <div className="header">
           <div className="header__navLeft">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}><p className="header__navLeftOption"  id="one">
                    About    
                </p>
                </Link>
                <Link to="/problems" style={{ color: 'inherit', textDecoration: 'inherit'}}><p  className="header__navLeftOption" id="two">
                    Problems    
                </p>  
                </Link>
                
                <Link to="/leaderboard" style={{ color: 'inherit', textDecoration: 'inherit'}}><p className="header__navLeftOption" id="three">
                    LeaderBoard
                </p>
                </Link>
            </div> 
            <div className="header__navRight">     
                <Link to = {user?'/user':'/login'} style={{ color: 'inherit', textDecoration: 'inherit'}}>           
                <p className="header__navRightOption"> {user===null?'Login':user.name} </p>
                </Link>
            </div>
        </div>
    );
}



export default Header

