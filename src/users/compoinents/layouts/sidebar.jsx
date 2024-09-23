import { NavLink } from 'react-router-dom';
import email from '../../../redux/Get_email';
const Sidebar = () => {
  return (
    <nav className="bg-[#0099FF] text-white p-4 relative h-full">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            className="hover:bg-[#3366CC] px-3 py-2 rounded"
            activeClassName="bg-gray-900"
            exact
          >
            Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Category"
            className="hover:bg-[#3366CC] px-3 py-2 rounded"
            activeClassName="bg-gray-900"
          >
            Danh mục
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ExpenseFixed"
            className="hover:bg-[#3366CC] px-3 py-2 rounded"
            activeClassName="bg-gray-900"
          >
            Chi tiêu cố định
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Track-Expense"
            className="hover:bg-[#3366CC] px-3 py-2 rounded"
            activeClassName="bg-gray-900"
          >
            Theo dõi chi phí
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/budget-settings"
            className="hover:bg-[#3366CC] px-3 py-2 rounded"
            activeClassName="bg-gray-900"
          >
            Cài đặt ngân sách
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Total-Expense"
            className="hover:bg-[#3366CC] px-3 py-2 rounded"
            activeClassName="bg-gray-900"
          >
            Tổng quan về chi phí
          </NavLink>
        </li>
      </ul>
      <div className="absolute bottom-4  right-4 flex items-center space-x-2">
        <img
          className="w-10 h-10 rounded-full"
          src="https://png.pngtree.com/png-vector/20240807/ourlarge/pngtree-customer-care-who-gives-directions-in-front-of-the-laptop-png-image_13132010.png"
          alt="Avatar"
        />
        <h3 className="text-white font-semibold">{email}</h3>
      </div>
    </nav>
  );
};

export default Sidebar;
