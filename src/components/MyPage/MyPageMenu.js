import React from 'react'
import {  useNavigate } from 'react-router-dom';


const MyPageMenu = () => {
  const navigate = useNavigate();

  
  return (
        <>
         <h4> 마이페이지</h4>
        <div className='Menu_item'>
        <div className='profile_item'><span onClick={()=>{navigate('/manager')}}>프로필 관리</span></div>
        <div className='bookmark_item'><span onClick={()=>{navigate('/Bookmark')}}>북마크 게시글</span></div>
        <div className='chat_item'> <span onClick={()=>{navigate('/mypage')}}>1:1 채팅 내역</span></div>
      </div>
      </>
  )
}

export default MyPageMenu