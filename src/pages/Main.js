// 메인 페이지
import React from "react";
import styled from "styled-components";
import Grid from "../components/elements/Grid";
import Header from "../components/main/Header";
import Swiper from "../components/main/Swiper";
import MainLcard from '../components/cards/MainLcard';
import MainRcard from '../components/cards/MainRcard';
import Footer from "../components/main/Footer";
import MainScard from "../components/cards/MainScard";
import ChatIcon from '../components/main/ChatIcon'
import '../shared/App.css'
import SubHeader from "../components/main/SubHeader";
const Main = () => {

  return (
    <div className="MainBackGround">
      <Header />
      <SubHeader />
      <Swiper />
      <Grid maxWidth="1440px" height="100%" margin="0 auto" padding="0 12px">
        <Container>
          <div className="card_title">
            <Title>
              체험 모집
            </Title>
            
          </div>
          <div className="subtitle">
            <div className="subcontent">
              <SubTitle>
                다양한 공동육아 프로그램을 둘러보고, 참여를 신청해요!
              </SubTitle>
              <a href="/recruit">
                <Btn>
                  더 보기
                </Btn>
              </a>
            </div>
          </div>
          <MainScard/>
          <hr className="hrz" />

          <div className="card_title">
            <Title>장소 추천</Title>
          </div>
          <div className="subtitle">
            <div className="subcontent">
              <SubTitle>
                아이들과 함께 출입이 가능한 키즈존을 공유해요!
              </SubTitle>
              <a href="/place">
                <Btn>
                  더 보기
                </Btn>
              </a>
            </div>
          </div>
          <MainLcard />
          <hr />

          <div className="card_title">
            <Title>육아템 리뷰</Title>
          </div>
          <div className="subtitle">
            <div className="subcontent">
              <SubTitle>유용한 육아 아이템들을 소개하고 추천해요!</SubTitle>
              <a href="/review">
                <Btn>
                  더 보기
                </Btn>
              </a>
            </div>
          </div>
          <MainRcard />
        </Container>
      </Grid>
      <ChatIcon />
      <Footer />


    </div>
  );
};

const Container = styled.div`
  font-family: "Nanum Gothic";
  padding-left: 50px;
  padding-right: 50px;
  .card_title {
    width: 10px;
    width: 960px;
  }
  .subtitle {
    display: flex;
    margin-left: 171px;
  }
  .subcontent {
    display: flex;
    width: 970px;
    justify-content: space-between;
  }
  hr {
    color: #A8A8A8;
    height: 2.5px;
    margin-top: 100px;
  }
.hrz {
    color: #A8A8A8;
    height: 2.5px;
    margin-top: 220px;
  }
`;

const Title = styled.p`
  display: flex;
  font-size: 28px;
  align-items: flex-end;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 800;
  height: 137px;
  margin-left: 170px;
  margin-bottom: 0px;
  img{
    width:70px;
    height:55px;
  }
`;

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  color: #6b4e16;
  // margin-left: 171px;
  margin-bottom: 50px;
  padding-top: 5px;
`;

const Btn = styled.button`
  margin-bottom: 50px;
  padding: 10px 17px;
  cursor: pointer;
  border: 1px solid transparent;
  background: #3c3c3c;
  color: white;
  border-radius: 30px;
  font-weight: 700;
`;

export default Main;