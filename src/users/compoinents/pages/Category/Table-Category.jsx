import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCategory from './Add-Category';
import EditCategory from './Edit-Category';
import { deleteCategoryId, getData } from '../../../../redux/Category_Thunk';
import {  toast } from 'react-hot-toast';

const TableCategorys = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useDispatch();
  const Categoryq = useSelector(state => state.Category.Category);
  let email = localStorage.getItem("Email");
  const Category =Categoryq && email 
  ? Categoryq.filter(item => item.email === email) 
  : [];
  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
    setShowEditForm(true);
  };
  const handleDeleteClick = (categoryId) => {
    dispatch(deleteCategoryId(categoryId)).then(() => {
      dispatch(getData());
      toast.success("Xóa thành công !")
       // Fetch data again after deletion
    });
    
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setShowForm(true)}
        className="bg-amber-500 text-white px-4 py-2 mb-6 rounded mr-2"
      >
        Thêm Mới Danh Mục
      </button>
      {showEditForm && (
        <EditCategory
      
          expense={currentExpense}
          onClose={() => setShowEditForm(false)}
        />
      )}
      {showForm && (
        <AddCategory
          onClose={() => setShowForm(false)}
        />
      )}
      <table className="min-w-full bg-white">
        <thead className="bg-slate-600 text-white">
          <tr>
            <th className="w-1/7 py-2">ID</th>
            <th className="w-1/4 py-2">Chi Phí</th>
            <th className="w-1/4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {Categoryq.map((item, index) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2">{item.id}</td>
              <td className="py-2">{item.name}</td>
              <td className="py-2 flex justify-center gap-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button 
                onClick={() => handleDeleteClick(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCategorys;
