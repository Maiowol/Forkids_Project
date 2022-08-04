import React from "react";
import Modal from "react-modal";
import "../../shared/App.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import back from '../../images/back.png'
import axios from 'axios'


toast.configure();
const ChatRoom = ({ open, onClose, NowRoom, socket, realroom,post }) => {
  const input_Ref = React.useRef();
  const nickname = localStorage.getItem("nickname");
  const [NowChat, setNowChat] = React.useState([]);
  const [currentMessage, setCurrentMessage] = React.useState("");
  const Img_Url = localStorage.getItem("profileUrl");
  const [info, setinfo] = React.useState();
  const url = process.env.REACT_APP_URL;



  React.useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setNowChat((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        receiverNick:
          info.receiverNick === nickname ? info.senderNick : info.receiverNick,
        profileUrl: Img_Url, // ME
        profileUrlTwo: info.profileUrlTwo,  // YOU
        roomId: realroom,
        senderNick: nickname, // 보내는 사람
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          "시 " +
          +new Date(Date.now()).getMinutes() +
          "분",
          postTitle: post,
      };
      await socket.emit("send_message", messageData);
      console.log(messageData)
      setCurrentMessage("");
    }
  };

  const OutRoom = () => {
    socket.emit("back", realroom);
    onClose();
    setNowChat([]);
  };

  const refetch = () =>{
    axios.get(`${url}/api/chats/rooms`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
  }

  React.useEffect(() => {
    socket.on("test", (data) => {
      console.log(data)
      setinfo(data);
    });
  }, [socket]);

  if (!open) return null;
  return (
    <>
      <Modal isOpen={true} className="ChatList">
          <div className="ChatListBoxTwo animate__animated animate__fadeIn">
          <img src = {back} alt="닫기" className="x" onClick={OutRoom}/>
          <span className="twoToOne"> {post}</span>
        </div>

        <ScrollToBottom className="message-containerTwo animate__animated animate__fadeIn" >
        {NowRoom && NowRoom.map((data)=>{
          return  nickname === data.senderNick ? (
            <div key={data._id}>
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
        }) }

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
    </>
  );
};

export default ChatRoom;
