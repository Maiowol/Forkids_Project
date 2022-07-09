import React from 'react'
import styled from 'styled-components'


const comment = () => {
  return (
    <CommentBox>
        <div className='Box'>
        <div className='Boxtitle'>댓글창</div>
            <div className='Chat'>
                <input type="text" className='CommentInput'></input>
                <button className='CommentBtn'>작성</button>
            </div>
        </div>
    </CommentBox>

  )
}

const CommentBox = styled.div`
    margin-top:30px;

.Box{
    width:50%;
    height: 80vh;
    border: 1px solid black;
    margin:auto;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
}

.Chat{
    display:flex;
}

.Boxtitle{
    text-align:left;
    font-size:24px;
    padding:10px;
}

.CommentInput{
    width:90%;
    height:30px;
    border:1px solid black;
}

.CommentBtn{
    padding : 0px 18px 0px 17px;
}
`

export default comment