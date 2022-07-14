import React, { useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import io from "socket.io-client";
import OneToOneChat from '../../modal/Chat/OneToOneChat';
import Header from '../../components/main/Header'
import dog from '../../images/dog.jpg'
import { getCookie } from "../../shared/Cookie";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Comment from '../../components/elements/Comment';
import { useSelector, useDispatch } from 'react-redux';
import {
    detailPostDB,
    deletePostDB
} from '../../redux/modules/post';
import { MdOutlinePlace } from "react-icons/md";
import Grid from '../../components/elements/Grid';

const socket = io.connect("http://13.125.241.180")  // 1 . 소켓 서버 연결


const RecruitDetail = () => {
    const nickname = getCookie('nickname')
    const token = getCookie('accessToken')
    console.log(nickname)

    const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달창 열고 닫는 State 값
    const [on, setOn] = useState(false)     // 상세페이지의 모집중/모집완료 토글버튼 State 값

    // const [roomId, setRoomId] = useState()  //  서버로 부터 받은 roomId state로 저장
    const [state, setState] = React.useState("")
    let { recruitPostId } = useParams();
    const [RroomId,setRroomId] = React.useState()


    React.useEffect(() => {
        axios
          .get("http://dlckdals04.shop/api/recruits/" + recruitPostId)
          .then((response) => {
            setState(response.data.recruitDetails);
            console.log(response.data.recruitDetails);
          })
          .catch((response) => {
            console.log(response);
          });
      }, []);
    
      console.log(state)

    // 모집중 , 모집완료 상태 변경하기 
    const inputChange = () => { setOn(!on); };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const detail = useSelector(state => state.post.list);
    
    React.useEffect(() => {
        dispatch(detailPostDB(recruitPostId));
    }, [])

    const deletePosting = () => {
        dispatch(deletePostDB(recruitPostId, navigate));
    };

   // 1:1 문의하기 버튼 눌렀을때 채팅방 생성 + 채팅방 입장하기
    const GoChat = () => {

        axios.post('http://13.125.241.180/api/chats/rooms/' + recruitPostId ,null,{
        headers: { Authorization: `Bearer ${getCookie("accessToken")}`}
        })
        .then((res)=>{
            console.log(res)
            const roomId = res.data.roomId
            socket.emit("join_room", roomId);
            setModalIsOpen(true) 
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    
    return (
        <>
            <Header />
            <Grid maxWidth="1440px" height="100%"
                margin="0 auto" padding="0 12px">
                <Detail>
                    <>
                        <div className='container'>
                            <div className='card-left'>
                                <div className='toggle'>
                                    <input className='inputbox' 
                                    type="checkbox" id="chk1" />
                                    <label htmlFor="chk1"
                                        onClick={inputChange}>
                                    </label>
                                    <p> {!on ? "모집중" : "모집완료"} </p>
                                </div>
                                <div>
                                    <strong> 제목 </strong>
                                    <span>
                                        {detail.title}
                                    </span>
                                </div>
                                <div>
                                    <strong> 날짜 </strong>
                                    <span>
                                        {detail.date}
                                    </span>
                                </div>
                                <div>
                                    <strong> 시간 </strong>
                                    <span>
                                        {detail.time}
                                    </span>
                                </div>
                                <div> <strong> 위치 </strong>
                                    <span>
                                        {detail.place}
                                    </span>
                                </div>
                                <div>
                                    <strong> 연령 </strong>
                                    <span>
                                        {detail.age}
                                    </span>
                                </div>

                            </div>

                            <div className='card-right'>
                                <div className='card-top'>
                                    <h3> 블루베리 농장 </h3>
                                    <p><MdOutlinePlace /> www.gmarket.com/kidsphone</p>
                                </div>
                                <div className='profile'>
                                    <div className='detail_profile'>
                                        <img src={dog} alt="프로필" />
                                    </div>
                                    <div className="detail_username">
                                        <div className="username">
                                            {detail.nickname}
                                        </div>
                                    </div>
                                </div>

                                <div className='content'>

                                </div>
                                
                            {nickname === detail.nickname ? 
                            <Btn>
                                <button className='btn' onClick={() =>  
                                { navigate(`/recruitedit/` + detail.recruitPostId)  }}
                                >
                                수정하기</button>
                                <button className='btn' 
                                onClick={deletePosting}
                                >
                                삭제하기</button>  
                            </Btn>  
                            :
                            <BtnTwo>
                            <button className='btn'onClick={GoChat}> 1:1문의하기 </button>  
                            </BtnTwo>   
                            }
                            </div>
                        </div>
                    </>
                    <Comment />
                </Detail>
            </Grid>
            <OneToOneChat
open={modalIsOpen}  // 모달창 열기
onClose={()=>setModalIsOpen(false)} // 모달창 닫기
socket={socket}
/> 
        </>
    )
}

const Detail = styled.div`
.container{
    display:flex;
}

.toggle{
    margin-left: 20px;
    display:flex;
    height: 100px;
}

.toggle > p{
    margin:20px 0px 0px 30px;
    font-size: 20px;
}

.card-left{
    width:600px;
    height:630px;
    display:flex;
    justify-content:center;
    flex-direction:column;
    font-size : 25px;
}

.card-left > div {
    margin: 40px 0px 0px 70px;
}

.card-left > div >span{
    border: 1px solid #E4E4E4;
    display:inline-block;
    width: 340px;
    padding:10px;
    margin-left: 30px;
    border-radius: 10px;
}

.inputbox{
    position:absolute;
    left:-1000%;
    }

label{
    margin-top:16px;
    position: relative;
    display: block;
    width: 80px;
    height: 35px;
    background: #A58646;
    border-radius: 60px;
    transition: background .4s;
} 

label:after{
    content:"";
    position: absolute;
    left: 0px;
    top: 48%;
    width: 40px;
    height: 40px;
    border-radius:100%;
    background-color:#fff;
    transform: translateY(-50%);
    box-shadow:1px 3px 4px rgba(0,0,0.1);
    transition: all .4s; 

}

input:checked + label:after {
left:calc(100% - 40.5px);
}
input:checked + label{background-color:#6B4E16;}

label span {display:none;}

.card-right{
    width: 50%;
    margin-left: 30px;
}

.card-top {
    margin: 170px 0px 0px 10px;
    width: 100%;
}

.card-top p {
 display: flex;
 margin-top: 8px;
 color: gray;
}

.profile{
    display:flex;
    margin-top: 20px;
}

.detail_profile > img {
    width:55px;
    height:55px;
    border-radius:50%;
    margin-left: 10px;
}

.detail_profile{
    border-radius:50%;

    /* display:flex; */
    align-items:center;
    display:block;
    justify-content:center;
}

.username{
    display:flex;
    align-items:center;
    margin-top: 15px;
    margin-left:20px;
    font-size:20px;
    width: 100%;
}

.content{
    padding:20px;
    height:250px;
    width:80%;
    border:2px solid #E4E4E4;
    border-radius:15px;
    font-size:20px;
    font-weight:400;
    margin-top:20px;
    word-break:normal;
}
`
const Btn = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
    margin-left: 16px;
    
    .btn{
      width: 30%;
      height: 30px;
      border-radius: 20px;
      color: white;
      background-color: #3C3C3C;
      margin-top: 20px;
      margin-right: 10px;
      padding-top: 9px;
      padding-bottom: 33px;
      border: 0;
      outline: 0;
    }


    `

const BtnTwo = styled.div`
    width:80%;
    display: flex;
    align-items:center;
    justify-content:flex-end;

    .btn{
      width: 30%;
      height: 30px;
      border-radius: 20px;
      color: white;
      background-color: #3C3C3C;
      margin-top: 20px;
      margin-right: 10px;
      padding-top: 9px;
      padding-bottom: 33px;
      border: 0;
      outline: 0;
    }
`

export default RecruitDetail
