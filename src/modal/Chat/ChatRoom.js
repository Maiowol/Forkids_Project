import React from "react";
import Modal from "react-modal";
import "../../shared/App.css";
import { BiLogOut } from "react-icons/bi";
import ScrollToBottom from "react-scroll-to-bottom";
import { getCookie } from "../../shared/Cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const ChatRoom = ({ open, onClose, NowRoom, socket, realroom, ChatList }) => {
  const input_Ref = React.useRef();
  const nickname = getCookie("nickname");
  const [NowChat, setNowChat] = React.useState([]);
  const [currentMessage, setCurrentMessage] = React.useState("");
  const Img_Url = localStorage.getItem("img");

  console.log(ChatList);

  const user = ChatList.map((data, idx) => {
    return data.postNickname;
  });

  console.log(user);

  const realuser = user.join();

  console.log(realuser);

  const testnick = ChatList.map((data, idx) => {
    return data.nickname;
  });

  const testname = testnick.join();

  console.log(testname);

  React.useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setNowChat((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        receiverNick: realuser === nickname ? testname : realuser,
        profileUrl: Img_Url,
        roomId: realroom,
        senderNick: nickname, // 보내는 사람
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          "시 " +
          +new Date(Date.now()).getMinutes() +
          "분",
      };
      await socket.emit("send_message", messageData);
      console.log(messageData);
      setCurrentMessage("");
    }
  };

  const OutRoom = () => {
    socket.emit("back", realroom);
    onClose();
    setNowChat([]);
  };

  if (!open) return null;
  return (
    <>
      <Modal isOpen={true} className="ChatList">
        <div className="RoomOne">
          <div className="RoomFake">
            <div className="me">
              <div className="who">나</div>
              <div className="circlePosition">
                <div className="circle"></div>
              </div>
            </div>
            <div className="you">
              <div className="who">상대</div>
              <div className="circlePosition">
                <div className="circle2"></div>
              </div>
            </div>
          </div>
          <div className="RoomDate"></div>
          <button onClick={OutRoom}>
            <BiLogOut className="icon"></BiLogOut>
          </button>
        </div>

        <ScrollToBottom className="message-containerTwo">
          <div className="RoomChatList animate__animated animate__zoomIn">
            {NowRoom &&
              NowRoom.map((data, idx) => {
                return (
                  <div className="RoomChat" key={idx}>
                    <div className="RoomImg">
                      <div className="RoomProfile">
                        <img src={data.profileUrl} alt="사진" />
                      </div>
                    </div>
                    <div className="RoomContent">
                      <div
                        className={
                          nickname === data.senderNick
                            ? "RoomName"
                            : "RoomNameX"
                        }
                      >
                        {data.senderNick}
                      </div>
                      <div
                        className={
                          nickname === data.senderNick
                            ? "ChatRoomInput"
                            : "ChatRoomInputX"
                        }
                      >
                        {data.message}
                      </div>
                    </div>
                    <div className="RoomTime">{data.time}</div>
                  </div>
                );
              })}

            {NowChat &&
              NowChat.map((data, idx) => {
                return (
                  <div className="RoomChat" key={idx}>
                    <div className="RoomImg">
                      <div className="RoomProfile">
                        <img src={data.profileUrl} alt="사진" />
                      </div>
                    </div>
                    <div className="RoomContent">
                      <div
                        className={
                          nickname === data.senderNick
                            ? "RoomName"
                            : "RoomNameX"
                        }
                      >
                        {data.senderNick}
                      </div>
                      <div
                        className={
                          nickname === data.senderNick
                            ? "ChatRoomInput"
                            : "ChatRoomInputX"
                        }
                      >
                        {data.message}
                      </div>
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
    </>
  );
};

export default ChatRoom;
