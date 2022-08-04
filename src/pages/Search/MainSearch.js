import React, { useState } from "react";
import Header from "../../components/main/Header";
import styled from "styled-components";
import img_search from "../../images/search.png";
import SearchScard from "../../components/cards/SearchScard";
import SearchLcard from "../../components/cards/SearchLcard";
import SearchRcard from "../../components/cards/SearchRcard";
import Footer from "../../components/main/Footer";
import ChatIcon from "../../components/main/ChatIcon";
import axios from "axios";

const MainSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [Morerecruit, setMorerecruit] = useState([]);
  const [Moreplace, setMoreplace] = useState([]);
  const [Morereview, setMorereview] = useState([]);
  const url = process.env.REACT_APP_URL;

  const search = () => {
    if (keyword.length > 0) {
      axios
        .get(`${url}/api/search?keyword=${keyword}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setMorerecruit(res.data.resultsInRecruit);
          setMoreplace(res.data.resultsInPlace);
          setMorereview(res.data.resultsInReview);
        });
    } else {
      alert("검색어를 입력하세요");
    }
  };

  // enter key로 검색
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <Header />
      <Search>
        <div className="title">
          <div
            className="searchinput"
            style={{
              fontFamily: "Nanum Gothic",
              fontWeight: "600",
              color: "#a8a8a8",
            }}
          >
            게시글 검색
          </div>
          <div
            className="serchtitle"
            style={{
              fontFamily: "Nanum Gothic",
              fontWeight: "700",
              marginTop: "3px",
              marginBottom: "-25px",
            }}
          >
            키워드 검색하기
          </div>
        </div>

        <div className="MainBox">
          <InputBox>
            <div className="search">
              <input
                type="text"
                className="search-box"
                placeholder="키워드를 입력하세요 (예) 체험명, 지역명, 작성자"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                onKeyPress={onKeyPress}
              />
              <img src={img_search} onClick={search} alt="검색" />
            </div>
          </InputBox>
          <Text> "{keyword}"에 대한 검색 결과입니다.</Text>
          <Cards>
            <div className="subtitle">체험 모집</div>
            <div className="subContent">
              다양한 공동육아 프로그램을 둘러보고, 참여를 신청해요!
            </div>
          </Cards>

          <div className="cardBox">
            <SearchScard
              Morerecruit={Morerecruit}
              search={search}
              keyword={keyword}
            />
          </div>

          <Cards>
            <div className="subtitle">장소 추천</div>
            <div className="subContent">
              아이들과 함께 출입이 가능한 키즈존을 공유해요!
            </div>
          </Cards>

          <div className="cardBox">
            <SearchLcard searchdata={Moreplace} />
          </div>

          <Cards>
            <div className="subtitle">육아템 리뷰</div>
            <div className="subContent">
              유용한 육아용품들을 소개하고 추천해요!
            </div>
          </Cards>

          <div className="cardBox">
            <SearchRcard searchdata={Morereview} />
          </div>
        </div>
      </Search>
      <ChatIcon />
      <Footer />
    </>
  );
};

const Search = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  padding-bottom: 30px;

  .title {
    width: 1014px;
    height: 100px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .serchinput {
    color: #a8a8a8;
    font-size: 16px;
    line-height: 18px;
    padding-top: 20px;
    margin-bottom: 10px;
  }

  .serchtitle {
    color: #000000;
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 30px;
  }

  .MoreBtn {
    width: 130px;
    height: 38px;
    position: relative;
    right: 50px;
    transition: all 0.25s ease;
    border-radius: 30px;
    background: #3c3c3c;
    margin-top: 30px;
    color: #fff;
    border: none;
    font-family: "NanumGothic";
    font-weight: 700;
  }

  .MainBox {
    border: 1px solid #e4e4e4;
    width: 1014px;
    margin: 30px auto;
    border-radius: 10px;
    background: #ffffff;
  }

  .cardBox {
    width: 90%;
    margin: auto;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a8a8a8;
  margin-top: 40px;
`;

const InputBox = styled.div`
  font-family: "Nanum Gothic";
  display: flex;
  align-items: center;
  justify-content: center;

  .search {
    position: relative;
    width: 700px;
    margin-top: 30px;

    input {
      width: 100%;
      border: 1px solid #3c3c3c;
      border-radius: 30px;
      padding: 10px 12px;
      font-size: 14px;
      outline: none;
    }

    img {
      position: absolute;
      width: 23px;
      top: 10px;
      right: 16px;
      margin: 0;
      cursor: pointer;
    }
  }
`;

const Cards = styled.div`
  margin: 44px 0px 80px 85px;

  .subtitle {
    color: #000000;
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 12px;
  }

  .subContent {
    color: #6b4e16;
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 16px;
    line-height: 18px;
  }
`;

export default MainSearch;
