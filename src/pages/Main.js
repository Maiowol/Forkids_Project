// 메인 페이지
import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
//  elements & components
import Grid from '../components/elements/Grid';
import Header from '../components/main/Header'
import Swiper from '../components/main/Swiper'
import SCard from '../components/cards/SCard'
import LCard from '../components/cards/LCard'
import RCard from '../components/cards/RCard'
import Footer from '../components/main/Footer'

const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <Swiper />

      <Grid maxWidth="1440px" height="100%" margin="0 auto" padding="0 12px">
        <Container>
            <Title>같이해요</Title> 
            <div className='subtitle'>

            <SubTitle>다양한 공동육아 프로그램를 둘러보고,
              참여를 신청해요 </SubTitle>
            <Btn onClick={() => 
            { navigate(`/recruit`) }}>더 보기</Btn>
          </div>
          <SCard />

        
            <Title style={{marginTop:"180px"}}
            >장소 추천</Title>  
            <div className='subtitle'>
            <SubTitle>
              아이들과 함께 출입이 가능한 장소들을 공유해요
            </SubTitle>
            <Btn onClick={() => 
            { navigate(`/place`) }}>더 보기</Btn>
          </div>
          <LCard />

          
            <Title style={{marginTop:"180px"}}
            >육아템 리뷰</Title>
            <div className='subtitle'>
            <SubTitle>
              육아는 장비빨! 생생한 사용후기를 공유해요
            </SubTitle>
            <Btn onClick={() => 
            { navigate(`/review`) }}>더 보기</Btn>
          </div>
          <RCard />
        </Container>
      </Grid> 
      <Footer />
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
margin-top: 120px;
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

export default Main
