//체험 모집 상세 페이지
import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/main/Header";
import OneToOneChat from "../../modal/Chat/OneToOneChat";
import Footer from "../../components/main/Footer";
import RecruitComment from "../../components/pages/RecruitComment";
import ChatIcon from '../../components/main/ChatIcon';
import chatlist from '../../images/chatlist.png';
import revise from '../../images/revise.png';
import img_delete from '../../images/delete (1).png'
import axios from "axios";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailPostDB, deletePostDB } from "../../redux/modules/post";
import { GetMyPageAxios } from "../../redux/modules/Data";
import Swal from "sweetalert2";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

const url = process.env.REACT_APP_URL;

const socket = io.connect(`${url}`); // 1 . 소켓 서버 연결

const RecruitDetail = () => {
  const nickname = localStorage.getItem("nickname");
  const token = localStorage.getItem('accessToken')
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달창 열고 닫는 State 값
  const [on, setOn] = useState(false); // 상세 페이지의 모집 중/모집 완료 토글 버튼 State 값
  const [state, setState] = useState("");
  const { recruitPostId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data,setdata] = useState()

  React.useEffect(() => {
    axios
      .get(`${url}/api/recruits/` + recruitPostId,token ?{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      } : null)
      .then((response) => {
        console.log(response.data)
        setState(response.data.recruitDetails);
      })
      .catch((response) => {
        // console.log(response);
      });
  }, []);




  const refetch = () =>{
    axios
      .get(`${url}/api/recruits/` + recruitPostId,token ?{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      } : null)
      .then((response) => {
        console.log(response.data)
        setState(response.data.recruitDetails);
      })
      .catch((response) => {
        // console.log(response);
      });
  }

  // React.useEffect(() => {
  //   dispatch(detailPostDB(recruitPostId));
  // }, []);






  // 모집중 , 모집완료 상태 변경하기
  const inputChange = () => {
    setOn(!on);
  };

  // const detail = useSelector((state) => state.post.list);

  // console.log(detail);



  // const deletePosting = () => {
  //   dispatch(deletePostDB(recruitPostId, navigate));
  // };

  // 1:1 문의하기 버튼 눌렀을 때 채팅방 생성 + 채팅방 입장하기
  const GoChat = () => {
    axios
      .post(`${url}/api/chats/rooms/` + recruitPostId, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((res) => {
        const JoinData = {
          roomId: res.data.roomId,
          receiverNick: state.nickname,
          senderNick: nickname,
          profileUrlTwo: state.profileUrl,
          title : state.title
        };
        setdata(JoinData)
        socket.emit("join_room", JoinData);
        setModalIsOpen(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  console.log(data)



  const deletePosting = () => {
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
          .delete(`${url}/api/recruits/` + recruitPostId,
            { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } })
          .then((response) => {
            Swal.fire({
              text: `게시글 삭제가 완료되었습니다!`,
              icon: "success",
              confirmButtonText: "확인",
              confirmButtonColor: '#ffb300'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.replace("/recruit");
              }
            });

          })
          .catch((error) => {
            alert("게시글을 삭제할 권한이 없습니다.");
          });
      }
    })
  };

  return (
    <>
      <Header />
      <BackGround>
        <div style={{
          width: "1100px",
          margin: "0 auto"
        }}>
          <Title>
            <div className="subject">체험 모집</div>
            <div className="page">
              <p>상세 보기</p>
            </div>
          </Title>
          <Detail>
            <Box>

              {/* 카드 왼쪽: 모집 토글, 제목, 날짜, 시간 등*/}
              <div className="container">
                <div className="card-left">
                  <div className="toggle">
                     {state.status ? <div>모집완료</div>: <p>모집중</p>} 
                  </div>
                  <div>
                    <strong> 제목 </strong>
                    <span>{state.title}</span>
                  </div>
                  <div>
                    <strong> 날짜 </strong>
                    <span>{state.date}</span>
                  </div>
                  <div>
                    <strong> 시간 </strong>
                    <span>{state.time}</span>
                  </div>
                  <div>
                    <strong> 위치 </strong>
                    <span>{state.place}</span>
                  </div>
                  <div>
                    <strong> 연령 </strong>
                    <span>{state.age}</span>
                  </div>
                </div>

                {/* 카드 오른쪽: 작성자 프로필, 버튼, 내용 */}
                <div className="card-right">

                  <div className="card-top">
                    {nickname === state.nickname ? (
                      <>
                        <Btn>
                          <button className="btn"
                            style={{ marginRight: "-8px" }}
                            onClick={() => {
                              navigate(`/recruitedit/` + state.recruitPostId);
                            }}>
                            <img src={revise} />
                          </button>

                          <button className="btn"
                            onClick={deletePosting}>
                            <img src={img_delete} />
                          </button>

                          {state.bookmarkStatus === true ? (
                      <BsFillBookmarkFill
                        className={token ? "iconbook2" : "none"}
                        onClick={() => {
                          axios
                            .put(
                              `${url}/api/recruits/bookmark/` +
                              state.recruitPostId,
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
                              `${url}/api/recruits/bookmark/` +
                              state.recruitPostId,
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

                        <div className="profile">
                          <div className="detail_profile">
                            <img
                              src={state.profileUrl}
                              alt="프로필"
                              onClick={() => {
                                navigate("/manager/" + state.nickname);
                                dispatch(GetMyPageAxios(state.nickname));
                              }}
                            />
                          </div>
                          <div className="detail_username">
                            <div className="username">{state.nickname}</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="profile">
                          <div className="detail_profile">
                            <img
                              src={state.profileUrl}
                              alt="프로필"
                              onClick={() => {
                                navigate("/manager/" + state.nickname);
                                dispatch(GetMyPageAxios(state.nickname));
                              }}
                            />
                          </div>
                          <div className="detail_username">
                            <div className="username">{state.nickname}</div>
                          </div>

                          <BtnTwo>
                            <button className="btnchat" onClick={GoChat}>
                              <img src={chatlist} />
                              1:1 채팅
                            </button>
                            
                            {state.bookmarkStatus === true ? (
                      <BsFillBookmarkFill
                        className={token ? "iconbook2" : "none"}
                        onClick={() => {
                          axios
                            .put(
                              `${url}/api/recruits/bookmark/` +
                              state.recruitPostId,
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
                              `${url}/api/recruits/bookmark/` +
                              state.recruitPostId,
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

























                          </BtnTwo>

                        </div>

                      </>
                    )}
                  </div>
                  <div className="content">
                    {state.content}
                  </div>
                </div>
              </div>
            </Box>
            <RecruitComment />
          </Detail>
        </div>
      </BackGround>
      <OneToOneChat
        open={modalIsOpen} // 모달창 열기
        onClose={() => setModalIsOpen(false)} // 모달창 닫기
        socket={socket}
        data={data}
      />
      <ChatIcon />
      <Footer />
    </>
  );
};

const BackGround = styled.div`
font-family: "Nanum Gothic";
background: #F5F5F5;
`;

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

    p {
      font-family: 'Nanum Gothic', sans-serif;
      font-weight: 700;
    }
  }
`;

const Detail = styled.div`
  .container {
    display: flex;
  }

  .toggle {
    display: flex;
    margin-left: 20px;
    height: 100px;

    justify-content: space-between;
  }
  
  .toggle > p {
    margin: 20px 0px 0px 30px;
    width: 114px;
    height: 28px;
    background: #F4B03E;
    border: 1px solid #F4B03E;
    border-radius: 20px;
    color: #FFFFFF;
    font-style: normal;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }



  .iconbook{
    width: 30px;
    height:30px;
    cursor: pointer;

  }

  .iconbook2{
    width: 30px;
    height:30px;
    cursor: pointer;
    color: #6b4e16;
  }






  .toggle > div {
    width: 114px;
    height: 28px;
    background-color: #a8a8a8;
    border: 1px solid #a8a8a8;
    border-radius: 20px;
    color: #FFFFFF;
    font-style: normal;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }

  .card-left {
    width: 600px;
    height: 570px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 25px;
  }

  .card-left > div {
    margin: 40px 0px 0px 50px;
    font-size: 20px;
    
    strong{
      font-family: 'Nanum Gothic', sans-serif;
      font-weight: 700;
    }
  }

  .card-left > div > span {
    border: 1px solid #A8A8A8;
    display: inline-block;
    width: 365px;
    padding: 10px;
    margin-left: 30px;
    border-radius: 10px;
  }

  .inputbox {
    position: absolute;
    left: -1000%;
  }

  label {
    margin-top: 16px;
    position: relative;
    display: block;
    width: 80px;
    height: 35px;
    background: #a58646;
    border-radius: 60px;
    transition: background 0.4s;
  }

  label:after {
    content: "";
    position: absolute;
    left: 0px;
    top: 48%;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: #fff;
    transform: translateY(-50%);
    box-shadow: 1px 3px 4px rgba(0, 0, 0.1);
    transition: all 0.4s;
  }

  input:checked + label:after {
    left: calc(100% - 40.5px);
  }
  input:checked + label {
    background-color: #6b4e16;
  }

  label span {
    display: none;
  }

  .none{
    display: none;
  }
  .card-right {
    width: 50%;
    margin-left: 30px;
  }

  .card-top {
    margin: 99px 0px 0px 10px;
    width: 100%;
  }

  .card-top p {
    display: flex;
    color: gray;
  }

  .profile {
    display: flex;
  }

  .detail_profile > img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-left: 10px;
    cursor: pointer;
    border: 1px solid #E4E4E4;
  }

  .detail_profile {
    border-radius: 50%;
    /* display:flex; */
    align-items: center;
    display: block;
    justify-content: center;
  }

  .username {
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-left: 20px;
    padding-right: 10px;
    width: 90px;
    font-size: 20px;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: 700;
  }

  .content {
    width: 490px;
    height: 390px;
    border: 1px solid #A8A8A8;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 400;
    margin-top: 20px;
    word-break: normal;
    padding: 20px;
    overflow: hidden;
  }
`;

const Box = styled.div`
width: 1100px;
height: 680px;

background: white;

margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
margin-top: 27px;
margin-bottom: 32px;
display: flex;
flex-direction: column;

border: 1px solid lightgray;
border-radius: 10px;
`;

const Btn = styled.div`
  display: flex;
  margin-left: 398px;
  margin-right: 100px;
  width:500px;
  position: relative;
  right:50px;

  .iconbook{
    width: 30px;
    height:30px;
    position: relative;
    top:7px;
    cursor: pointer;
  }

  .iconbook2{
    width: 30px;
    height:30px;
    position: relative;
    top:7px;
    cursor: pointer;
    color: #6b4e16;
  }

  .btn {
    height: 30px;
    padding-top: 9px;
    padding-bottom: 33px;
    border: 0;
    outline: 0;  

    img {
      width: 28px;
    }
  }
`;

const BtnTwo = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-top: 6px;

  img {
    margin-right: 6px;
  }

  .btnchat {
    width: 129px;
    height: 30px;
    border-radius: 30px;
    color: #A8A8A8;
    padding-top: 9px;
    padding-bottom: 35px;
    border: 1.5px solid #F4B03E;
    outline: 0;
    font-weight: bolder;
    margin-right: 30px;
    background-color: #fff;
  }


`;

export default RecruitDetail;
