import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/main/Header";
import PlaceComment from "../../components/pages/PlaceComment";
import KakaoMap from "../../components/pages/KakaoMap";
import { FaStar } from "react-icons/fa";
import revise from '../../images/revise.png';
import img_delete from '../../images/delete (1).png'
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/main/Footer";
import ChatIcon from '../../components/main/ChatIcon'
import { GrLocation } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { GetMyPageAxios } from "../../redux/modules/Data";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

const PlaceDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nickname = localStorage.getItem("nickname");
  const [detail, setDetail] = useState("");
  const { placePostId } = useParams();
  const [num,setnum] = React.useState(0)
  const token = localStorage.getItem('accessToken')
  const url = process.env.REACT_APP_URL;

  React.useEffect(() => {
    axios
      .get(`${url}/api/places/` + placePostId,token ?{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      } : null)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data.placeDetails);
      });
  }, []);

  const refetch = () =>{
    axios
    .get(`${url}/api/places/` + placePostId,token ?{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    } : null)
    .then((res) => {
      console.log(res.data);
      setDetail(res.data.placeDetails);
    });
  }





  const deletePlace = (e) => {
    Swal.fire({
      title: '게시글을 삭제하시겠습니까 ?',
      text: "삭제된 게시글은 복구가 불가능합니다",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ffb300',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/api/places/` + placePostId,
            { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } })
          .then((response) => {
            Swal.fire({
              text: `게시글 삭제가 완료되었습니다!`,
              icon: "success",
              confirmButtonText: "확인",
              confirmButtonColor: '#ffb300'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.replace("/place");
              }
            });

          })
          .catch((error) => {
            alert("게시글을 삭제할 권한이 없습니다.");
          });
      }
    })
  };


  if (!detail) {
    return <div></div>;
  }

  return (
    <>
      <Header />
      <Container>
        <div style={{
          width: "1100px",
          margin: "0 auto"
        }}>
          <Title>
            <div className="subject">
              장소 추천
            </div>
            <div className="page">
              <p>상세 보기</p>
            </div>
          </Title>
          <Box>
            <div className="Box">
              <div className="imgBox">
              <div className="Bigimg">
                <img src={detail.imageUrl[num]} alt="사진" />
              </div>
              <div className="imgSmall">
                {detail.imageUrl.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <img src={item} alt="사진" 
                      onClick={()=>{
                        setnum(idx)
                      }} />
                    </div>
                  );
                })}
              </div>
              </div>
              <ContentBox>
                {/* 카드 오른쪽 위 */}
                <div className="box_top">
                  <div className="title">
                    <span>
                    <h2>{detail.title}</h2>

                      <div className="star_icon">
                        <FaStar
                          size={28}
                          style={{
                            color: "#FFBA5A",
                            marginLeft: "5px",
                          }}
                          className="yellow_star"
                        />
                        <p>{detail.star}점</p>
                        
                        <span className={nickname !== detail.nickname ? "bookmarkpos" : "none"}>
                        {detail.bookmarkStatus === true ? (
                      <BsFillBookmarkFill
                      className={token ? "iconbook2" : "none"}
                        onClick={() => {
                          axios
                            .put(
                              `${url}/api/places/bookmark/` +
                              detail.placePostId,
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
                              console.log(res.data)
                              refetch()
                            });
                        }}
                      />
                    ) : (
                      <BsBookmark
                        className={token ? "iconbook" : "none"}
                        onClick={() => {
                          axios
                            .put(
                              `${url}/api/places/bookmark/` +
                              detail.placePostId,
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
                              console.log(res.data)
                              refetch()
                            });
                        }}
                      />
                    )}
































                        </span>
                        </div>

                    </span>

                    {nickname === detail.nickname ? (
                      <Btn>
                        <button className="btn"
                          style={{ marginRight: "-8px" }}
                          onClick={() => {
                            navigate(`/placeedit/` +
                              detail.placePostId);
                          }}
                        >
                          <img src={revise} alt="사진"/>
                        </button>
                        <button className="btn"
                          onClick={deletePlace}
                        >
                          <img src={img_delete} alt="사진"/>
                        </button>

                        {detail.bookmarkStatus === true ? (
                      <BsFillBookmarkFill
                        className={token ? "iconbook2" : "none"}
                        onClick={() => {
                          axios
                            .put(
                              `${url}/api/places/bookmark/` +
                              detail.placePostId,
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
                              console.log(res.data)
                              refetch()
                            });
                        }}
                      />
                    ) : (
                      <BsBookmark
                        className={token ? "iconbook" : "none"}
                        onClick={() => {
                          axios
                            .put(
                              `${url}/api/places/bookmark/` +
                              detail.placePostId,
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
                              console.log(res.data)
                              refetch()
                            });
                        }}
                      />
                    )}































                      </Btn>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* 카드 오른쪽 중간 */}
                  <div className="location">
                    <p>
                    <GrLocation
                      style={{
                        margin: "0px 3px 3px 4px"
                      }} />
                      {detail.region}
                    </p>
                  </div>
                  <div className="info">
                    <Image>
                      <div className="ProfileImg">
                        <img src={detail.profileUrl} alt="사진" 
                         onClick={() => {
                          navigate("/manager/" + detail.nickname);
                          dispatch(GetMyPageAxios(detail.nickname));
                        }}/>
                      </div>
                    </Image>
                    <p className="nickname"
                    onClick={() => {
                      navigate("/manager/" + detail.nickname);
                      dispatch(GetMyPageAxios(detail.nickname));
                    }}
                    >{detail.nickname}</p>
                  </div>
                </div>
                {/* 카드 내용 */}
                <div className="box">
                  <div className="content">
                    <p>{detail.content}</p>
                  </div>
                </div>
              </ContentBox>
            </div>
            <div className="mapbox">
              <KakaoMap />
            </div>
          </Box>
          <PlaceComment />
        </div>
      </Container>
      <ChatIcon />
      <Footer />
    </>
  );
};

