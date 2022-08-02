import React from "react";
import styled from "styled-components";
import chat from "../../images/chatlist.png";
import io from "socket.io-client";
import { toast } from "react-toastify";
import ChatListModal from "../../modal/Chat/ChatListModal";

const url = process.env.REACT_APP_URL;

// 소켓서버 연결
const socket = io.connect(`${url}`);
const ChatIcon = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [notify, setNotify] = React.useState([]);
  const nickname = localStorage.getItem("nickname");
  const token = localStorage.getItem("accessToken");

  // 상대방이 보낸 메시지를 알림 이벤트 경로로 데이터를 받음
  React.useEffect(() => {
    socket.off("notify").on("notify", (data) => {
      console.log(data);
      if (nickname === data.senderNick) {
        return null;
      } else if (nickname !== data.receiverNick) {
        return null;
      } else {
        toast.success(`${data.senderNick}님이 메시지를 보냈습니다`, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          newestOnTop: true,
          rtl: true,
          limit: 2,
        });
        setNotify((list) => [...list, data]);
        localStorage.setItem("count", data.message);
      }
    });
  }, []);

  const messageBtn = () => {
    setModalIsOpen(!modalIsOpen);
    localStorage.removeItem("count");
    setNotify([]);
  };

  return (
    <>
      <Box>
        <div className={token ? "chatIconBox" : "none"} onClick={messageBtn}>
          <span className="ChatBox">채팅 목록</span>
          <span>
            <img src={chat} alt="채팅" className="chatImg" />
          </span>
        </div>
      </Box>
      <ChatListModal open={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </>
  );
};

const Box = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  padding: 20px;
  z-index: 1;

  .chatImg {
    width: 30px;
    height: 30px;
    color: #f4b03e;
  }

  .chatIconBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 156px;
    height: 70px;
    background: #ffffff;
    border: 3px solid #f4b03e;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    cursor: pointer;
  }

  .ChatBox {
    width: 81px;
    height: 23px;
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    color: #f4b03e;
    margin-right: 5px;
  }

  .none {
    display: none;
  }
`;

export default ChatIcon;
