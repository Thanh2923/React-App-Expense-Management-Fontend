import login from '../../../assets/login.jpg';
import { useState } from 'react';
import logo_fb from '../../../assets/logo_fb.png';
import logo_gg from '../../../assets/logo_gg.png';
import logo_ap from '../../../assets/logo_ap.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginGoogle from '../../../loginGoogle';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  const apiUrl = import.meta.env.VITE_API_URL;  
  
  try {
    let res = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    
    // Lấy user và token từ phản hồi
    const user = res.data.user;
    const token = res.data.token;

    // Lưu thông tin vào localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // Lưu dưới dạng chuỗi JSON

    // Có thể hiển thị thông báo thành công và điều hướng tới trang chủ
    toast.success('Đăng nhập thành công!');
    setTimeout(()=>{
      navigate('/'); // Điều hướng tới trang chính hoặc trang mà bạn muốn
    },2000)
  } catch (error) {
    console.log(error);
    toast.error('Vui lòng kiểm tra lại thông tin!');
  }
};


  return (
    <>
      <div className="flex">
        <ToastContainer/>
        <div className="w-[60%] h-[100vh] bg-red-400">
          <img src={login} className="w-[100%] h-[100vh]" alt="Login" />
        </div>
        <div className="w-[40%] h-[100vh]">
          <div className="min-h-screen justify-center bg-slate-100">
            <form onSubmit={handleSubmit} className="p-8 rounded-lg w-[80%] m-auto max-w-md">
              <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 bg-gradient-to-r from-blue-500 via-green-500 to-pink-500 bg-clip-text text-transparent">Đăng Nhập</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex shadow-orange-50">
                <button
                  type="submit"
                  className="bg-blue-500 w-[100%] hover:cursor-pointer shadow-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
                >
                  Đăng nhập
                </button>
              </div>
            </form>

            <div className="or-continue-with mb-5 flex w-[70%] m-auto">
              <div className="or-line w-[30%] mt-3 h-[2px] bg-black z-40" style={{ background: 'linear-gradient(to left top, black, pink)' }}></div>
              <div className="w-[35%] text-center">
                <h6>Hoặc với</h6>
              </div>
              <div className="or-line w-[32%] mt-3 h-[2px] bg-black z-40" style={{ background: 'linear-gradient(to left top, black, pink)' }}></div>
            </div>

            <div className="w-[70%] m-auto   rounded-[10px]">
              <LoginGoogle/>
           
            </div>

            <div className="login-now text-center mt-8">
              <a href="/register" className="text-blue-700 underline">
                Đăng Kí
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
