import { NavLink } from 'react-router-dom';
function Sidebar() {

    return (
        <div className="w-1/5 shadow-lg bg-white rounded-lg text-black">
<h2 className="text-2xl font-bold p-4">Quản Lý Chi Tiêu</h2>
<hr />
<ul>
<li className='my-3 block '>
          <NavLink
            to="UserTable"
            className="hover:bg-[#3399FF] px-3   w-full block  py-2 rounded"
            activeClassName="bg-gray-900"
            exact
          >
            Quản Lý User
          </NavLink>
          <hr />
        </li>
        <li>
          <NavLink
            to="/admin"
            className="hover:bg-[#3399FF] px-3 py-2  w-full block rounded"
            activeClassName="bg-gray-900"
            exact
          >
            Quản Lý Chi Tiêu User
          </NavLink>
        </li>
</ul>
</div>
    )
    
}
export default Sidebar