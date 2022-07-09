import axios from 'axios';
import React from 'react'




const Llooiinn = () => {

  const email_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const pwcheck_ref = React.useRef(null);
  const nick_ref = React.useRef(null);

  const login = () =>{
    const data = {
      email : email_ref.current.value,
      nickname : nick_ref.current.value,
      password : pw_ref.current.value,
      passwordCheck : pwcheck_ref.current.value
    }



    
    axios.post('http://dlckdals04.shop/api/users/signup',data,{ withCredentials: true })
    .then((res)=>{
      console.log(res.data.accessToken)
 

    })
    .catch((err)=>{
      console.log(err)
    })

  }






  return (
    <div>
        <input type="text" ref={email_ref}/>
        <input type="password" placeholder="비밀번호"ref={pw_ref}/>
        <input type="type" placeholder="비밀번호 확인"ref={pwcheck_ref}/>
        <input type="type"placeholder="닉네임"ref={nick_ref}/>
        <button onClick={login}>확인</button>
    </div>
  )
}

export default Llooiinn