import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddExpenseFixed from './AddExpenseFixed';
import EditExpenseFixed from './EditExpenseFixed';
import { getDataExpenseFixed, deleteExpenseId } from '../../../../redux/ExpenseFixed_Thunk';
import { addTatal, getTatal } from '../../../../redux/SliceExpenseFixed';
import {  toast } from 'react-hot-toast';
import email from '../../../../redux/Get_email';
const ExpenseFixed = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const dispatch = useDispatch();
  const formatNumber = (number) => {
    return number ? number.toLocaleString('vi-VN') : '0';
  };
  const expenseFixedAll = useSelector(state => state.ExpenseFixed.ExpenseFixed);
  const expenseFixed = expenseFixedAll && email 
  ? expenseFixedAll.filter(item => item.email === email) 
  : [];
  
  let tatal = 0 
    expenseFixed.forEach(element => {
     tatal+=element.amount
   });
   
   console.log(tatal)

 

  useEffect(() => {
    dispatch(getDataExpenseFixed());
  }, [dispatch]);

  useEffect(() => {
    
    dispatch(getTatal());
  }, [dispatch, expenseFixed]);

  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
    setShowEditForm(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteExpenseId(id));
    toast.success("Xóa thành công !")
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setShowForm(true)}
        className="bg-amber-500 text-white px-4 py-2 mb-6 rounded mr-2"
      >
        Thêm Mới Chi Phí
      </button>
      {showForm && <AddExpenseFixed onClose={() => setShowForm(false)} />}
      {showEditForm && (
        <EditExpenseFixed
          expense={currentExpense}
          onClose={() => setShowEditForm(false)}
        />
      )}
      <table className="min-w-full bg-white">
        <thead className="bg-slate-600 text-white">
          <tr>
            <th className="w-1/4 py-2">ID</th>
            <th className="w-1/4 py-2">Chi Phí Cố Định</th>
            <th className="w-1/4 py-2">Tiền</th>
            <th className="w-1/4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {expenseFixedAll.map((expense) => (
            <tr key={expense.id} className="text-center border-b">
              <td className="py-2">{expense.id}</td>
              <td className="py-2">{expense.name}</td>
              <td className="py-2">{formatNumber(expense.amount)}</td>
              <td className="py-2 flex justify-center gap-2">
                <button
                  onClick={() => handleEditClick(expense)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(expense.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
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

export default ExpenseFixed;