const Title = styled.div`
  padding-top: 40px;

  .subject {
    color: #a8a8a8;
    margin-bottom: 2px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }

  .page {
    font-size: 30px;
    font-weight: 700;
  }

  p {
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;

  }

`;

const Box = styled.div`
width: 1100px;

background: white;

margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
margin-top: 25px;
margin-bottom: 32px;
display: flex;
flex-direction: column;

border: 1px solid #E4E4E4;
border-radius: 10px;

  .Box {
    display: flex;
  }



  .imgBox {
    width: 440px;
    display: flex;
    flex-direction: column;
  }

  .Bigimg {
    width: 400px;
    height: 300px;
    border-radius: 15px;
  }

  .Bigimg > img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    margin-left: 17px;
  }

  .imgSmall {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgSmall > div {
    border: 1px solid black;
    margin: 25px 10px;
    width: 120px;
    height: 120px;
    border-radius: 15px;
  }

  .bookmarkpos{
    margin-left: 20px;
    font-size: 30px;
  }

  .imgSmall > div > img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    cursor: pointer;
  }
  .none{
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  background-color: #F5F5F5;

  .Box {
    padding: 50px 50px 30px 50px;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .mapbox {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
    z-index: 0;
  }
`;

const ContentBox = styled.div`
  width: 500px;
  margin-left: 20px;

  .title {
    display: flex;
    font-weight: 700;
    font-size: 20px;
    line-height: 36px;

    h2 {
    margin-top: 2px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
    width: 500px;
    padding-bottom: 10px;
    }


    .star_icon {
      display: flex;
    }

    .yellow_star {
      margin-top: 3px;
    }

    p {
      color: #A8A8A8;
      margin-left: 8px;
      font-family: 'Nanum Gothic', sans-serif;
      display: flex;
    }
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
    margin: 7px;
  }

  .location {
    display: flex;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin: 10px 0px 4px 0px;

    img {
      width: 25px;
      margin-bottom: 5px;
      margin-right: 5px;
    }
  }

  .info {
    display: flex;
    align-items: center;

    p {
      margin-top: 25px;
      margin-left: 10px;
    }
  }

  .profile > img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .ProfileImg {
    border: 1px solid #E4E4E4;
  }

  .nickname {
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    line-height: 29px;
    margin-left: 30px;
    cursor: pointer;
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
  }

  .content {
    border: 2px solid #e4e4e4;
    border-radius: 10px;
    width: 500px;
    height: 220px;
    overflow: hidden;
    padding: 10px;
  }

  .content > p {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    width: 100%;
    height: 80%;
  }

  .content > div {
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

  .iconbook{
    width: 30px;
    height:30px;
    position: relative;
    top:3px;
    cursor: pointer;

  }

  .iconbook2{
    width: 30px;
    height:30px;
    position: relative;
    top:3px;
    cursor: pointer;
    color: #6b4e16;
  }

`;

const Image = styled.div`
  .ProfileImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 6px;
    cursor: pointer;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
`;

const Btn = styled.div`
  display: flex;
  position: absolute;
  padding-left: 416px;

  .btn {
    height: 20px;
    border-radius: 20px;
    border: 0;
    outline: 0;
  }

  img {
    width: 28px;
  }

  
`;

export default PlaceDetail;
