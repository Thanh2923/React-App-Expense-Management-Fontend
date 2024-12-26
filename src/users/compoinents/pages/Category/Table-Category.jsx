import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCategory from './Add-Category';
import EditCategory from './Edit-Category';
import axios from "axios";
import { deleteCategoryId, getData } from '../../../../redux/Category_Thunk';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmDelete from '../ConfirmDelete';
import LoginReminder from '../LoginReminder';

const TableCategorys = () => {
  const [user,setUser] =  useState(null)
    const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [showForm, setShowForm] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [idItem, setIdItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // State để điều khiển việc ẩn thông báo

  // Hàm đóng thông báo
  const handleShowReminder = () => {
    setIsVisible(true);
  };

  const dispatch = useDispatch();
  const Category = useSelector(state => state.Category.Category);

  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
    setShowEditForm(true);
  };

  const handleOpenModal = (id) => {
    setIdItem(id);
    openModal();
  };

  const handleDelete = () => {
    dispatch(deleteCategoryId(idItem));
    toast.success("Xoá thành công !");
    closeModal();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser!==null) {
      setUser(JSON.parse(storedUser));
    }else{
      setUser("user")
    }
  }, []);


  

  // Lấy dữ liệu danh mục sau khi user được xác nhận
  useEffect(() => {
    if (user) {
      // Chỉ gọi getData nếu user đã được xác nhận
      if (user?.email) {
        dispatch(getData(user.email));
      } else {
        dispatch(getData());
      }
    }
  }, [user, dispatch]); // Gọi lại khi user thay đổi

  

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <LoginReminder isVisible={isVisible} setIsVisible={setIsVisible} />
      <ConfirmDelete isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete} />
      {user && user?.email ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-500 text-white px-4 py-2 mb-6 rounded mr-2"
        >
          Thêm Mới Danh Mục
        </button>
      ) : (
        <button
          onClick={handleShowReminder}
          className="bg-amber-500 text-white px-4 py-2 mb-6 rounded mr-2"
        >
          Thêm Mới Danh Mục
        </button>
      )}

      {showEditForm && <EditCategory expense={currentExpense} onClose={() => setShowEditForm(false)} />}
      {showForm && <AddCategory onClose={() => setShowForm(false)} />}

      <table className="min-w-full bg-white">
        <thead className="bg-slate-600 text-white">
          <tr>
            <th className="w-1/7 py-2">ID</th>
            <th className="w-1/4 py-2">Chi Phí</th>
            <th className="w-1/4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {Category.map((item, index) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{item.name}</td>
              <td className="py-2 flex justify-center gap-2">
                {user && user?.email ? (
                  <>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenModal(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleShowReminder}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleShowReminder}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCategorys;
