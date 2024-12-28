import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const LoginGoogle =  () => {
    let navigate = useNavigate();
  const clientId = '372374916829-laeqeo8hc30uljtgqi92to20qv1iii91.apps.googleusercontent.com';

  // Hàm xử lý khi đăng nhập thành công
  const handleSuccess = async (response) => {
    const token = response.credential; // Đây là id_token, không phải access_token
  
    // Giải mã id_token để lấy thông tin người dùng
    const userInfo = jwtDecode(token); // Giải mã token bằng thư viện jwt-decode
  
    // Lưu vào localStorage
    localStorage.setItem('user', JSON.stringify({
      email: userInfo.email,
      avatar: userInfo.picture,
      userName: userInfo.name,
    }));

    try {
      let response = await axios.post(`${apiUrl}/auth/register`, {
        userName:userInfo.name,
        email:userInfo.email,
      } )

      if(response.status === 200){
        navigate("/");
      }
    } catch (error) {
       console.log(error)
    }

 
        
    
  };
  

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
          <GoogleLogin
            onSuccess={handleSuccess}
          />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
