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


const OneToOneChat = ({open,onClose,socket}) => {
    const input_Ref = React.useRef()
    const nickname = getCookie('nickname')
    const [NowChat, setNowChat] = React.useState([]);
    const [roomId, setRoomId] = React.useState();
    const [realtime,setRealtime] = React.useState()


    const sendMessage = async () => {
      // if (currentMessage !== "") {
        const messageData = {
          roomId: roomId,
          senderNick: nickname,
          nickname : nickname,
          message: input_Ref.current.value,
          time:
          new Date(Date.now()).getHours() + '시 ' +
          +
          new Date(Date.now()).getMinutes()+ '분',
        };
        
        await socket.emit("send_message", messageData);
        // setNowChat((list)=>[...list,messageData]);
        console.log(messageData)
      // }
    };


    React.useEffect(() => {
    socket.on("test", (data) => {
      console.log(data)
      setRoomId(data);
    },); 
    },[socket]);


    React.useEffect(() => {

      socket.off('receive_message').on('receive_message',(data)=>{
      setNowChat((list) => [...list, data])
          console.log(data )
     })
   },[]);




















    if(!open) return null
  return (
    <Modal isOpen={true} className="ChatList">
    <div className='RoomOne'>
        <div className='RoomFake'></div>
        <div className='RoomDate'> 2022년 06월 30일 목요일</div>
    <button onClick={onClose}><BiLogOut className='icon'></BiLogOut></button>
    </div>





    <ScrollToBottom className='message-containerTwo'>
    <div className='RoomChatList animate__animated animate__zoomIn'>
        {NowChat&& NowChat.map((data,idx)=>{
          return(
            <div className='RoomChat' key={idx}>
            <div className='RoomImg'>
            <div className='RoomProfile'>
                {/* 사진 */}
            </div>
            </div>
            <div className='RoomContent'>
                <div className='RoomName'>{data.senderNick}</div>
                <div className='ChatRoomInput'>{data.message}</div>
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

Modal.setAppElement('#root')
export default OneToOneChat

