// 모집 게시글 페이지
import React from "react";
import styled from "styled-components";
import ChatIcon from '../../components/main/ChatIcon'
import Header from "../../components/main/Header";
import SCard from "../../components/cards/SCard";
import hand from '../../images/hand.png';
import { Link } from "react-router-dom";

function Recruit() {
  const token = localStorage.getItem("accessToken");
  return (
    <div>
      <Header />
      <Container>
        <TitleBox>
          <Title>체험 모집</Title>
          <div className="subtitle">
            <SubTitle>
              다양한 공동육아 프로그램을 둘러보고, 참여를 신청해요!
            </SubTitle>
          </div>
          <div className="image"><img src={hand} /></div>
          <span>내가 하는 활동, 함께 할 팀원을 모집하고 싶다면?</span>
          <div className="button">
            {!token ? (
              <Link to="/login">
                <Btn>
                  모집글 작성하기
                </Btn>
              </Link>
            ) : (
               <Link to="/recruitadd">
                <Btn>
                  모집글 작성하기
                </Btn>
              </Link>
            )}
          </div>
        </TitleBox>
        <div className="card_box">
          <SCard />
        </div>
      </Container>
      <ChatIcon />
    </div>
  );
}

const Container = styled.div`
  font-family: "Nanum Gothic";

  .subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    font-weight: 700;
  }

  .card_box {
    padding-top: 50px;
    background: #FAFAFA;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const TitleBox = styled.div`
  background-color: white;
  padding-top: 50px;
  padding-bottom: 70px;

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: 750;
  margin-bottom: 0px;
  color: #6b4e16;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 800;
`;

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  color: #3c3c3c;
  margin-bottom: 20px;
  padding-top: 15px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
`;

const Btn = styled.button`
  height: 50px;
  font-size: 15px;
  font-weight: 700;
  width: 330px;
  color: #ffffff;
  background-color: #3c3c3c;
  text-align: center;
  border-radius: 30px;
  touch-action: manipulation;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  cursor: pointer;
`;

export default Recruit;
