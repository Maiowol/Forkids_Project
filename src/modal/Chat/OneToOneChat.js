import React from "react";
import Modal from "react-modal";
import "../../shared/App.css";
import { BiLogOut } from "react-icons/bi";
import ScrollToBottom from "react-scroll-to-bottom";
import { getCookie } from "../../shared/Cookie";

const OneToOneChat = ({ open, onClose, socket }) => {
  const [currentMessage, setCurrentMessage] = React.useState("");
  const input_Ref = React.useRef();
  const nickname = getCookie("nickname");
  const [NowChat, setNowChat] = React.useState([]);
  const [roomId, setRoomId] = React.useState();
  const Img_Url = localStorage.getItem("img");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        roomId: roomId,
        profileUrl: Img_Url,
        senderNick: nickname,
        message: input_Ref.current.value,
        time:
          new Date(Date.now()).getHours() +
          "시 " +
          +new Date(Date.now()).getMinutes() +
          "분",
      };

      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  React.useEffect(() => {
    socket.on("test", (data) => {
      console.log(data);
      setRoomId(data);
    });
  }, [socket]);

  React.useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setNowChat((list) => [...list, data]);
      console.log(data);
    });
  }, []);

  if (!open) return null;
  return (
    <Modal isOpen={true} className="ChatList">
      <div className="RoomOne">
        <div className="RoomFake"></div>
        <div className="RoomDate"> 2022년 06월 30일 목요일</div>
        <button onClick={onClose}>
          <BiLogOut className="icon"></BiLogOut>
        </button>
      </div>

      <ScrollToBottom className="message-containerTwo">
        <div className="RoomChatList animate__animated animate__zoomIn">
          {NowChat &&
            NowChat.map((data, idx) => {
              return nickname === data.senderNick ? (
                <div className="RoomChat" key={idx}>
                  <div className="RoomTime">{data.time}</div>
                  <div className="RoomContent">
                    <div className="RoomNameX">{data.senderNick}</div>
                    <div className="ChatRoomInputX">{data.message}</div>
                  </div>
                  <div className="RoomImg">
                    <div className="RoomProfile">
                      <img src={data.profileUrl} alt="사진" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="RoomChat" key={idx}>
                  <div className="RoomImg">
                    <div className="RoomProfile">
                      <img src={data.profileUrl} alt="사진" />
                    </div>
                  </div>
                  <div className="RoomContent">
                    <div className="RoomName">{data.senderNick}</div>
                    <div className="ChatRoomInput">{data.message}</div>
                  </div>
                  <div className="RoomTime">{data.time}</div>
                </div>
              );
            })}
        </div>
      </ScrollToBottom>

      <div className="RoomSend">
        <input
          type="text"
          className="RoomInput"
          ref={input_Ref}
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>보내기</button>
      </div>
    </Modal>
  );
};

Modal.setAppElement("#root");
export default OneToOneChat;
