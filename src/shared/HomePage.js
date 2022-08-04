import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect';
import Main from '../pages/Main'
import MobilePage from '../pages/MobilePage';
const HomePage = () => {
  return (
    <>
    <BrowserView>
    <Main/>
    </BrowserView>

    
    <MobileView>
    <MobilePage/>
    </MobileView>
    </>
  )
}

export default HomePage