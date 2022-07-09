import React,{ useState } from 'react'
import styled from 'styled-components';
import { FaAlignJustify,FaAngleDown } from "react-icons/fa";

const Categories = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <Header isToggled={isToggled}>

      <div className="toggle"onClick={() => {setIsToggled(!isToggled)}}>
          {!isToggled ? <FaAlignJustify className='CateIcon'></FaAlignJustify> : <FaAngleDown className='CateIcon'></FaAngleDown>} 
      </div>
      <ul className="header__menulist">
        <li>모집게시글</li>
        <li>장소추천</li>
        <li>육아 물품 리뷰</li>
      </ul>
    </Header>
  );
}






// 카테고리 스타일 컴포넌트 코드
const Header = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  color: white;
  background-color: #c8e6c9;
  font-size : 20px;


  .header__menulist {
    list-style: none;
    display: flex;
  }


  li {
    padding:10px 15px 10px 15px;
    color: #263238;
    margin-right: 20px;
    border: 2px solid #26a69a;
    border-radius:15px;
    cursor: pointer;
  }

  li:hover{
    background-color:#26a69a;
    transform:scale(1.10)
  }

  .CateIcon{
    color:black;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content:flex-start;

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      padding:0px;
      margin:0px;
    }

    .header__menulist li{
      margin: 1rem 0;
      width: 100%;
      padding: 15px;
      text-align: center;
      border: 2px solid #26a69a;
      border-radius: 0px;
    }

    .toggle {
      display: block;
    }
  }

`;

export default Categories