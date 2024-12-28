import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddExpenseFixed from './AddExpenseFixed';
import EditExpenseFixed from './EditExpenseFixed';
import { getDataExpenseFixed, deleteExpenseId } from '../../../../redux/ExpenseFixed_Thunk';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmDelete from '../ConfirmDelete';
import LoginReminder from '../LoginReminder';
import Nothing from '../nothing';
const ExpenseFixed = () => {
  const [user,setUser] =  useState(null)
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [idItem,setIdItem] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State để điều khiển việc ẩn thông báo
  // Hàm đóng thông báo

  // Hàm xử lý khi nhấn nút "Hiển thị thông báo"
  const handleShowReminder = () => {
    setIsVisible(true);
  };
  
  const dispatch = useDispatch();
  const formatNumber = (number) => {
    return number ? number.toLocaleString('vi-VN') : '0';
  };
  const expenseFixed = useSelector(state => state.ExpenseFixed.ExpenseFixed);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
   useEffect(() => {
     const storedUser = localStorage.getItem('user');
     if (storedUser!==null) {
       setUser(JSON.parse(storedUser));
     }else{
       setUser("user")
     }
   }, []);
 

  useEffect(() => {
 if(user){
  if(user.email){
    dispatch(getDataExpenseFixed(user.email));
   }else{
    dispatch(getDataExpenseFixed());
   }
 }
   
  }, [user,dispatch]);

 
  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
    setShowEditForm(true);
  };


   const handleDelete = ()=>{
      dispatch(deleteExpenseId(idItem))
      toast.success("Xoá thành công !");
      closeModal()
    }
    const handleOpenModal = (id) => {
      setIdItem(id)
      openModal();
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
      Thêm Mới Chi Phí
    </button> 
    :
    <button
        onClick={handleShowReminder}
        className="bg-amber-500 text-white px-4 py-2 mb-6 rounded mr-2"
      >
        Thêm Mới Chi Phí
      </button> 
      }
      {showForm && <AddExpenseFixed onClose={() => setShowForm(false)} />}
      {showEditForm && (
        <EditExpenseFixed
          expense={currentExpense}
          onClose={() => setShowEditForm(false)}
        />
      )}
  {expenseFixed  && expenseFixed?.length > 0 ?      <table className="min-w-full bg-white">
        <thead className="bg-slate-600 text-white">
          <tr>
            <th className="w-1/4 py-2">ID</th>
            <th className="w-1/4 py-2">Chi Phí Cố Định</th>
            <th className="w-1/4 py-2">Tiền</th>
            <th className="w-1/4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {expenseFixed.map((expense,index) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2">{index+1}</td>
              <td className="py-2">{expense.name}</td>
              <td className="py-2">{formatNumber(expense.amount)}</td>
              <td className="py-2 flex justify-center gap-2">
               {
                user && user?.email ? 
                <>
                 <button
                  onClick={() => handleEditClick(expense)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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
                : <>
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
               }
              </td>
            </tr>
          ))}
          
        </tbody>
      </table> : <Nothing/> }
    </div>
  );
};

export default ExpenseFixed;
