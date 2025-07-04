import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './wireCards.css'


const WireCards = () => {

    const { productLists, addToCart, url, cart } = useContext(StoreContext);
    const wireList = productLists.Cable;

  return (
    <div className="pump-cards-container">
            <h2 className="pump-cards-heading">Available Pumps</h2>
            <div className="pump-cards-grid">
                {wireList.map((item,index) => (
                    <div key={index} id={item._id} className="pump-card">
                        <img src={url+'/images/'+item.image} alt={item.name} className="pump-card-image" />
    <div className="pump-card-content">
        <h3 className="pump-card-title">{item.name}</h3>
        <p className="pump-card-price">{item.price}</p>
        <p className="pump-card-description">{item.description}</p>
        { !cart[item._id]
           ? <button onClick={() => addToCart(item._id)}>Add to Cart</button>
              : <button disabled>Added to Cart</button>
        }
    </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default WireCards