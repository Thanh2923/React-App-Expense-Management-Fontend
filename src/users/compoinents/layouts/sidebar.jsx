import { NavLink } from 'react-router-dom';
import useUser from '../../../redux/Get_user';
import { useLocation } from "react-router-dom";
import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router";

const Sidebar = () => {
  let navigate = useNavigate();
  const { user, saveUser, removeUser } = useUser();
  const location = useLocation();
  const path = location.pathname; // "/Category"
  const pageName = path.split("/").filter(Boolean).pop();
  const [pageNameHome,setPageNameHome] = useState()
  const [active,setActive] = useState("home");
  const [isHovered, setIsHovered] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    setTimeout
    (()=>{
      navigate("/login");
    },1000) 
  };
  useEffect(() => {
    if(pageNameHome ){
      setActive(pageNameHome);
    }
  }, [pageNameHome]);
  useEffect(() => {
    if(pageName){
      setPageNameHome(pageName)
    }
  }, [pageName]);
  return (
    <nav className="bg-[#0099FF]  fixed top-0 left-0  text-white p-4  w-full ">
      <ul className="flex space-x-4">
        <li>
          <NavLink
          onClick={()=>setActive("home")}
            to="/"
            className={` ${active === "home" ? "bg-blue-600" : ""} hover:bg-[#3366CC]  px-3 py-2 rounded`}
            activeClassName="bg-gray-900"
            exact
          >
            Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink
          onClick={()=>setActive(pageName)}
            to="/Category"
            className={` ${active === "Category" ? "bg-blue-600" : ""} hover:bg-[#3366CC]  px-3 py-2 rounded`}
            activeClassName="bg-gray-900"
          >
            Danh mục chi phí
          </NavLink>
        </li>
        <li>
          <NavLink
          onClick={()=>setActive(pageName)}
            to="/budget-settings"
            className={` ${active === "budget-settings" ? "bg-blue-600" : ""} hover:bg-[#3366CC]  px-3 py-2 rounded`}
            activeClassName="bg-gray-900"
          >
            Cài đặt ngân sách
          </NavLink>
        </li>
        <li>
          <NavLink
          onClick={()=>setActive(pageName)}
            to="/Track-Expense"
            className={` ${active === "Track-Expense" ? "bg-blue-600" : ""} hover:bg-[#3366CC]  px-3 py-2 rounded`}
            activeClassName="bg-gray-900"
          >
            Theo dõi chi phí
          </NavLink>
        </li>
        <li>
          <NavLink
          onClick={()=>setActive(pageName)}
            to="/ExpenseFixed"
            className={` ${active === "ExpenseFixed" ? "bg-blue-600" : ""} hover:bg-[#3366CC]  px-3 py-2 rounded`}
            activeClassName="bg-gray-900"
          >
            Chi phí cố định
          </NavLink>
        </li>

      

      </ul>
      <div 
      className="absolute bottom-4 right-4 flex items-center space-x-2"
      onMouseEnter={() => setIsHovered(true)}  // Khi hover vào phần tử, hiển thị nút Đăng xuất
      onMouseLeave={() => setIsHovered(false)} // Khi hover ra ngoài, ẩn nút Đăng xuất
    >
      <img
        className="w-10 h-10 rounded-full"
        src={`${user?.email ? user.avatar : "https://png.pngtree.com/png-vector/20240807/ourlarge/pngtree-customer-care-who-gives-directions-in-front-of-the-laptop-png-image_13132010.png" }`}
        alt="Avatar"
      />
      <h3 className="text-white font-semibold">Hi { user?.userName ? user.userName : "Admin" }</h3>

      {/* Hiển thị nút Đăng xuất khi hover */}
      {isHovered && (
        <button 
          onClick={handleLogout}
          className="ml-4 text-black bg-white px-4 py-2 rounded-md hover:bg-white"
        >
          Đăng xuất
        </button>
      )}
    </div>
    </nav>
  );
};

export default Sidebar;
