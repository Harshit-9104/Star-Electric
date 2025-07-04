// import React, { useEffect, useState } from 'react'
// import './PlaceOrder.css'  
// import { useContext } from 'react'
// import { StoreContext } from '../../context/StoreContext'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const PlaceOrder = () => {

//   const { cart, getTotalPrice, productLists, url, token } = useContext(StoreContext);

//   const isCartEmpty = Object.keys(cart).length === 0;

//   const [data, setData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: '',
//     phone: ''
//   });

//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setData(data => ({
//       ...data,[name]: value
//     }));
//   };

//   const placeOrder = async (e) => {
//     e.preventDefault();
//     let orderItems = [];
//     productLists.map((item)=>{
//       if (cart[item._id]>0) {
//         let itemInfo = item;
//         itemInfo['quantity'] = cart[item._id];
//         orderItems.push(itemInfo);
//       }
//     })
//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalPrice(),
//     }
//     let response = await axios.post(url + '/api/order/place', orderData, {headers:{token}});
//     if(response.data.success) {
//       const {session_url} = response.data;
//       window.location.replace(session_url);
//     }
//     else{
//       alert("Something went wrong, please try again later.");
//     }
//     console.log("Stripe session response:", response.data);

//   }

//   const navigate = useNavigate();

//   useEffect(() => {
//     if(!token){
//       navigate('/cart')
//     }
//     else if(getTotalPrice() === 0){
//       navigate('/cart');
//     }
//   }, [token]);

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="po-left">
//         <h1>Shipping Address</h1>
//         <div className="multi-fields">
//           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text"  placeholder='First name'/>
//           <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
//         </div>
//         <div>
//           <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email' />
//           <input required name='address' onChange={onChangeHandler} value={data.address} type="text" placeholder='address'/>
//         </div>
//         <div className="multi-fields">
//           <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
//           <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
//         </div>
//         <div className="multi-fields">
//           <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code'/>
//           <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
//         </div>
//         <div><input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' /></div>
//       </div>
//       <div className="po-right">
//        {!isCartEmpty && (
//         <div className="cart-total">
//           <h2>Total Price: ₹{getTotalPrice().toLocaleString("en-IN")}</h2>
//           <button type='submit'>Proceed to Payment</button>
//         </div>
//       )}
//       </div>
//     </form>
//   )
// }

// export default PlaceOrder

import React, { useEffect, useState, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cart, getTotalPrice, productLists, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const isCartEmpty = Object.keys(cart).length === 0;

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // Combine all products from different categories
    const allProducts = [
      ...(productLists?.Pump || []),
      ...(productLists?.Cable || []),
      ...(productLists?.Panel || [])
    ];

    let orderItems = [];

    allProducts.forEach((item) => {
      if (cart[item._id] > 0) {
        orderItems.push({ ...item, quantity: cart[item._id] });
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalPrice(),
    };

    try {
      const response = await axios.post(url + '/api/order/place', orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert('Something went wrong, please try again later.');
      }

      console.log("Stripe session response:", response.data);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Payment failed: " + err.message);
    }
  };

  useEffect(() => {
    if (!token || getTotalPrice() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="po-left">
        <h1>Shipping Address</h1>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" />
          <input required name="address" onChange={onChangeHandler} value={data.address} type="text" placeholder="Address" />
        </div>
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipCode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
        </div>
      </div>

      <div className="po-right">
        {!isCartEmpty && (
          <div className="cart-total">
            <h2>Total Price: ₹{getTotalPrice().toLocaleString("en-IN")}</h2>
            <button type="submit">Proceed to Payment</button>
          </div>
        )}
      </div>
    </form>
  );
};

export default PlaceOrder;
