import React, { useState } from "react";
import Modal from "react-modal";
import "../../shared/App.css";
import logo from "../../images/logo.png";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatRoom from "./ChatRoom";
import "animate.css";
import { getCookie } from "../../shared/Cookie";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import io from "socket.io-client";

const socket = io.connect("http://13.125.241.180");

const ChatListModal = ({ open, onClose }) => {
  const MyNickname = getCookie("nickname");
  const nickname = getCookie("nickname");
  const [ChatList, setChatList] = React.useState("");
  const [NowRoom, setNowRoom] = React.useState([]);
  const [realroom, setrealroom] = React.useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(ChatList);

  React.useEffect(() => {
    axios
      .get("http://13.125.241.180/api/chats/rooms", {
        headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
      })
      .then((res) => {
        console.log(res);
        setChatList(res.data.chatRoomList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!open) return null;

  return (
    <Modal
      isOpen={true}
      className="ChatList animate__animated animate__backInUp"
    >
      <div className="One">
        <span className="ChatLogo">
          <img src={logo} alt="로고" />
        </span>
        <span className="ChatTitle">{nickname}님의 채팅내역</span>
        <button onClick={onClose}>X</button>
      </div>

      {/* 대화창 리스트 */}

      <ScrollToBottom className="message-container">
        <div className="ChatListContainer">
          {ChatList &&
            ChatList.map((data, idx) => {
              return (
                <div
                  className="List"
                  key={idx}
                  onClick={() => {
                    setModalIsOpen(true);
                    const Joindata = {
                      roomId: data.roomId,
                      senderNick: data.nickname,
                      receiverNick: data.postNickname,
                      profileUrlTwo: data.profileUrl,
                    };
                    socket.emit("join_room", Joindata);
                    axios
                      .get(
                        "http://13.125.241.180/api/chats/messages/" +
                          data.roomId,
                        {
                          headers: {
                            Authorization: `Bearer ${getCookie("accessToken")}`,
                          },
                        }
                      )
                      .then((res) => {
                        console.log(res);
                        setNowRoom(res.data.chatMessageList);
                        setrealroom(data.roomId);
                      });
                  }}
                >
                  <div className="ChatImg">
                    <div className="ChatImgOne">
                      <img src={data.profileUrl} alt="사진" />
                    </div>
                  </div>
                  <div className="ChatInfo">
                    <div className="ChatName">
                      {MyNickname === nickname
                        ? data.nickname
                        : data.postNickname}
                    </div>

                    <div className="ChatContent">{data.postTitle}</div>
                    <div className="ChatDate">{data.time}</div>
                  </div>
                  <div className="ChatBell">
                    <span>
                      <BsTrash className="Trash"></BsTrash>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </ScrollToBottom>

      <ChatRoom
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        NowRoom={NowRoom}
        socket={socket}
        ChatList={ChatList}
        realroom={realroom}
      />
    </Modal>
  );
};

Modal.setAppElement("#root");
export default ChatListModal;
