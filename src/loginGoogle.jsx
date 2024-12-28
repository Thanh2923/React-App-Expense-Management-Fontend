import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'; // Không cần destructure jwtDecode
import axios from 'axios'; // Đảm bảo bạn đã import axios
import { useNavigate } from "react-router-dom"; // Đúng tên "react-router-dom"

const LoginGoogle = () => {
  const navigate = useNavigate();
  const clientId = '372374916829-laeqeo8hc30uljtgqi92to20qv1iii91.apps.googleusercontent.com';
  const apiUrl = import.meta.env.VITE_API_URL;  
  // Đảm bảo thay thế URL bằng endpoint thực tế của bạn

  // Hàm xử lý khi đăng nhập thành công
  const handleSuccess = async (response) => {
    const token = response.credential;

    try {
      // Giải mã token để lấy thông tin người dùng
      const userInfo = jwtDecode(token);

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: userInfo.email,
          avatar: userInfo.picture,
          userName: userInfo.name,
        })
      );

      // Gửi thông tin đến backend để xử lý hoặc tạo người dùng
      const registerResponse = await axios.post(`${apiUrl}/auth/register`, {
        userName: userInfo.name,
        email: userInfo.email,
      });

      if (registerResponse.status === 200) {
        // Điều hướng về trang chủ nếu đăng ký thành công
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google Login:", error);
    }
  };

  // Hàm xử lý khi đăng nhập thất bại
  const handleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
