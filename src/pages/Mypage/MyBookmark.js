import React from "react";
import Header from "../../components/main/Header";
import styled from "styled-components";
import BookScard from "../../components/cards/BookScard";
import BookRcard from "../../components/cards/BookRcard";
import BookLcard from "../../components/cards/BookLcard";

const MyBookmark = () => {
  return (
    <>
      <Header />
      <Bookmark>
        <div className="title">
          <div className="mypage">마이페이지</div>
          <div className="booktitle">북마크</div>
        </div>

        <div className="MainBox">
          <div className="titleOne">
            <div className="subtitle">체험 모집</div>
            <div className="subContent">
              다양한 공동육아 프로그램을 둘러보고, 참여를 신청해요!
            </div>
          </div>

          <div className="cardBox">
            <BookScard />
          </div>

          <div className="titleOne">
            <div className="subtitle">장소 추천</div>
            <div className="subContent">
              아이들과 함께 출입이 가능한 키즈존을 공유해요!
            </div>
          </div>

          <div className="cardBox">
            <BookRcard />
          </div>

          <div className="titleOne">
            <div className="subtitle">육아템 리뷰</div>
            <div className="subContent">
              유용한 육아용품들을 소개하고 추천해요!
            </div>
          </div>

          <div className="cardBox">
            <BookLcard />
          </div>
        </div>
      </Bookmark>
    </>
  );
};

const Bookmark = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;

  .title {
    width: 80%;
    margin: auto;
  }

  .mypage {
    color: #a8a8a8;
    font-family: "Nanum Gothic";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    padding-top: 20px;
    margin-bottom: 10px;
  }

  .booktitle {
    color: #000000;
    font-family: "Nanum Gothic";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 30px;
  }

  .MainBox {
    border: 1px solid #e4e4e4;
    width: 80%;
    height: 100%;
    margin: 30px auto;
    border-radius: 10px;
    background: #ffffff;
  }

  .subtitle {
    color: #000000;
    font-family: "Nanum Gothic";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 12px;
  }

  .subContent {
    color: #6b4e16;
    font-family: "Nanum Gothic";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
  }

  .titleOne {
    margin: 64px 0px 35px 85px;
  }

  .cardBox {
    width: 90%;
    margin: auto;
    border: 1px solid black;
  }
`;

export default MyBookmark;
