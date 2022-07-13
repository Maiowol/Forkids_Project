import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import Header from "../../components/main/Header";
import Comment from "../../components/elements/Comment";
import { GetMyPageAxios } from "../../redux/modules/Data";

const ReviewDetail = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="OneBox">
          <div className="OnePicture">
            <div className="Big">
              <div className="BigPicture"></div>
            </div>
            <div className="small">
              <div className="smallPicture"></div>
              <div className="smallPicture"></div>
              <div className="smallPicture"></div>
              <div className="smallPicture"></div>
            </div>
          </div>

          <div className="OneContent">
            <div className="TwoBox">
              <div className="title">
                <p>어린이스마트폰</p>
                <span className="starScore"> 가전제품</span>
              </div>

              <div className="location">
                <p>
                  <GrLocation></GrLocation>www.gmarket.com/kidsphone
                </p>
              </div>

              <div className="info">
                <div className="profile">사진</div>
                <p className="nickname">5세맘육아왕</p>
              </div>
            </div>

            <div className="ThreeBox">
              <div className="fourBox">
                <p>내용</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Comment />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;

  .OneBox {
    margin: 80px auto;
    width: 80%;
    height: 70vh;
    display: flex;
  }

  .OnePicture {
    width: 50%;
    height: 70vh;
  }

  .OneContent {
    width: 50%;
    height: 70vh;
  }

  .Big {
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .small {
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .TwoBox {
    height: 45%;
  }

  .TwoBox > div {
    height: 33.5%;
  }

  .ThreeBox {
    height: 55%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    display: flex;
    align-items: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    padding: 30px;
  }

  .icon {
    color: #fdd835;
    margin-left: 30px;
  }

  .starScore {
    color: #a8a8a8;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    margin-left: 15px;
  }

  .location {
    display: flex;
    align-items: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    padding: 30px;
  }

  .info {
    display: flex;
    align-items: center;
    padding: 30px;
  }

  .profile {
    border: 1px solid black;
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .nickname {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    margin-left: 30px;
  }

  .fourBox {
    border: 2px solid #e4e4e4;
    border-radius: 10px;
    width: 80%;
    height: 90%;
  }

  .fourBox > p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    width: 100%;
    height: 80%;
  }

  .fourBox > div {
    width: 100%;
    height: 20%;
  }

  .ParkBtn {
    width: 30%;
    height: 50%;
    border-radius: 15px;
    font-size: 17px;
    color: #263238;
    border: none;
    background-color: #ffa000;
  }

  .btnBox {
    display: flex;
    justify-content: space-around;
  }

  .KidBtn {
    width: 30%;
    height: 50%;
    border-radius: 15px;
    font-size: 17px;
    color: #263238;
    border: none;
    background-color: #c5e1a5;
  }

  .BigPicture {
    border: 1px solid black;
    width: 70%;
    height: 90%;
    border-radius: 30px;
  }

  .smallPicture {
    border: 1px solid black;
    width: 200px;
    height: 170px;
    border-radius: 30px;
    margin-left: 15px;
    margin-right: 10px;
  }
`;

export default ReviewDetail;
