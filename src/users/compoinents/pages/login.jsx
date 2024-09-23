import login from '../../../assets/login.jpg';
import { useState } from 'react';
import logo_fb from '../../../assets/logo_fb.png';
import logo_gg from '../../../assets/logo_gg.png';
import logo_ap from '../../../assets/logo_ap.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });
      let access_token = res.data.access_token;
      let Email = res.data.email;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('Email', Email);
      // localStorage.setItem('email', userEmail); // Lưu email vào local storage
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <>
      <div className="flex">
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

            <div className="or-continue-with flex w-[70%] m-auto">
              <div className="or-line w-[30%] mt-3 h-[2px] bg-black z-40" style={{ background: 'linear-gradient(to left top, black, pink)' }}></div>
              <div className="w-[35%] text-center">
                <h6>Hoặc với</h6>
              </div>
              <div className="or-line w-[32%] mt-3 h-[2px] bg-black z-40" style={{ background: 'linear-gradient(to left top, black, pink)' }}></div>
            </div>

            <div className="w-[70%] m-auto justify-between flex mt-5 rounded-[10px]">
              <div className="icon-google w-[20%] hover:cursor-pointer rounded-[10px] h-[50px] border-2 border-white p-2 flex items-center justify-center">
                <img src={logo_gg} className="w-[70%] h-[30px]" alt="Google" />
              </div>

              <div className="icon-google w-[20%] hover:cursor-pointer rounded-[10px] h-[50px] border-2 border-white p-2 flex items-center justify-center">
                <img src={logo_ap} className="w-[70%] h-[30px]" alt="Apple" />
              </div>
              <div className="icon-google w-[20%] hover:cursor-pointer rounded-[10px] h-[50px] border-2 border-white p-2 flex items-center justify-center">
                <img src={logo_fb} className="w-[70%] h-[30px]" alt="Facebook" />
              </div>
            </div>

            <div className="login-now text-center mt-8">
              <a href="/Login" className="text-blue-700 underline">
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
