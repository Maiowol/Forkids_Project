import React, { useState } from "react";
import Modal from "react-modal";
import "../../shared/App.css";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatRoom from "./ChatRoom";
import "animate.css";
import io from "socket.io-client";
import cancel from '../../images/cancel.png'
import axios from "axios";
import {useQuery} from 'react-query'
import { BsTrashFill } from "react-icons/bs";
import Swal from 'sweetalert2'

const url = process.env.REACT_APP_URL;

const socket = io.connect(`${url}`);

const ChatListModal = ({ open, onClose }) => {
  const nickname = localStorage.getItem("nickname");
  const [ChatList, setChatList] = React.useState("");
  const [NowRoom, setNowRoom] = React.useState([]);
  const [realroom, setrealroom] = React.useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const profileUrl = localStorage.getItem("profileUrl");
  const token = localStorage.getItem("accessToken");
  const [post,setpost] = React.useState('')

  const fetchSuperHeros = () =>{
    return axios.get(`${url}/api/chats/rooms`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
  }
  // modal이라 웹페이지 시작점부터 get 되서 isLoading 처리 안해도 됌
  const {isLoading , data, isError,error } = useQuery('Chat-List',fetchSuperHeros)


  if(isError){
    // return <h2>{error.message}</h2>
    // console.log(error)
    // alert('로그인 후 사용해 주세요')
    // Swal.fire({
    //   text: `프로필 수정이 완료되었습니다.`,
    //   icon: "success",
    //   confirmButtonText: "확인", 
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     navigate("/manager/" + nickname);
    //     localStorage.setItem("profileUrl", res.data.profileUrl);
    //   }
    // })
  }












  if (!open) return null;

  return (
    <Modal isOpen={true} className="ChatList animate__animated animate__fadeIn animate__slow">
        <div className="ChatListBox">
          <span className="OneToOne">1:1 채팅 목록</span>
          <img src = {cancel} alt="닫기" className="cancel" onClick={onClose}/>
        </div>


      {/* 대화창 리스트 */}
      <ScrollToBottom className="message-container" mode="top">
        {data.data.lastChats&& data.data.lastChats.map((data,idx)=>{
          return(
            data != null &&
            <div className="listC animate__animated animate__fadeInDown animate__fast" key={idx}>
            <div className="ChatListContainer">
              <div className="firstBox" onClick={() => {
                      setModalIsOpen(true);
                      const Joindata = {
                        roomId: data.roomId,
                        senderNick: data.senderNick,
                        receiverNick: data.receiverNick,
                        profileUrlTwo: nickname === data.senderNick ? data.profileUrlTwo : data.profileUrl
                      };
                      socket.emit("join_room", Joindata);
                      axios
                        .get(
                          `${url}/api/chats/messages/` +
                            data.roomId,
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                              }
                            })
                        .then((res) => {
                          console.log(res);
                          setNowRoom(res.data.chatMessageList);
                          setrealroom(data.roomId);
                        });
                    }}  >
                <img src={profileUrl === data.profileUrl ? data.profileUrlTwo: data.profileUrl} alt="사진" />
              </div>
    
              <div className="SecondBox" onClick={() => {
                      setModalIsOpen(true);
                      const Joindata = {
                        roomId: data.roomId,
                        senderNick: data.senderNick,
                        receiverNick: data.receiverNick,
                        profileUrlTwo: nickname === data.senderNick ? data.profileUrlTwo : data.profileUrl
                      };
                      socket.emit("join_room", Joindata);
                      axios
                        .get(
                          `${url}/api/chats/messages/` +
                            data.roomId,
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                              }
                            })
                        .then((res) => {
                          setpost(res.data.titleRoom)
                          setNowRoom(res.data.chatMessageList);
                          setrealroom(data.roomId);
                        });
                    }} >
                <div className="ChatTitle"> {data.postTitle}</div>
                <div className="ChatName">{data.receiverNick === nickname ? data.senderNick:data.receiverNick}</div>
                <div className="ChatContent">{data.message.length > 27 ? data.message.slice(0,27) + '...' : data.message}</div>
              </div>
    
    
              <div className="ThirdBox" onClick={() => {
                      setModalIsOpen(true);
                      const Joindata = {
                        roomId: data.roomId,
                        senderNick: data.senderNick,
                        receiverNick: data.receiverNick,
                        profileUrlTwo: nickname === data.senderNick ? data.profileUrlTwo : data.profileUrl
                      };
                      socket.emit("join_room", Joindata);
                      axios
                        .get(
                          `${url}/api/chats/messages/` +
                            data.roomId,
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                              }
                            })
                        .then((res) => {
                          console.log(res);
                          setNowRoom(res.data.chatMessageList);
                          setrealroom(data.roomId);
                        });
                    }} >
              <div className="ChatTime"> {data.time}</div>
              </div>
              <div className="fourBox">
              <div className="ChatDel">
                <BsTrashFill onClick={()=>{

                  axios
                  .put(`${url}/api/chats/rooms/` + data.roomId,null,{
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((res)=>{
                    alert('삭제되었습니다')
                  }).catch((err)=>{
                    console.log(err)
                  })
                }}  className="Trash"/>
              </div>
              </div>
            </div>
            </div>
          )
        })}
      </ScrollToBottom>
      <ChatRoom
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        NowRoom={NowRoom}
        socket={socket}
        realroom={realroom}
        post={post}
      />
    </Modal>
  );
};


Modal.setAppElement("#root");
export default ChatListModal;