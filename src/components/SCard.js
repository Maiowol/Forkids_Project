import React from 'react'
import styled from 'styled-components';
import { RecruitData } from '../shared/recruitdata';

function SCard() {

    return (
        <>
        <Container>
            {RecruitData.map(item => (
                <div className='card'>
                    <div className='card-top'>
                        <p>모집완료</p>
                        </div>
                        <div className='title'>
                             <h1>{item.title}</h1>
                        </div>
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
grid-template-columns: repeat(auto-fit,380px);
gap: 3em;
justify-content: center;
align-items: center;
width: 100%;
// background-color: lightgray;


.card {
background: white;
border-radius: 30px;
border: 1px solid lightgray;
box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.09);
cursor: pointer;
}

p {
    margin: 0px 0px 8px 4px;
  
}

.card-top {
    margin: 40px 0px 0px 30px;
}

.title {
    margin: 30px 10px 30px 33px;
}

.card-bottom {
    margin: 0px 0px 40px 30px;
}

`;


export default SCard;
