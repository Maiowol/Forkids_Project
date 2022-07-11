import React,{ useState } from 'react'
import styled from 'styled-components';
import Modal from 'react-modal';
import '../../shared/App.css'
import { BiLogOut } from "react-icons/bi";
import ScrollToBottom from "react-scroll-to-bottom";
import {useSelector} from "react-redux"
import io from "socket.io-client";
import { getCookie } from '../../shared/Cookie'
import axios from 'axios';
import { data } from 'autoprefixer';




const ChatRoom = ({open,onClose,NowRoom,socket,realroom}) => {
    const input_Ref = React.useRef()
    const nickname = getCookie('nickname')
    const [NowChat, setNowChat] = React.useState([]);
    const [realtime, setRealtime] = React.useState([]);
    const [room, setRoom] = React.useState();
    const imgurl = localStorage.getItem('img')
    console.log(NowRoom)

    React.useEffect(() => {

      socket.off('receive_message').on('receive_message',(data)=>{
      setNowChat((list) => [...list, data])
          console.log(NowChat)
     })
   },[]);




    const sendMessage = async() =>  {
        // if (currentMessage !== "") {
          const messageData = {
            profileUrl : imgurl,
            roomId: realroom,
            senderNick: nickname,
            message: input_Ref.current.value,
            time:
              new Date(Date.now()).getHours() + '시 ' +
              +
              new Date(Date.now()).getMinutes()+ '분',
          };
          await socket.emit("send_message", messageData);
          console.log(messageData)

        // }
      };


      const OutRoom = () =>{
        socket.emit("back",realroom)
        onClose()
        setNowChat([])
      }



    if(!open) return null
  return (
    <Modal isOpen={true} className="ChatList">
    <div className='RoomOne'>
        <div className='RoomFake'>
          <div className='me'><div className='who'>나</div>  <div className='circlePosition'><div className='circle'></div></div> </div>
          <div className='you'><div className='who'>상대</div><div className='circlePosition'><div className='circle2'></div></div></div>
        </div>
        <div className='RoomDate'> 2022년 06월 30일 목요일</div>
    <button onClick={OutRoom}><BiLogOut className='icon' ></BiLogOut></button>
    </div>





    <ScrollToBottom className='message-containerTwo'>
    <div className='RoomChatList animate__animated animate__zoomIn'>
        {NowRoom&&NowRoom.map((data,idx)=>{
            return(
              <div className='RoomChat' key={idx}>
              <div className='RoomImg'>
              <div className='RoomProfile'>
                  {/* 사진 */}
              </div>
              </div>
              <div className='RoomContent'>
                  <div className={nickname === data.senderNick ? 'RoomName' :'RoomNameX'}>{data.senderNick}</div>
                  <div className={nickname === data.senderNick ? 'ChatRoomInput' :'ChatRoomInputX'}>{data.message}</div>
              </div>
              <div className='RoomTime'>{data.time}</div>
              </div>
            )
        })}


        {NowChat&&NowChat.map((data,idx)=>{
          return(
            <div className='RoomChat' key={idx}>
            <div className='RoomImg'>
            <div className='RoomProfile'>
                {/* 사진 */}
            </div>
            </div>
            <div className='RoomContent'>
                <div className={nickname === data.senderNick ? 'RoomName' :'RoomNameX'}>{data.senderNick}</div>
                <div className={nickname === data.senderNick ? 'ChatRoomInput' :'ChatRoomInputX'}>{data.message}</div>
            </div>
            <div className='RoomTime'>{data.time}</div>
            </div>
        )
        })}


    

    </div>
    </ScrollToBottom>

    <div className='RoomSend'>
        <input type="text" className='RoomInput' ref={input_Ref}/>
        <button onClick={sendMessage}>보내기</button>
    </div>







     </Modal>
  )
}

export default ChatRoom

