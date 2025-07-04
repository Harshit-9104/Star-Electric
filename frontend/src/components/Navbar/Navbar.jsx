import React, { useState } from 'react'
import './Navbar.css'
import starImage from '../../assets/star-image.png';
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import profile from '../../assets/profile.jpg';
import orders from '../../assets/order.png';
import logout from '../../assets/logout.jpg';


const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("Home");  

    const { getTotalPrice, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();

    const logoutHandler = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }

  return (
    <div className='navbar'>
        <img src={starImage} className='logo' alt='logo' />
        <ul className="navbar-menu">
            <Link to='/'><li onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</li></Link>
            <li onClick={()=>setMenu("About")} className={menu==="About"?"active":""}>About</li>
            <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</li>
        </ul>
        <div className="navbar-right">
            <FaSearch className="search-icon" />
            <div className="cart-icon">
            <Link to='/cart'><FaShoppingCart /></Link>
            <div className={getTotalPrice()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>:
            <div className='navbar-profile'>
              <img src={profile} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={orders} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logoutHandler}><img src={logout} alt="" /><p>LogOut</p></li>
              </ul>
            </div>
            
            }
            

        </div>
    </div>
  )
}

export default Navbar