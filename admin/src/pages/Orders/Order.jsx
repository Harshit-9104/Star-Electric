import React from "react";
import "./Order.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import parcel from "../../assets/parcel.png"


const Order = ({ url }) => {
  const [orders, setorders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setorders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (e, orderId) =>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:e.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={parcel} alt="" />
            <div>
              <p className="order-item-product">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  }
                  else{
                    return item.name + ' X ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipCode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Rs. {order.amount}</p>
            <select onChange={(e)=>statusHandler(e, order._id)} value={order.status}>
              <option value="product processing">product processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
