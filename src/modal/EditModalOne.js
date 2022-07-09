import React from 'react'
import styled from 'styled-components'

function EditModalOne() {
    return (
        <div>
            <ModalBody>
                <ModalOverlay>
                    <ModalContent>
                        <DetailContainer>
                            <ModalImage>
                            </ModalImage>
                         
                          
                        </DetailContainer>
                    </ModalContent>
                </ModalOverlay>
            </ModalBody>
        </div>
    )
}


const ModalBody = styled.div`
  width: 100vw;
  height: 100%;
  position: absolute;
  z-index: 0;
  overflow-y: hidden;
`
const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #0009;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
`

const ModalContent = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

const DetailContainer = styled.div`
  height: 500px;
  width: 860px;
  cursor: auto;
  display: flex;
  outline: none;
  background-color: #fff;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`
const ModalImage = styled.div`
  img {
    width: 285px;
    height: 500px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px 0px 0px 5px;
  }
`

const FooterBtn = styled.div`
  padding: 80px 0 0 0px;
  margin: 0px 0 200px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  gap: 8px;
  .cancel-btn,
  .submit-btn {
    background-color: #fff;
    border: 0.5px solid #d1d1d1;
    padding: 0 9px;
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    border-radius: 4px;
    height: 32px;
    line-height: 30px;
    color: #767676;
    transition: all 0.1s ease-in-out;

    &:hover {
      color: #111;
      border: 0.5px solid #111;
    }
  }
`

const Textarea = styled.textarea`
  width: 95%;
  padding: 10px;
  margin: 10px 0px 13px;
  font-family: 'Noto Sans KR';
  font-size: 13px;
  border-radius: 4px;
  border: 1px solid #d1d1d1;
  transition: border 0.1s ease-in-out;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #111;
  }
`

export default EditModalOne
