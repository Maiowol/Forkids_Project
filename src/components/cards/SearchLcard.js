// 육아템 리뷰 카드
import React,{useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlinePlace } from "react-icons/md";
import axios from "axios";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

function SearchLcard({searchdata}) {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [book, setbook] = useState();
  const [btn, setbtn] = useState(false);
  const [athis, setathis] = React.useState(6)

  const refetch = () =>{
    axios
    .get("https://zhaoxilin.shop/api/mypage/bookmark", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      setbook(res.data.placeBookmarkList.slice(0, 3));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // React.useEffect(() => {
  //   refetch()
  // }, []);

  const SearchMore =  () => {
    setbtn(!btn);
    if(btn === false){
      setathis(searchdata.length)
    } else{
      setathis(6)
    }
  };


  return (
    <>
      <Container>
        {searchdata.slice(0,athis) &&
          searchdata.slice(0,athis).map((data, idx) => {
            return (
                <div className="card" key={idx}>

                <div className="cardin">

                <div className="cardInto">

                <div className="FirsBookBox">
                <div className="FirstIn">
                <div>
                  <span className="titleCard" onClick={()=>{navigate('/placedetail/' + data.placePostId)}}>{data.title.length > 8 ? data.title.slice(0,6) + '...': data.title}</span>
                  <span className="titleStar" onClick={()=>{navigate('/placedetail/' + data.placePostId)}}><FaStar size={28}style={{color: "#FFBA5A",marginLeft: "5px"}}/>{data.star}점</span>
                </div>
                
                </div>

                <div className="BookRegion" id={data.placePostId}>
                <MdOutlinePlace />
                {data.region.length >20 ? data.region.slice(0,19) + '..' : data.region}
                </div>

                <div className="image" id={data.placePostId} onClick={()=>{navigate('/placedetail/' + data.placePostId)}}>
                <img src={data.imageUrl[0]} alt="사진" />
                </div>
                </div>
                </div>
                </div>

                <div className="SecondCard" id={data.placePostId} onClick={()=>{navigate('/placedetail/' + data.placePostId)}}>
                  <div className="SecondIn" id={data.placePostId} onClick={()=>{navigate('/placedetail/' + data.placePostId)}}>
                      <span><img src={data.profileUrl} alt="프로필 이미지" className="BookProfileImg" id={data.placePostId}/></span>
                      <span className="BookmarkNi">{data.nickname}</span>
                  </div>

                  <div className="content" id={data.placePostId} onClick={()=>{navigate('/placedetail/' + data.placePostId)}}>
                    {data.content.length > 17 ? data.content.slice(0,15) + '...' : data.content }
                    
                  </div>  
                </div>
                </div>
            );
          })}
      </Container>
      <div className="btnBox">
        <button className="MoreBtn" 
        onClick={SearchMore}
        >
          {btn ? "닫기" :"더보기" }
        </button>
      </div>
      <hr className="BookHr"/>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2em;
  justify-content: center;
  align-items: center;

  .card {
    background: white;
    border-radius: 20px;
    border: 1px solid #A8A8A8;
    overflow: hidden;
    width: 284px;
    height: 390px;
  }

  .firstT{
    width: 165.17px;
    height: 23px;
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    margin: 26px 12px 8px 16px;
    width: 255.63px;
    height: 56.48px;
  }
  .FirsBookBox{
    width: 268.87px;
    height: 69.72px;
    margin:26px 12px 8px 16px;
  }

.FirstIn{
  width: 255.63px;
  height: 31.48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.titleStar{
  color: #A8A8A8;
  font-family: 'NanumGothic';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  cursor: pointer;
}

.bookpos{
  width: 31.48px;
  height: 31.48px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.BookRegion{
  width: 255.63px;
  height: 20px;
  margin-top: 10px;
  font-family: 'NanumGothic';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #3C3C3C;
  margin-bottom: 12px;
}

.SecondCard{
  width: 262px;
  height: 104.11px;
  cursor: pointer;
}

.SecondIn{
  width: 262px;
  height: 35.11px;
  margin-top: 5px;
  margin-left:22px;
  cursor: pointer;
}

.BookProfileImg{
  width: 33.11px;
  height: 35.11px;
  border: 0.662246px solid #E4E4E4;
  border-radius: 50%;
}

.BookmarkNi{
font-family: 'NanumGothic';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 18px;
margin-left: 8px;
}

  .card-top p {
    display: flex;
    margin-left: 10px;
    color: gray;
  }

  .card-top > div {
    display: flex;
  }

  .titleCard{
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    margin-left: 16px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .cardin{
    width: 264.43px;
    height: 280px;
  }
  .bookmark {
    margin-right: 60px;
    width: 34px;
    height: 34px;
    cursor: pointer;
  }

  .bookmark2 {
    width: 34px;
    height: 34px;
    color: #6b4e16;
    cursor: pointer;
  }

  a {
    margin-left: 51px;
  }
  .card-body {
    width: 264.43px;
    height: 274px;
    cursor: pointer;
    text-align: center;
  }
  .image {
    border-radius: 25px;
    overflow: hidden;
    position: relative;
    right:5px;
    top: 7px;
    cursor: pointer;
  }

  .image > img{
    width: 258.28px;
    height: 170.2px;
    border-radius: 19.8674px;
    border: 1px solid #E4E4E4;
  }


  .profile_box {
    display: flex;
    margin-top: 15px;
    padding-left: 30px;
  }
  .detail_profile > img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-left: 10px;
  }
  .detail_profile {
    border-radius: 50%;
    /* display:flex; */
    align-items: center;
    display: block;
    justify-content: center;
  }

  strong {
    font-family: "Noto Sans KR";
    margin-top: 12px;
    margin-left: 10px;
  }
  .card-body p {
    margin-top: 10px;
    margin-left: 5px;
  }
  .content {
    width: 250px;
    height: 67px;
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: left;
    margin: 7px 12px 20px 22px;
    word-break: break-all;
    cursor: pointer;
  }
`;

export default SearchLcard;
