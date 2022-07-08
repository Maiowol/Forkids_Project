import React from 'react'
import styled from 'styled-components'
const comment = () => {
  // const [comment, setComment] = useState('');

  // const dispatch = useDispatch();

  // const addComment = () = {
  //   const comment_data = {

  //   }
  // }

  return (
    <CommentBox>
      <div className='comment_section'>
        <div className='h1Box'>
          <h1>댓글</h1>
        </div>
        <div className='inputBox'>
          <input 
          type="text"
          // onChange={e =>
          //   setComment(e.target.value)}
             />
        </div>
        <div className='btnBox'>
          <button className='btn'
          >
            등록
          </button>
        </div>
      </div>


      <div className='box'>
        <div className='chat'>
            <div className='profile'/>
          <div className='name'
          >
            닉네임
          </div>
          <div className='comment_box'>
            <div className='comment'
            >
              댓글을 달아주세요
            </div>
            <div className='date'
            >
              2022.07.05 14:00
            </div>
          </div>

        </div>
        <button className='delete'
        >
          삭제
        </button>
      </div>
    </CommentBox>
  )
}

const CommentBox = styled.div`
*{
  max-width: 100%;
  height: auto;
}

margin-top:30px;

.comment_section{
    display: flex;
    justify-content: center;
    width:60%;
    height:60px;
    margin-left: 110px;
}


.h1Box{
    width:15%;
    display:flex;
    justify-content: center;
    align-items: center;
}

.h1Box > h1{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    margin-top: 10px;
}
.inputBox{
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
}

.inputBox > input{
    width:100%;
    border: 1px solid #E4E4E4;
    height: 40px;
    border-radius: 300px;
}

.btnBox{
    width:25%;
    height: 30px;
    display:flex;
    margin-top: 16px;
}

.btn{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    background: #F4B03E;
    border-radius: 300px;
    width: 100%;
    color: #FFFFFF;
    margin-left:30px;
}



.box{
    width: 90vh;
    height: 80vh;
    // border: 1px solid lightgray;
    margin-left: 210px;
    margin-top: 30px;
    display:flex;
}

.chat {
  width: 770px;
  height: 50px;
  display:flex;
}

.profile{
    width: 50px;
    height:50px;
    border-radius:50%;
    border:1px solid black;
  }

  .name{
    display: flex;
    justify-content:center;
    align-items:center;
    font-family: 'Noto Sans KR';
    margin-left: 10px;
    margin-top: 38px;
  }

  .comment_box {
    margin-top:28px;
    margin-left: 30px;
  }

  .delete{
    width: 13%;
    height: 30px;
    border-radius: 20px;
    color: white;
    background-color: #E4E4E4;
    margin-top: 42px;
    padding-bottom: 24px;
    padding-top: 2px;
    border: 0;
    outline: 0;


  }

`


export default comment