import React from 'react'
import styled from 'styled-components';

//  elements & components
import Grid from '../../components/elements/Grid';
import Header from '../../components/main/Header';
import Footer from '../../components/main/Footer';
import LCard from '../../components/cards/LCard';
import { useNavigate } from 'react-router-dom';

function Place() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <Container>
      <Title>장소 추천</Title>  
            <div className='subtitle'>
            <SubTitle>
              아이들과 함께 출입이 가능한 장소들을 공유해요
            </SubTitle>
            <Btn onClick={() => 
            { navigate(`/placeadd`) }}>작성하기</Btn>
          </div>
          <LCard />
      </Container>
      <Footer/>
    </div>
  )
}


const Container = styled.div`
font-family: 'Noto Sans KR';

.subtitle {
  display: flex;
  justify-content: space-between;
}
`;


const Title = styled.p`
display: flex;
font-size: 35px;
font-weight: 700;
margin-top: 60px;
margin-left: 80px;
margin-bottom: 0px;
`

const SubTitle = styled.p`
font-size: 20px;
font-weight: 700;
line-height: 29px;
color: #6B4E16;
margin-left: 80px;
margin-bottom: 50px;
padding-top: 15px;
 `;

const Btn = styled.button`
margin-right: 80px;
margin-bottom: 50px;
padding: 10px 15px;
cursor: pointer;
border: 1px solid transparent;
 `;

export default Place
