import React from "react";
import Modal from "react-modal";
import "../../shared/App.css";
import { BiLogOut } from "react-icons/bi";
import ScrollToBottom from "react-scroll-to-bottom";
import back from '../../images/back.png'

const OneToOneChat = ({ open, onClose, socket ,data}) => {
  const [currentMessage, setCurrentMessage] = React.useState("");
  const input_Ref = React.useRef();
  const nickname = localStorage.getItem("nickname");
  const [NowChat, setNowChat] = React.useState([]);
  const [roomId, setRoomId] = React.useState();
  const Img_Url = localStorage.getItem("profileUrl");

  console.log(data)

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        roomId: roomId.roomId,
        receiverNick: roomId.receiverNick,
        profileUrl: Img_Url,
        profileUrlTwo: roomId.profileUrlTwo,
        senderNick: nickname,
        message: input_Ref.current.value,
        time:
          new Date(Date.now()).getHours() +
          "시 " +
          +new Date(Date.now()).getMinutes() +
          "분",
          postTitle : data.title,
      };

      await socket.emit("send_message", messageData);

      setCurrentMessage("");
    }
  };

  React.useEffect(() => {
    socket.on("test", (data) => {
      setRoomId(data);
    });
  }, [socket]);

  React.useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setNowChat((list) => [...list, data]);
    });
  }, []);

  if (!open) return null;
  return (
    <Modal isOpen={true} className="ChatList">
    <div className="ChatListBoxTwo animate__animated animate__fadeIn">
    <img src = {back} alt="닫기" className="x" onClick={onClose}/>
    <span className="twoToOne"> {data.title}</span>
  </div>

      <ScrollToBottom className="message-containerTwo animate__animated animate__fadeIn">
        {NowChat&& NowChat.map((data,idx)=>{
          return  nickname === data.senderNick ? (
            <div key={idx}>
            <div className="MyChat">
              <div className="MyTime">{data.time}</div>
              <div className="MyContent">
              <span>{data.message}</span>
              </div>
            </div>
            </div>
          )            
          : 
          <div>
          <div>
            <img src={data.profileUrl} alt="사진" className="youProfile"/>
            <span className="youNickname">{data.senderNick}</span>
          </div>
          <div className="youChat">
            <div className="youContent">
            <span>{data.message}</span>
            </div>
            <div className="youTime">{data.time}</div>
          </div>
          </div>
  })}

      </ScrollToBottom>

      <div className="SendChat animate__animated animate__fadeIn">
          <input type="text"  ref={input_Ref}
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}/>
          <button onClick={sendMessage}>보내기</button>
        </div>
    </Modal>
  );
};

Modal.setAppElement("#root");
export default OneToOneChat;
