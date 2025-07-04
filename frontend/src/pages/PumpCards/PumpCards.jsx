// import React from 'react'
// import { useContext } from 'react'
// import './pumpCards.css'
// import { StoreContext } from '../../context/StoreContext.jsx'
// // import { pump_list } from '../../assets/assest.js'

// const PumpCards = () => {

//   const { addToCart,pump_list, url, cart} = useContext(StoreContext)

//   return (
//     <div className="pump-cards-container">
//             <h2 className="pump-cards-heading">Available Pumps</h2>
//             <div className="pump-cards-grid">
//                 {pump_list.map((pump,index) => (
//                     <div key={index} id={pump._id} className="pump-card">
//                         <img src={url+'/images/'+pump.image} alt={pump.name} className="pump-card-image" />
//     <div className="pump-card-content">
//         <h3 className="pump-card-title">{pump.name}</h3>
//         <p className="pump-card-price">{pump.price}</p>
//         <p className="pump-card-description">{pump.description}</p>
//         { !cart[pump._id]
//            ? <button onClick={() => addToCart(pump._id)}>Add to Cart</button>
//               : <button disabled>Added to Cart</button>
//         }
//     </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//   )
// }

// export default PumpCards

import React from 'react'
import { useContext } from 'react'
import './pumpCards.css'
import { StoreContext } from '../../context/StoreContext.jsx'
// import { pump_list } from '../../assets/assest.js'

const PumpCards = () => {

  const { addToCart,productLists, url, cart} = useContext(StoreContext)
  const pumpList = productLists.Pump;

  return (
    <div className="pump-cards-container">
            <h2 className="pump-cards-heading">Available Pumps</h2>
            <div className="pump-cards-grid">
                {pumpList.map((item,index) => (
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

export default PumpCards