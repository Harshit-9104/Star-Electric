import React from 'react'
import './ExploreProduct.css'
import {products_list} from '../../assets/assest.js'
import { Link } from 'react-router-dom'

const ExploreProduct = ({category, setCategory}) => {  

    const categoryRoutes = {
        "Submersible Pump": "/pumpcards",
        "Wire Cables": "/wirecards",
        "Control Panel": "/panelcards",
        "PVC Pipes": "/pipecards",
      };

    return (
        <div className='explore-product' id='explore-product'>
            <div className='container'>
                <h2 className='explore-product-heading'>Explore Our Products</h2>
                <div className='explore-product-content'>
                    {products_list.map((product, index) => {
                        return (
                            <div onClick={()=>setCategory(prev=>prev===product.product_name?"All":product.product_name)} key={index} className='explore-product-card'>
                                <Link to={categoryRoutes[product.product_name] || "/"}><img src={product.product_image} alt={product.product_name} className={category===product.product_name?"active":""} /></Link>
                                <h3 className='explore-product-name'>{product.product_name}</h3>
                            </div>
                        )
                    })}
                </div>
                <hr />
            </div>

        </div>
    )
}

export default ExploreProduct