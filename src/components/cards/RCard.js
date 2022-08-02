// 육아템 리뷰 카드
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { GrLocation } from "react-icons/gr";

function RCard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [index, setindex] = useState(1);
  const token = localStorage.getItem("accessToken");
  const url = process.env.REACT_APP_URL;

  // 배열 자르기 함수 (배열 , 몇개단위)
  const division = (arr, n) => {
    const length = arr.length;
    const divide =
      Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
    const newArray = [];
    // 배열 0부터 n개씩 잘라 새 배열에 넣기
    for (let i = 0; i <= divide; i++) {
      newArray.push(arr.splice(0, n));
    }
    return newArray;
  };

  // 데이터 변경 될 때 새로운 데이터 불러오기
  const refetch = () => {
    axios
      .get(
        `${url}/api/reviews`,
        token
          ? {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          : null
      )
      .then((res) => {
        let data = res.data.reviewPosts;
        setData([...data]);
      });
  };

  React.useEffect(() => {
    axios
      .get(
        `${url}/api/reviews`,
        token
          ? {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          : null
      )
      .then((res) => {
        let data = res.data.reviewPosts.slice(0, 2);
        setData([...data]);
      });
  }, []);

  // 페이지 스크롤이 하단에 도착할때 실행되는 함수
  const axiosData = () => {
    axios
      .get(
        `${url}/api/reviews`,
        token
          ? {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          : null
      )
      .then((res) => {
        let result = division(res.data.reviewPosts, 2);
        if (noMore === true) {
          setData((list) => [...list, result[index]].flat());
          setindex(index + 1);
        } else {
          return null;
        }
      });
  };

  if (!data) {
    return <div></div>;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={axiosData}
        hasMore={noMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        endMessage={<p>여기가 카드 끝이여 </p>}
      ></InfiniteScroll>
      <Container>
        <div className="RcardBox animate__animated animate__fadeInUp">
          {data &&
            data.map((data, idx) => {
              return (
                data && (
                  <div className="card" key={idx}>
                    <div className="firstTitle">
                      <div className="FirstBox">
                        <span className="FTitle">
                          {data.title.length > 13
                            ? data.title.slice(0, 8) + ".."
                            : data.title}
                        </span>
                        <span className="FType">
                          {data.productType.length > 6
                            ? data.productType.slice(0, 5) + ".."
                            : data.productType}
                        </span>
                      </div>

                      <div>
                        {data.bookmarkStatus === true ? (
                          <BsFillBookmarkFill
                            className={token ? "Fbook2" : "none"}
                            onClick={() => {
                              axios
                                .put(
                                  `${url}/api/reviews/bookmark/` +
                                    data.reviewPostId,
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
                          ></BsFillBookmarkFill>
                        ) : (
                          <BsBookmark
                            className={token ? "Fbook" : "none"}
                            onClick={() => {
                              axios
                                .put(
                                  `${url}/api/reviews/bookmark/` +
                                    data.reviewPostId,
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
                      className="Furl"
                      onClick={() => {
                        navigate("/reviewdetail/" + data.reviewPostId);
                      }}
                    >
                      <GrLocation
                        style={{
                          marginBottom: "3px",
                          marginRight: "3px",
                        }}
                      />
                      {data.url.length > 20 ? data.url.slice(0, 20) : data.url}
                    </div>

                    <div
                      className="RcardImg"
                      onClick={() => {
                        navigate("/reviewdetail/" + data.reviewPostId);
                      }}
                    >
                      <img src={data.imageUrl[0]} alt="사진" />
                    </div>

                    <div
                      className="RcardProfile"
                      onClick={() => {
                        navigate("/reviewdetail/" + data.reviewPostId);
                      }}
                    >
                      <div
                        className="Rprofile"
                        onClick={() => {
                          navigate("/reviewdetail/" + data.reviewPostId);
                        }}
                      >
                        <img src={data.profileUrl} alt="사진" />
                      </div>
                      <div
                        className="Rnickname"
                        onClick={() => {
                          navigate("/reviewdetail/" + data.reviewPostId);
                        }}
                      >
                        {data.nickname}
                      </div>
                    </div>

                    <div
                      className="content"
                      onClick={() => {
                        navigate("/reviewdetail/" + data.reviewPostId);
                      }}
                    >
                      {data.content.length > 20
                        ? data.content.slice(0, 100)
                        : data.content}
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  .RcardBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    margin: auto;
    padding: 50px 0px;
    width: 935px;
    height: 331px;
  }
  .card {
    background: white;
    border-radius: 20px;
    border: 1px solid white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
    width: 440px;
    height: 568px;
    padding: 30px 25px;
  }

  .firstTitle {
    width: 383px;
    height: 30px;
    display: flex;
    justify-content: space-between;
  }

  .FirstBox {
    display: flex;
    align-items: center;
  }

  .RcardImg {
    width: 390px;
    height: 257px;
    border-radius: 30px;
    margin-top: 22px;
    cursor: pointer;
  }

  .RcardImg > img {
    width: 380px;
    height: 250px;
    border-radius: 30px;
  }

  .none {
    display: none;
  }

  .RcardProfile {
    display: flex;
    margin-top: 22px;
    cursor: pointer;
  }

  .content {
    width: 390px;
    height: 96px;
    margin-top: 10px;
    cursor: pointer;
  }

  .FTitle {
    font-size: 26px;
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 700;
  }

  .FType {
    color: #a8a8a8;
    font-size: 20px;
    line-height: 23px;
    margin-left: 10px;
  }

  .Furl {
    color: #3c3c3c;
    font-size: 16px;
    margin-top: 13px;
    cursor: pointer;
  }

  .Fbook2 {
    font-size: 30px;
    color: #6b4e16;
    cursor: pointer;
  }
  .Fbook {
    font-size: 30px;
    cursor: pointer;
  }

  .Fbook2:hover {
    transform: scale(1.13);
  }
  .Fbook:hover {
    transform: scale(1.13);
  }

  .Rprofile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }

  .Rprofile > img {
    width: 50px;
    height: 50px;
    border: 1px solid #e4e4e4;
    border-radius: 50%;
  }

  .Rnickname {
    color: #3c3c3c;
    font-size: 20px;
    line-height: 23px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 700;
  }
`;

export default RCard;
