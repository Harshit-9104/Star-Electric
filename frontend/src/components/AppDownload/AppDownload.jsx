import React from 'react'
import './appDownload.css'
import downloadLogos from '../../assets/download-logos.png'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>Foe Better Experience Download <br />StarElectric App</p>
        <div className="platforms">
            <img src={downloadLogos} alt="" />
        </div>
    </div>
  )
}

export default AppDownload