import React from 'react'
import './Navbar.css'
import logo from '../../assets/star.jpg';
import profile from '../../assets/profile.jpg';

const Navbar = () => {
  return (
    <div className="navbar">
        <img className='logo' src={logo} alt="" />
        <img className='profile' src={profile} alt="" />
    </div>
  )
}

export default Navbar