import React from "react";
import styled from "styled-components";
import search from "../../images/search.png";
import { Link } from "react-router-dom";

function SearchInput() {
  const searchBtn = () => {
    console.log("key press");
  };

  return (
    <SearchBox>
      <img src={search} alt="검색" />
      <div className="search">
        <input
          type="text"
          className="search-box"
          placeholder="검색어를 입력해주세요"
          onKeyPress={(event) => searchBtn(event)}
        />
      </div>
      <Link to="/api/search">
        <Btn>확인</Btn>
      </Link>
    </SearchBox>
  );
}

const SearchBox = styled.div`
  font-family: "Nanum Gothic";
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 30px;
    height: 30px;
    margin: 42px 10px 0 0;
  }

  .search {
    margin-top: 40px;
  }

  .search-box {
    background-color: #eee;
    width: 600px;
    height: 40px;
    border-radius: 30px;
    padding: 9px;
    border: none;
    outline: none;
  }
`;

const Btn = styled.button`
  margin-top: 40px;
  margin-left: 10px;
  padding: 7px 17px;
  cursor: pointer;
  border: 1px solid transparent;
  background: gray;
  color: white;
  border-radius: 20px;
`;

export default SearchInput;
