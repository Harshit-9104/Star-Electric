import React from 'react'
import Navbar from './components/navbar/navbar'
import { Routes, Route } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import PumpCards from './pages/PumpCards/PumpCards'
import WireCards from './pages/WireCards/WireCards'
import PanelCards from './pages/Panelcards/PanelCards'
import PipeCards from './pages/Pipecards/PipeCards'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'


const App = () => {

  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <>  
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/pumpcards' element={<PumpCards />} />
        <Route path='/wirecards' element={<WireCards />} />
        <Route path='/panelcards' element={<PanelCards />} />
        <Route path='/pipecards' element={<PipeCards />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
    </div>
      <Footer/>
      </>
  )
}

export default App