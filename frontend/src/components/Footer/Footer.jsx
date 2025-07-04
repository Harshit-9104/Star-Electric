import React from 'react'
import './footer.css'
import starImage from '../../assets/star-image.png';
import facebook from '../../assets/facebook.png';
import Whatsapp from '../../assets/whatsapp.png';
import instagram from '../../assets/instagram.png';
import Twitter from '../../assets/twitter.png';
import youtube from '../../assets/youtube.png';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-left">
                <img src={starImage} className='logo' alt='logo' />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque rem atque id tempora minus. Sunt, molestiae modi. Quia nostrum consequatur natus nemo mollitia?</p>
                <div className="footer-icons">
                    <img src={facebook} alt="" />
                    <img src={Whatsapp} alt="" />
                    <img src={instagram} alt="" />
                    <img src={Twitter} alt="" />
                    <img src={youtube} alt="" />
                </div>
            </div>
            <div className="footer-center">
                <ul>
                <h2>COMPANY</h2>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 12312 12312</li>
                    <li>starelectric@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <div className="footer-copyright">
        <p>© 2025 StarElectric. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer