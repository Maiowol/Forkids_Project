//  장소 추천 카드
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

function LCard() {
  const [data, setData] = useState([]);
  const noMore = true;
  const [index, setIndex] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const url = process.env.REACT_APP_URL;

  // 페이지 로드될 때 서버 데이터 요청
  React.useEffect(() => {
    axios
      .get(
        `${url}/api/places`,
        token
          ? {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          : null
      )
      .then((res) => {
        let data = res.data.placePosts.slice(0, 2);
        setData([...data]);
      });
  }, []);

  // 배열 자르기 함수 (배열 , 몇개단위)
  const division = (arr, n) => {
    const length = arr.length;
    const divide =
      Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
    const newArray = [];
    for (let i = 0; i <= divide; i++) {
      newArray.push(arr.splice(0, n));
    }
    return newArray;
  };

  // 데이터 변경 될 때 새로운 데이터 불러오기
  const refetch = () => {
    axios
      .get(
        `${url}/api/places`,
        token
          ? {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          : null
      )
      .then((res) => {
        let data = res.data.placePosts;
        setData([...data]);
      });
  };

  // 스크롤 밑으로 내려갈 때 실행될 함수
  const axiosData = () => {
    axios
      .get(
        `${url}/api/places`,
        token
          ? {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          : null
      )
      .then((res) => {
        let result = division(res.data.placePosts, 2);
        if (noMore === true) {
          setData((list) => [...list, result[index]].flat());
          setIndex(index + 1);
        } else {
          return null;
        }
      });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={axiosData}
        hasMore={noMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        endMessage={<p>여기가 카드 끝이여</p>}
      ></InfiniteScroll>
      <Container>
        {data &&
          data.map(
            (item, index) =>
              item && (
                <div
                  className="card animate__animated animate__fadeInUp"
                  key={index}
                >
                  {/* 카드 왼쪽 '이미지' */}
                  <div
                    className="card-left"
                    onClick={() => {
                      navigate("/placedetail/" + item.placePostId);
                    }}
                  >
                    <img src={item.imageUrl[0]} alt="사진" />
                  </div>
                  {/* 카드 오른쪽 '타이틀 및 설명' */}
                  <div className="card-right">
                    <div className="title">
                      <div
                        className="titleBox"
                        onClick={() => {
                          navigate("/placedetail/" + item.placePostId);
                        }}
                      >
                        <div className="threebox">
                          <span className="threeTitle">
                            {item.title.length > 8
                              ? item.title.slice(0, 7) + "..."
                              : item.title}
                          </span>
                          <span>
                            <FaStar
                              size={28}
                              style={{ color: "#FFBA5A", marginLeft: "5px" }}
                            />
                          </span>
                          <span className="threeStar">{item.star}점</span>
                        </div>
                      </div>
                      <div>
                        {item.bookmarkStatus === true ? (
                          <BsFillBookmarkFill
                            className={token ? "bookmark2" : "none"}
                            onClick={() => {
                              axios
                                .put(
                                  `${url}/api/places/bookmark/` +
                                    item.placePostId,
                                  null,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${localStorage.getItem(
                                        "accessToken"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  refetch();
                                });
                            }}
                          />
                        ) : (
                          <BsBookmark
                            className={token ? "bookmark" : "none"}
                            onClick={() => {
                              axios
                                .put(
                                  `${url}/api/places/bookmark/` +
                                    item.placePostId,
                                  null,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${localStorage.getItem(
                                        "accessToken"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  refetch();
                                });
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className="atag"
                      onClick={() => {
                        navigate("/placedetail/" + item.placePostId);
                      }}
                    >
                      <GrLocation
                        style={{
                          marginBottom: "3px",
                          marginRight: "3px",
                        }}
                      />
                      {item.region.length > 27
                        ? item.region.slice(0, 26) + "..."
                        : item.region}
                    </div>
                    <div
                      className="profile_box"
                      onClick={() => {
                        navigate("/placedetail/" + item.placePostId);
                      }}
                    >
                      <div className="detail_profile">
                        <img src={item.profileUrl} alt="프로필" />
                      </div>
                      <strong>{item.nickname}</strong>
                    </div>
                    <div
                      className="content"
                      onClick={() => {
                        navigate("/placedetail/" + item.placePostId);
                      }}
                    >
                      <span>
                        {item.content.length > 90
                          ? item.content.slice(0, 90) + "..."
                          : item.content}
                      </span>
                    </div>
                  </div>
                </div>
              )
          )}
      </Container>
    </>
  );
}

const Container = styled.div`
  font-family: "Nanum Gothic";
  display: grid;
  grid-template-columns: repeat(auto-fit);
  gap: 3.5em;
  justify-content: center;
  align-items: center;
  .card {
    background: #fff;
    border-radius: 20px;
    border: 1px solid white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
    width: 900px;
    height: 355px;
    display: flex;
    flex-direction: row;
  }
  .card-left {
    display: flex;
    width: 465px;
    height: 335px;
    padding: 10px;
    margin: 10px 15px 10px 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
  }

  .threebox {
    display: flex;
    margin-top: 10px;
    margin-bottom: -10px;
    margin-left: 5px;
  }

  .threeStar {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    line-height: 23px;
    color: #a8a8a8;
    margin-left: 6px;
    margin-top: 2px;
  }

  .threeTitle {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 26px;
    line-height: 30px;
    margin-right: 20px;
    margin-top: 2px;
  }

  .none {
    display: none;
  }

  .bookmark2 {
    width: 34px;
    height: 34px;
    color: #6b4e16;
    cursor: pointer;
  }
  .titleBox {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .atag {
    text-decoration: none;
    color: black;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .bookmark {
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
  .image > img {
    width: 445px;
    height: 315px;
    border-radius: 20px;
  }
  .card-left > img {
    width: 445px;
    height: 315px;
    border-radius: 30px;
    object-fit: cover;
  }
  .card-right {
    display: flex;
    flex-direction: column;
    width: 369px;
    height: 299px;
    padding: 0px 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    width: 361px;
    height: 50px;
    margin: 28px 29px 10px 0px;
  }

  .profile_box {
    display: flex;
    margin-top: 10px;
    cursor: pointer;
  }
  .profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid black;
  }
  .detail_profile > img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #e4e4e4;
  }
  .detail_profile {
    border-radius: 50%;
    align-items: center;
    display: block;
    justify-content: center;
  }
  strong {
    margin-top: 10px;
    margin-left: 10px;
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 800;
  }
  .card-right p {
    margin: 6px 10px 0px 5px;
  }
  .content {
    margin-right: 20px;
    margin-top: 18px;
    width: 359px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
  }
`;

export default LCard;
