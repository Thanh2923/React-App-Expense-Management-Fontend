import register from '../../../assets/register.jpg'
import { useState } from 'react';
import logo_fb from '../../../assets/logo_fb.png'
import logo_gg from '../../../assets/logo_gg.png'
import logo_ap from '../../../assets/logo_ap.png'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;  
  
    try {
      let response = await axios.post(`${apiUrl}/auth/register`, {
        userName,
        email,
        password,
      });
  
      // Kiểm tra mã trạng thái HTTP 200
      if (response.status === 200) {
        toast.success("Đăng ký thành công !");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Nếu không phải mã 200, hiển thị lỗi trả về từ server
        toast.error(`${response.data.error}`);
      }
      
    } catch (error) {
      if (error.response) {
        // Trường hợp server trả về lỗi (status khác 200)
        console.log("Error response: ", error.response);
        toast.error(error.response.data.error || 'Đã xảy ra lỗi, vui lòng thử lại!');
      } else if (error.request) {
        // Nếu không nhận được phản hồi từ server
        console.log("Error request: ", error.request);
        toast.error('Không thể kết nối đến máy chủ!');
      } else {
        // Lỗi khác trong quá trình gửi yêu cầu
        console.log("Error message: ", error.message);
        toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
      }
    }
  };
  
  
    return (
        <>
        <div className="flex ">
          <ToastContainer/>
           <div className="w-[60%] h-[100vh]  bg-red-400 ">
            <img src={register}  className="w-[100%] h-[100vh]" alt="" />

           </div>
           <div className="w-[40%] h-[100vh ">
           <div className="min-h-screen   justify-center bg-slate-100 ">
      <form onSubmit={handleSubmit} className="    p-8 rounded-lg  w-[80%] m-auto  max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 bg-gradient-to-r from-blue-500 via-green-500 to-pink-500 bg-clip-text text-transparent ">Đăng ký</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="userName">
            UserName
          </label>
          <input
            id="userName"
            type="text"
            placeholder='UserName...'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder='Email...'
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
            placeholder='Mật khẩu...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            required
          />
        </div>
        
        <div className="flex shadow-orange-50 ">
          <button
            type="submit"
            className="bg-blue-500  w-[100%] hover:cursor-pointer shadow-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          >
            Đăng ký
          </button>
        </div>
      </form>
        
      <div className="or-continue-with flex w-[70%] m-auto">
                 <div className="or-line w-[30%] mt-3 h-[2px] bg-black z-40 " style={{background: "linear-gradient(to left top, black, pink)"}}>
                 </div>
                 <div className='w-[35%] text-center '>
                        <h6>Hoặc với</h6>
                 </div>
                 <div className="or-line w-[32%] mt-3 h-[2px] bg-black z-40 " style={{background: "linear-gradient(to left top, black, pink)"}}>
                 </div>
        </div>

        <div className='w-[70%] m-auto justify-between flex mt-5 rounded-[10px]'>
                <div className="icon-google w-[20%] hover:cursor-pointer rounded-[10px] h-[50px]  border-2 border-white p-2 flex items-center justify-center ">
                    <img src={logo_gg} className='w-[70%] h-[30px]' alt="" />
                </div>

                <div className="icon-google w-[20%] hover:cursor-pointer rounded-[10px] h-[50px]  border-2 border-white p-2 flex items-center justify-center ">
                    <img src={logo_ap} className='w-[70%] h-[30px]' alt="" />
                </div>
                <div className="icon-google w-[20%] hover:cursor-pointer rounded-[10px] h-[50px]  border-2 border-white p-2 flex items-center justify-center ">
                    <img src={logo_fb} className='w-[70%] h-[30px]' alt="" />
                </div>
        </div>
        

        <div className='login-now text-center  mt-8 ' >
                <a href="/login" className='text-blue-700 underline' >Đăng nhập </a>
        </div>
      
    </div>
    
    
           </div>
           
        </div>
          
        </>
    )
}

export default Register