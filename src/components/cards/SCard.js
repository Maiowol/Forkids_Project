// 모집 카드
import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BsBookmark } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { loadPostDB } from '../../redux/modules/post';


function SCard() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    let { recruitPostId } = useParams();
    
    const post = useSelector(state => state.post.list);

    React.useEffect(() => {
        dispatch(loadPostDB());
    }, [])

    return (
        <>
            <Container>
                {post.recruitPosts&&
                post.recruitPosts.map((item, index) => (
                    <div className='card'
                        key={index}
                        onClick={() => {
                            navigate('/recruitdetail/' + item.recruitPostId
                            )
                        }}>
                        {/* 카드 위쪽 아이콘 */}
                        <div className='card-top'>
                            <p>모집완료</p>
                            <BsBookmark className='icon' />
                        </div>
                        {/* 카드 타이틀 */}
                        <div className='title'>
                            <h1>{item.title}</h1>
                        </div>
                        {/* 카드 내용물 */}
                        <div className='card-bottom'>
                            <p>{item.createdAt}</p>
                            <p>{item.time}</p>
                            <p>{item.place}</p>
                            <p>{item.age}</p>
                        </div>
                    </div>
                ))}
            </Container>
        </>
    )
}
const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, 380px);
// grid-template-columns: repeat(auto-fill, minmax(20%, auto));
gap: 3em;
justify-content: center;
align-items: center;
width: 100%;
// background-color: lightgray;


.card {
display: flex;
height: 100%;
background: white;
border-radius: 30px;
border: 1px solid lightgray;
box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.09);
cursor: pointer;

}

.card-top {
    display:flex;
    margin: 40px 0px 0px 30px;
    width: 100%;
    justify-content: space-between;
}

.card-top p {
    margin: 0px 0px 4px 4px;
    background-color: #F4B03E;
    border-radius: 20px;
    padding: 6px 15px 7px 15px;
    color: white;
} 

.icon {
    border: black;
    margin-right: 60px;
    width:34px;
    height: 34px;
    color:black;
}

.title {
    margin: 30px 10px 30px 33px;

}

.card-bottom {
    margin: 0px 0px 40px 30px;
}

.card-bottom p {
    margin: 0px 0px 8px 4px;
}

`;

export default SCard;
