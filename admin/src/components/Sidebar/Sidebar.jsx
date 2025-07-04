import React from 'react'
import './Sidebar.css'
import add from '../../assets/add.png'
import order from '../../assets/order.png'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={add} alt="" />
                <p>Add products</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={order} alt="" />
                <p>List products</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={order} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar