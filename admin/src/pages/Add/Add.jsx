import React, { useState } from "react";
import "./Add.css";
import UploadArea from "../../assets/upload-area.jpg";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Pump",
    price: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    try {
      await axios.post(`${url}/api/product/add`, formData);
      // Always clear form after submit, regardless of response
      setData({
        name: "",
        description: "",
        category: "Pump",
        price: "",
      });
      setImage(null);
      // Reset file input value
      if (document.getElementById("image")) {
        document.getElementById("image").value = "";
      }
      toast.success("Product Added Successfully");
      // Optionally, handle response success/failure here
    } catch {
      // Optionally, handle error here
      setData({
        name: "",
        description: "",
        category: "Pump",
        price: "",
      });
      setImage(null);
      if (document.getElementById("image")) {
        document.getElementById("image").value = "";
      }
    }
  };

  return (
    <div>
      <div className="add">
        <form className="flex-col" onSubmit={onSubmitHandler}>
          <div className="img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):UploadArea} alt="" /> 
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
          </div>
          <div className="add-product-name flex-col">
            <label htmlFor="name">Product Name</label>
            <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Product Name" required />
          </div>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description}
              name="description"
              rows="6"
              placeholder="Product Description"
              required
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>category</p>
              <select onChange={onChangeHandler} name="category">
                <option value="Pump">Pump</option>
                <option value="Cable">Cable</option>
                <option value="Panel">Control Panel</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input onChange={onChangeHandler} value={data.price}
                type="number"
                name="price"
                placeholder="Product Price"
                required
              />
            </div>
          </div>
          <button type="submit" className="add-btn">ADD</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
