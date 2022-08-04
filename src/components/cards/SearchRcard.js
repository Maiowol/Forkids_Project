// 육아템 리뷰 카드
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlinePlace } from "react-icons/md";
import axios from "axios";
import { GrLocation } from "react-icons/gr";

function SearchRcard({ searchdata }) {
  const navigate = useNavigate();
  const [btn, setbtn] = React.useState(true);
  const [athis, setathis] = React.useState(6);

  const SearchMore = () => {
    setbtn(!btn);
    if (btn === false) {
      setathis(searchdata.length);
    } else {
      setathis(6);
    }
  };

  return (
    <>
      <Container>
        {searchdata.slice(0, athis) &&
          searchdata.slice(0, athis).map((data, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="cardin">
                  <div className="cardInto">
                    <div className="FirsBookBox">
                      <div className="FirstIn">
                        <div>
                          <span
                            className="titleCard"
                            onClick={() => {
                              navigate("/reviewdetail/" + data.reviewPostId);
                            }}
                          >
                            {data.title.length > 8
                              ? data.title.slice(0, 6) + "..."
                              : data.title}
                          </span>
                          <span
                            className="titleStar"
                            onClick={() => {
                              navigate("/reviewdetail/" + data.reviewPostId);
                            }}
                          >
                            {data.productType.length > 5
                              ? data.productType.slice(0, 4)
                              : data.productType}
                          </span>
                        </div>
                      </div>

                      <div className="BookRegion">
                        <GrLocation
                          style={{
                            marginBottom: "3px",
                            marginRight: "3px",
                          }}
                        />
                        {data.url.length > 20
                          ? data.url.slice(0, 14) + "..."
                          : data.url}
                      </div>

                      <div
                        className="image"
                        onClick={() => {
                          navigate("/reviewdetail/" + data.reviewPostId);
                        }}
                      >
                        <img src={data.imageUrl[0]} alt="사진" />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="SecondCard"
                  onClick={() => {
                    navigate("/reviewdetail/" + data.reviewPostId);
                  }}
                >
                  <div
                    className="SecondIn"
                    onClick={() => {
                      navigate("/reviewdetail/" + data.reviewPostId);
                    }}
                  >
                    <span>
                      <img
                        src={data.profileUrl}
                        alt="프로필 이미지"
                        className="BookProfileImg"
                      />
                    </span>
                    <span className="BookmarkNi">{data.nickname}</span>
                  </div>

                  <div
                    className="content"
                    onClick={() => {
                      navigate("/reviewdetail/" + data.placePostId);
                    }}
                  >
                    {data.content.length > 17
                      ? data.content.slice(0, 15) + "..."
                      : data.content}
                  </div>
                </div>
              </div>
            );
          })}
      </Container>
      <div className="btnBox">
        <button className="MoreBtn" onClick={SearchMore}>
          {btn ? "더보기" : "닫기"}
        </button>
      </div>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2em;
  justify-content: center;
  align-items: center;

  .card {
    background: white;
    border-radius: 20px;
    border: 1px solid #a8a8a8;
    overflow: hidden;
    width: 284px;
    height: 390px;
  }

  .firstT {
    width: 165.17px;
    height: 23px;
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    margin: 26px 12px 8px 16px;
    width: 255.63px;
    height: 56.48px;
  }
  .FirsBookBox {
    width: 268.87px;
    height: 69.72px;
    margin: 26px 12px 8px 16px;
  }

  .FirstIn {
    width: 255.63px;
    height: 31.48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .titleStar {
    color: #a8a8a8;
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    cursor: pointer;
    margin-left: 5px;
  }

  .bookpos {
    width: 31.48px;
    height: 31.48px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .BookRegion {
    width: 255.63px;
    height: 20px;
    margin-top: 10px;
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #3c3c3c;
    margin-bottom: 12px;
  }

  .SecondCard {
    width: 262px;
    height: 104.11px;
    cursor: pointer;
  }

  .SecondIn {
    width: 262px;
    height: 35.11px;
    margin-top: 5px;
    margin-left: 22px;
    cursor: pointer;
  }

  .BookProfileImg {
    width: 33.11px;
    height: 35.11px;
    border: 0.662246px solid #e4e4e4;
    border-radius: 50%;
  }

  .BookmarkNi {
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    margin-left: 8px;
  }

  .card-top p {
    display: flex;
    margin-left: 10px;
    color: gray;
  }

  .card-top > div {
    display: flex;
  }

  .titleCard {
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    margin-left: 7px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .cardin {
    width: 264.43px;
    height: 280px;
  }
  .bookmark {
    margin-right: 30px;
    width: 34px;
    height: 34px;
    cursor: pointer;
  }

  .bookmark2 {
    width: 34px;
    height: 34px;
    color: #6b4e16;
    cursor: pointer;
  }

  a {
    margin-left: 51px;
  }
  .card-body {
    width: 264.43px;
    height: 274px;
    cursor: pointer;
    text-align: center;
  }
  .image {
    border-radius: 25px;
    overflow: hidden;
    position: relative;
    right: 5px;
    top: 7px;
    cursor: pointer;
  }

  .image > img {
    width: 258.28px;
    height: 170.2px;
    border-radius: 19.8674px;
    border: 1px solid #e4e4e4;
  }

  .profile_box {
    display: flex;
    margin-top: 15px;
    padding-left: 30px;
  }
  .detail_profile > img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-left: 10px;
  }
  .detail_profile {
    border-radius: 50%;
    /* display:flex; */
    align-items: center;
    display: block;
    justify-content: center;
  }

  strong {
    font-family: "Noto Sans KR";
    margin-top: 12px;
    margin-left: 10px;
  }
  .card-body p {
    margin-top: 10px;
    margin-left: 5px;
  }
  .content {
    width: 250px;
    height: 67px;
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: left;
    margin: 7px 12px 20px 22px;
    word-break: break-all;
    cursor: pointer;
  }
`;

export default SearchRcard;
