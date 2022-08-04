// 모집 카드
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import axios from "axios";
import { GetMainAxois, GetMainLogin } from "../../redux/modules/Data";
import { useSelector, useDispatch } from "react-redux";
import { GrLocation } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbMoodKid } from "react-icons/tb";

function MainScard() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const url = process.env.REACT_APP_URL;

  React.useEffect(() => {
    token ? dispatch(GetMainAxois()) : dispatch(GetMainLogin());
  }, []);

  const post = useSelector((state) => state.Data.Profile);

  if (!post) {
    return <div></div>;
  }

  return (
    <>
      <Container>
        <div className="test">
          {post.recruitPosts &&
            post.recruitPosts.map((item, idx) => {
              return (
                item != null && (
                  <div
                    className="card animate__animated animate__fadeInUp"
                    key={idx}
                  >
                    <div className="card-top">
                      {item.status === true ? (
                        <p>모집완료</p>
                      ) : (
                        <span>모집중</span>
                      )}
                      {item.bookmarkStatus === true ? (
                        <BsFillBookmarkFill
                          className={token ? "checkIcon" : "none"}
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
                                dispatch(GetMainAxois());
                              });
                          }}
                        />
                      ) : (
                        <BsBookmark
                          className={token ? "icon" : "none"}
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
                                dispatch(GetMainAxois());
                              });
                          }}
                        />
                      )}
                    </div>
                    {/* 카드 타이틀 */}
                    <Link to={`/recruitdetail/${item.recruitPostId}`}>
                      <div className="titleTwo">
                        <span className="spantitle">
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
                          <AiOutlineCalendar style={{ marginRight: "8px" }} />
                          {item != null && item.date}
                        </div>
                        <div>
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
                )
              );
            })}
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  justify-content: center;
  align-items: center;

  .test {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2em;
    width: 914px;
    height: 400px;
    margin: auto;
  }
  .card {
    display: flex;
    width: 284px;
    height: 247px;
    background: white;
    border-radius: 20px;
    border: none;
    border: 1px solid white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
  }
  .card-top {
    display: flex;
    width: 284px;
    height: 30px;
    justify-content: space-between;
    margin: 20px 20px 25px 20px;
  }

  a {
    text-decoration: none;
    color: black;
  }
  .card-top > p {
    width: 114px;
    height: 28px;
    background-color: #a8a8a8;
    border: 1px solid #a8a8a8;
    border-radius: 20px;
    color: #ffffff;
    font-style: normal;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }

  .card-top span {
    width: 114px;
    height: 28px;
    background: #f4b03e;
    border: 1px solid #f4b03e;
    border-radius: 20px;
    color: #ffffff;
    font-style: normal;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }

  .spantitle {
    display: flex;
    justify-content: flex-start;
    font-family: "Nanum Gothic", sans-serif;
  }

  span.spantitle {
    font-weight: 700;
  }

  .icon {
    margin-right: 35px;
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
    font-style: normal;
    font-size: 20px;
    line-height: 23px;
    margin: 0px 25px 25px 25px;
  }
  .card-bottom {
    cursor: pointer;
    margin: 0px 20px 20px 22px;
    width: 243px;
    height: 104px;
  }
  .card-bottom div {
    margin-bottom: 8px;
    font-style: normal;
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

  .none {
    display: none;
  }

  .checkIcon:hover {
    transform: scale(1.13);
  }
  .icon:hover {
    transform: scale(1.13);
  }
`;

export default MainScard;
