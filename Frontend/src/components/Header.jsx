import React, { useState } from "react";
import '../css/Header.css';
import { IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg'
function Header({onSearch}){
    const [theme,settheme]= useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const changeTheme=()=>{
        const root =document.getElementById('root');
        settheme(!theme);
        if(theme){
            root.style.backgroundColor='black';
            root.style.color='#fff';
        }else{
            root.style.backgroundColor='#fff';
            root.style.color='black';
        }
    };
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };
  
    return(
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className='flex-row'>
        <Link to="/" className="logo-link">
          <img className='logo' src={logo} alt='' />
          <p className="logo-text">My Fridge Food</p>
        </Link>
        </div>
  
        <div className='flex-row'>
          <Link to="/recommended" className="nav-link">Recommended</Link>
          <Link to="/manage" className="nav-link">Manage Recipes</Link>

          <input className='search-input' type='text' placeholder='Search' value={searchQuery} onChange={handleInputChange} />
          <div>
            {theme ? <FaSearch className="icon" onClick={changeTheme} /> : <IoMenu className="icon" onClick={changeTheme} />}
          </div>
        </div>
      </div>             
    )
        
}
export default Header