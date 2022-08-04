// 모집 카드
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import axios from "axios";
import { GrLocation } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbMoodKid } from "react-icons/tb";

function BookScard() {
  const [book, setBook] = React.useState();
  const [btn, setBtn] = React.useState(true);
  const url = process.env.REACT_APP_URL;

  const refetch = () => {
    axios
      .get(`${url}/api/mypage/bookmark/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setBook(res.data.recruitBookmarkList.slice(0, 6));
      })
      .catch((err) => {});
  };

  React.useEffect(() => {
    refetch();
  }, []);

  const recruitsMore = async () => {
    await axios
      .get(`${url}/api/mypage/bookmark/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setBtn(!btn);
        btn
          ? setBook(res.data.recruitBookmarkList)
          : setBook(res.data.recruitBookmarkList.slice(0, 6));
      });
  };

  return (
    <>
      <Container>
        {book &&
          book.map((item, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="card-top">
                  {item.status === true ? <p>모집완료</p> : <span>모집중</span>}
                  {item.bookmarkStatus === true ? (
                    <BsFillBookmarkFill
                      className="checkIcon"
                      onClick={() => {
                        axios
                          .put(
                            `${url}/api/recruits/bookmark/` +
                              item.recruitPostId,
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
                      className="icon"
                      onClick={() => {
                        axios
                          .put(
                            `${url}/api/recruits/bookmark/` +
                              item.recruitPostId,
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
                {/* 카드 타이틀 */}
                <Link to={`/recruitdetail/${item.recruitPostId}`}>
                  <div className="titleTwo">
                    <span>
                      {item.title.length > 12
                        ? item.title.slice(0, 11) + "..."
                        : item.title}
                    </span>
                  </div>
                  {/* 카드 내용물 */}
                  <div className="card-bottom">
                    <div>
                      <GrLocation style={{ marginRight: "8px" }} />
                      {item.place.length > 14
                        ? item.place.slice(0, 13) + "..."
                        : item.place}
                    </div>
                    <div>
                      <div>
                        <AiOutlineCalendar style={{ marginRight: "8px" }} />
                        {item != null && item.date}
                      </div>
                      <BiTimeFive style={{ marginRight: "8px" }} />
                      {item != null && item.time}
                    </div>
                    <div>
                      <TbMoodKid style={{ marginRight: "8px" }} />
                      {item.age.length > 14
                        ? item.age.slice(0, 13) + "..."
                        : item.age}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </Container>
      <div className="btnBox">
        <button className="MoreBtn" onClick={recruitsMore}>
          {btn ? "더보기" : "닫기"}
        </button>
      </div>
      <hr className="BookHr" />
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
    display: flex;
    width: 284px;
    height: 247px;
    background: white;
    border-radius: 20px;
    border: none;
    border: 1px solid #a8a8a8;
  }
  .card-top {
    display: flex;
    width: 284px;
    height: 30px;
    justify-content: space-between;
    margin: 20px 20px 25px 20px;
  }
  .card-top > p {
    width: 114px;
    height: 28px;
    background-color: #a8a8a8;
    border: 1px solid #a8a8a8;
    border-radius: 20px;
    color: #ffffff;
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: black;
  }
  .card-top span {
    width: 114px;
    height: 28px;
    background: #f4b03e;
    border: 1px solid #f4b03e;
    border-radius: 30px;
    color: #ffffff;
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    margin-right: 60px;
    width: 30px;
    height: 30px;
    color: black;
    cursor: pointer;
    position: relative;
    top: 0px;
  }
  .titleTwo {
    width: 234px;
    height: 23px;
    cursor: pointer;
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    margin: 0px 25px 25px 25px;
  }
  .card-bottom {
    cursor: pointer;
    margin: 0px 20px 20px 25px;
    width: 243px;
    height: 104px;
  }
  .card-bottom div {
    margin-bottom: 8px;
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
  }

  .card-bottom > div > img {
    margin-right: 8px;
  }
  .checkIcon {
    margin-right: 40px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    position: relative;
    top: 0px;
    color: #6b4e16;
  }
  .checkIcon:hover {
    transform: scale(1.13);
  }
  .icon:hover {
    transform: scale(1.13);
  }
`;

export default BookScard;
