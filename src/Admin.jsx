import Search from "./admin/compoinents/layouts/search"
import Sidebar from "./admin/compoinents/layouts/sidebar"
import MainAdmin from "./admin/compoinents/pages/MainAdmin"
import { Outlet,useLocation } from "react-router-dom"


function Admin() {
  const location = useLocation();

  return (
  <>
  <div className="flex">
    <Sidebar/>
      <div className="w-4/5 bg-gray-100 h-screen  ">
            <Search/>
      {location.pathname === '/admin' && <MainAdmin />}
      <Outlet></Outlet> 
      </div>
    </div>
   
  
  </>
  )
}

export default Admin
