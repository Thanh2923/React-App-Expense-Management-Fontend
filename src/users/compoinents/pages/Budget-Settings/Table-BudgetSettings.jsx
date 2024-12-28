// TableBudgetSettings.js

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetSettings, deleteBudgetSettingById } from '../../../../redux/BudgetSetting_Thunk'
import AddTrackExpense from './AddTrackExpense';
import EditTrackExpense from './EditTrackExpense';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmDelete from '../ConfirmDelete';
import LoginReminder from '../LoginReminder';
import Nothing from '../nothing';
const TableBudgetSettings = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [idItem,setIdItem] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const dispatch = useDispatch();
  const budgetSettings = useSelector((state) => state.budget.budgetSettings);
  const [isVisible, setIsVisible] = useState(false); // State để điều khiển việc ẩn thông báo
  const [user,setUser] =  useState(null)
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser!==null) {
        setUser(JSON.parse(storedUser));
      }else{
        setUser("user")
      }
    }, []);
  const handleShowReminder = () => {
    setIsVisible(true);
  };
  const formatNumber = (number) => {
    return number.toLocaleString('vi-VN');
  };
  useEffect(() => {
   if(user){
    if( user.email){
      dispatch(getBudgetSettings(user.email));
    }else{
      dispatch(getBudgetSettings());
    }
   }

  }, [user,dispatch]);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = ()=>{
    dispatch(deleteBudgetSettingById(idItem))
    toast.success("Xoá thành công !");
    closeModal()
  }
  const handleOpenModal = (id) => {
    setIdItem(id)
    openModal();
  };
  


  const handleSave = (updatedExpense) => {
    setEditingExpense(null);
  };

  return (
    
    <div className="container mx-auto p-4">
      <ToastContainer/>
      <LoginReminder isVisible={isVisible} setIsVisible={setIsVisible}/>
            <ConfirmDelete isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete}/>
     {user && user?.email ? 
     <button
     onClick={() => setShowForm(true)}
     className="bg-amber-500 text-white px-4 py-2 mb-6 rounded mr-2"
   >
     Thêm Mới Ngân Sách
   </button> 
   :
   <button
   onClick={handleShowReminder}
   className="bg-amber-500 text-white px-4 py-2 mb-6 rounded mr-2"
 >
   Thêm Mới Ngân Sách
 </button> 
    }
      {showForm && <AddTrackExpense onClose={() => setShowForm(false)} />}
      {editingExpense && (
        <EditTrackExpense
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={handleSave}
        />
      )}
   {budgetSettings  && budgetSettings?.length > 0 ?    <table className={`min-w-full bg-white ${showForm || editingExpense ? 'opacity-50' : ''}`}>
        <thead className="bg-slate-600 text-white">
          <tr>
            <th className="w-1/7 py-2">ID</th>
            <th className="w-1/5 py-2">Ngân Sách Danh Mục</th>
            <th className="w-1/5 py-2">Tiền</th>
            <th className="w-1/4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {budgetSettings.map((expense,index) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2">{index+1}</td>
              <td className="py-2">{expense.category}</td>
              <td className="py-2">{formatNumber(expense.amount ? expense.amount : 0)}</td>
              <td className="py-2 flex">
                {user && user?.email? <>
                  <button
                  onClick={() => handleEdit(expense)}
                  className="bg-slate-600 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleOpenModal(expense._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                </>
              : 
              <>
              <button
                   onClick={handleShowReminder}
                  className="bg-slate-600 text-white px-4 py-2 rounded mr-2"
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
              }
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <Nothing/> }
    </div>
  );
};

export default TableBudgetSettings;
