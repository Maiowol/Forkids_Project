//  장소 추천 카드
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetMainAxois, GetMainLogin } from "../../redux/modules/Data";
import { GrLocation } from "react-icons/gr";

function MainLcard() {
  const navigate = useNavigate();
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
        {post.placePosts &&
          post.placePosts.map(
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
                                  dispatch(GetMainAxois());
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
                                  dispatch(GetMainAxois());
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
    margin-bottom: -3px;
    margin-left: 3px;
  }

  .threeStar {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    line-height: 23px;
    color: #a8a8a8;
    margin-left: 6px;
    margin-top: 3px;
  }

  .threeTitle {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 26px;
    line-height: 30px;
    margin-right: 20px;
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
    margin-bottom: 10px;
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
    margin-top: 10px;
    width: 359px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
  }
`;

export default MainLcard;
