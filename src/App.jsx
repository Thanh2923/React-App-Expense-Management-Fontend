import { Outlet,useLocation } from "react-router-dom"
import Sidebar from "./users/compoinents/layouts/sidebar"
import ChartColums from "./users/compoinents/pages/Chart-Colums/ChartColums";

function App() {
    const location = useLocation();
    return (
   <>
   <Sidebar/>
    <div className="w-[80%] m-auto ">
    {location.pathname === '/' && <ChartColums/>}
    </div>
   <Outlet/>

   </>
    )
    
}
export default App