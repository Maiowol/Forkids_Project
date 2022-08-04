import React from 'react'
import styled from 'styled-components'
import character from '../images/character.png';

function MobilePage() {
    return (
        <Page>
            <div>
            <div className='image'>
                <img src={character} alt="사진" />
            </div>
            <div>
                <span className="top">원활한 서비스 사용을 위해</span>
            </div>
            <span className="bottom">PC에서 접속해주세요!</span>

            </div>
          

        </Page>
    )
}

const Page = styled.div`
background-color: #F4B03E;
max-width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;

img {
    widht: 100px;
    height: 100px;
    margin-left: 25%;
    margin-bottom: 25px;
}

span {
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
    font-size: 20px;
 }

.top {
  color: #FFFFFF;
  margin-bottom: 3px;
}

.bottom {
    color: #6B4E16;
    margin-left: 20px;
}
`;

export default MobilePage
