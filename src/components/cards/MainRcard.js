// 육아템 리뷰 카드
import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlinePlace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { GetMainAxois, GetMainLogin } from "../../redux/modules/Data";
import { GrLocation } from "react-icons/gr";

function MainRcard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken')
  React.useEffect(() => {
    token ? dispatch(GetMainAxois()) : dispatch(GetMainLogin())
  }, []);

  const post = useSelector((state) => state.Data.Profile);

  if (!post) {
    return <div></div>;
  }

  return (
    <>
      <Container>
        <div className="RcardBox animate__animated animate__fadeInUp">
          {post.reviewPosts &&
            post.reviewPosts.map((data, idx) => {
              return (
                data &&
                <div className="card" key={idx}>

                  <div className="firstTitle">

                    <div className="FirstBox">
                      <span className="FTitle">{data.title.length > 13 ? data.title.slice(0, 8) + '..' : data.title}</span>
                      <span className="FType">{data.productType.length > 6 ? data.productType.slice(0, 6) + '..' : data.productType}</span>
                    </div>

                    <div>
                      {data.bookmarkStatus === true ? (
                        <BsFillBookmarkFill
                          className={token ? "Fbook2" : "none"}
                          onClick={() => {
                            axios
                              .put(
                                "https://zhaoxilin.shop/api/reviews/bookmark/" +
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
                                dispatch(GetMainAxois())
                              });
                          }}
                        ></BsFillBookmarkFill>
                      ) : (
                        <BsBookmark
                          className={token ? "Fbook" : "none"}
                          onClick={() => {
                            axios
                              .put(
                                "https://zhaoxilin.shop/api/reviews/bookmark/" +
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
                                dispatch(GetMainAxois())
                              });
                          }}
                        />
                      )}
                    </div>

                  </div>

                  <div className="Furl" onClick={() => {
                    navigate("/reviewdetail/" + data.reviewPostId);
                  }}>
                    <GrLocation
                      style={{
                        marginBottom: "3px",
                        marginRight: "3px"
                      }} />
                    {data.url.length > 6 ? data.url.slice(0, 5) : data.url}</div>

                  <div className="RcardImg" onClick={() => {
                    navigate("/reviewdetail/" + data.reviewPostId);
                  }}><img src={data.imageUrl[0]} alt="사진" /></div>

                  <div className="RcardProfile" onClick={() => {
                    navigate("/reviewdetail/" + data.reviewPostId);
                  }}>
                    <div className="Rprofile" onClick={() => {
                      navigate("/reviewdetail/" + data.reviewPostId);
                    }}><img src={data.profileUrl} alt="사진" /></div>
                    <div className="Rnickname" onClick={() => {
                      navigate("/reviewdetail/" + data.reviewPostId);
                    }}>{data.nickname}</div>
                  </div>

                  <div className="content" onClick={() => {
                    navigate("/reviewdetail/" + data.reviewPostId);
                  }}>{data.content.length > 6 ? data.content.slice(0, 5) : data.content}</div>

                </div>
              );
            })}
        </div>
      </Container>

    </>
  );
}

const Container = styled.div`
padding-bottom: 250px;
  .RcardBox{
    display: grid;
    grid-template-columns: 1fr 1fr ;
    gap: 2em;
    margin: auto;
    width: 935px;
    height: 331px;
  }
  .card {
    background: white;
    border-radius: 20px;
    border: 1px solid #A8A8A8;
    width: 440px;
    height: 568px;
    padding: 30px 25px;
  }

  .firstTitle{
    width: 383px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    
  }

  .FirstBox{
    display: flex;
    align-items: center;
  }

  .RcardImg{
    width: 390px;
    height: 257px;
    border-radius: 30px;
    margin-top: 22px;
    cursor: pointer;
  }

  .RcardImg >img {
    width: 380px;
    height: 250px;
    border-radius: 30px;
  }

  .none{
    display: none;
  }

  .RcardProfile{
    display: flex;
    margin-top: 22px;
    cursor: pointer;
  }

  .content{
    width: 390px;
    height: 96px;
    margin-top: 10px;
    cursor: pointer;
  }

  .FTitle{
    font-size: 26px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }

  .FType{
    color: #A8A8A8;
    font-size: 20px;
    line-height: 23px;
    margin-left: 10px;
  }

  .Furl{
    color: #3C3C3C;
    font-size: 16px;
    margin-top: 13px;
    cursor: pointer;
  }

.Fbook2{
  font-size: 30px;
  color: #6b4e16;
  cursor: pointer;
}
.Fbook{
  font-size: 30px;
  cursor: pointer;
}

.Fbook2:hover{
  transform: scale(1.13);
}
.Fbook:hover{
  transform: scale(1.13);
}


.Rprofile{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.Rprofile > img {
  width: 50px;
  height: 50px;
  border: 1px solid #E4E4E4;
  border-radius: 50%;
}

.Rnickname{
  color: #3C3C3C;
  font-size: 20px;
  line-height: 23px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
}
`;

export default MainRcard;
