import { Outlet,useLocation } from "react-router-dom"
import Sidebar from "./users/compoinents/layouts/sidebar"
import MainHome from "./MainHome";
import LoginGoogle from "./loginGoogle";

function App() {
    const location = useLocation();
    return (
   <>
  <div className="w-full h-[100vh] bg-slate-50">
  <Sidebar/>
    <div className="w-full mt-[60px]  bg-slate-50 ">
    {location.pathname === '/' && <MainHome/>}
  
   <Outlet/>
    
    </div>
  </div>
  

   </>
    )
    
}
export default App