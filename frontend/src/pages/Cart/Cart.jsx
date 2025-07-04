// import React from "react";
// import "./Cart.css";
// import { useContext } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { cart, removeFromCart, getTotalPrice, url, pump_list } = useContext(StoreContext);

//   const navigate = useNavigate();

//   return (
//     <div className="cart">
//       <h1>Shopping Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="cart-items">
//           <div className="cart-title">
//             <p>Item</p>
//             <p>Title</p>
//             <p>price</p>
//             <p>Remove</p>
//           </div>
//           <br />
//           <hr />
//           {Object.entries(cart).map(([itemId, quantity]) => {
//   const item = pump_list.find(p => p._id === itemId);
//   if (!item) return null;

//   return (
//     <div key={itemId} className="cart-title cart-item">
//       <img src={url + '/images/' + item.image} alt={item.name} />
//       <h2>{item.name}</h2>
//       <p>Qty: {quantity}</p>
//       <p>Price: ₹{(item.price * quantity).toLocaleString()}</p>
//       <button onClick={() => removeFromCart(itemId)}>Remove</button>
//     </div>
//   );
// })}


//                     <hr />
//         </div>
//       )}
//       {cart.length > 0 && (
//         <div className="cart-total">
//           <h2>Total Price: ₹{getTotalPrice().toLocaleString("en-IN")}</h2>
//           <button onClick={()=>navigate('/placeorder')} >Proceed to Checkout</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// {cart.map((item) => (
//                         <div key={item.id} className="cart-title cart-item">
//                             <img src={url+'/images/'+item.image} alt={item.name} />
//                             <h2>{item.name}</h2>
//                             <p>Price: ₹{item.price.toLocaleString()}</p> {/* ✅ Format price correctly */}
//                             <button onClick={() => removeFromCart(item.id)}>Remove</button>
//                         </div>
//                     ))} 

import React from "react";
import "./Cart.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, getTotalPrice, url, productLists } = useContext(StoreContext);
  const navigate = useNavigate();

  const isCartEmpty = Object.keys(cart).length === 0;

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>

      {isCartEmpty ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          <div className="cart-title">
            <p>Item</p>
            <p>Title</p>
            <p>Qty</p>
            <p>Price</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />

          {Object.entries(cart).map(([itemId, quantity]) => {
            // const item = pump_list.find(p => p._id === itemId);
            // if (!item) return null;

            const allProducts = Object.values(productLists).flat();
            const item = allProducts.find(p => p._id === itemId);

            return (
              <div key={itemId} className="cart-title cart-item">
                <img src={url + '/images/' + item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{quantity}</p>
                <p>₹{(item.price * quantity).toLocaleString()}</p>
                <button onClick={() => removeFromCart(itemId)}>Remove</button>
              </div>
            );
          })}

          <hr />
        </div>
      )}

      {!isCartEmpty && (
        <div className="cart-total">
          <h2>Total Price: ₹{getTotalPrice().toLocaleString("en-IN")}</h2>
          <button onClick={() => navigate("/placeorder")}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;


