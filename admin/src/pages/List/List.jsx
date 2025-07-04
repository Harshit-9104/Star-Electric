import React, { useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`);
    // console.log(response.data);
    if(response.data && Array.isArray(response.data)) {
      setList(response.data);
    }
    else {
      toast.error("Failed to fetch product list. Please try again.");
  }
}
//   const fetchList = async () => {
//   const response = await axios.get(`${url}/api/product/list`);
//   console.log(response.data); // shows array directly
//   setList(response.data);
// }

  const removeProduct = async (productId) => {
    const response = await axios.post(`${url}/api/product/remove`, { id: productId });
    await fetchList(); // Refresh the list after deletion
    if(response.data && response.data.message) {
      toast.success(response.data.message);
    } else {
      toast.error("Failed to delete product. Please try again.");
    }
  }


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Product List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) =>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹ {item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div> 
    </div>
  )
}

export default List