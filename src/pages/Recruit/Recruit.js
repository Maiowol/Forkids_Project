// 모집 게시글 페이지
import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//  elements & components
import Grid from '../../components/elements/Grid';
import Header from '../../components/main/Header';
import SCard from '../../components/cards/SCard';

function Recruit() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
        <Container>
        <Title>같이해요</Title> 
            <div className='subtitle'>
            <SubTitle>다양한 공동육아 프로그램를 둘러보고,
              참여를 신청해요 </SubTitle>
            <Btn onClick={() => 
            { navigate(`/recruitadd`) }}>작성하기</Btn>
          </div>
         <SCard/>
      </Container>

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



export default Recruit
