//육아템 리뷰
import React from "react";
import styled from "styled-components";
import ChatIcon from '../../components/main/ChatIcon'
import Header from "../../components/main/Header";
import RCard from "../../components/cards/RCard";
import bottle from "../../images/bottle.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Review() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <Container>
        <TitleBox>
          <Title>육아템 리뷰</Title>
          <div className="subtitle">
            <SubTitle>유용한 육아 아이템들을 소개하고 추천해요!</SubTitle>
          </div>
          <div className="image">
            <img src={bottle} />
          </div>
          <span className="spanstyle">내가 써본 육아템, 알려주고 싶다면?</span>
          <div className="button">
            {!token ? (
              <Link to="/login">
                <Btn>
                  후기 작성하기
                </Btn>
              </Link>
            ) : (
              <Link to="/reviewadd">
                <Btn>
                  후기 작성하기
                </Btn>
              </Link>
            )}
          </div>
        </TitleBox>
        <div className="card_box">
          <RCard />
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

  .spanstyle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    font-weight: 700;
  }

  .card_box {
    background: #fafafa;
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
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 800;
`;

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  color: #3c3c3c;
  margin-bottom: 20px;
  padding-top: 15px;
  font-family: "Nanum Gothic", sans-serif;
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

export default Review;
