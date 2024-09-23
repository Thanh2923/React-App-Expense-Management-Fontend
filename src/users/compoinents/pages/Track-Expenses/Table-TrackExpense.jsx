  import { useEffect, useState } from 'react';
  import AddTrackExpense from './Add-TrackExpense';
  import EditTrackExpense from './Edit-TrackExpense';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrackExpenseid, getData } from '../../../../redux/TrackExpense_Thunk';
import {  toast } from 'react-hot-toast';
import email from '../../../../redux/Get_email';

  const TableExpense = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const dispatch = useDispatch();
    const expenseFixedAll = useSelector(state => state.TrackExpense.TrackExpense);
    const expenseFixed = expenseFixedAll && email ? expenseFixedAll.filter(item=>item.email ===email) : [];
    const formatNumber = (number) => {
      return number.toLocaleString('vi-VN');
    };
    useEffect(()=>{
      dispatch(getData())
    },[dispatch])
    const handleEdit = (expense) => {
      setEditingExpense(expense);
    };

    const handlDelete = (id) => {
      dispatch(deleteTrackExpenseid(id)).then(() => {
        dispatch(getData()); 
        toast.success("Xóa thành công !")
        // Fetch data again after deletion
      });
    };

    return (
      <div className="container mx-auto p-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-500 text-white px-4 py-2 mb-6 rounded mr-2"
        >
          Thêm Mới Chi Phí
        </button>
        {showForm && <AddTrackExpense onClose={() => setShowForm(false)} />}
        {editingExpense && (
          <EditTrackExpense
            expense={editingExpense}
            onClose={() => setEditingExpense(null)}
           
          />
        )}
        <table className={`min-w-full bg-white ${showForm || editingExpense ? 'opacity-50' : ''}`}>
          <thead className="bg-slate-600 text-white">
            <tr>
              <th className="w-1/7 py-2">ID</th>
              <th className="w-1/5 py-2">Chi Phí </th>
              <th className="w-1/5 py-2">Tiền</th>
              <th className="w-1/4 py-2">Ngày Tháng Năm</th>
              <th className="w-1/4 py-2">Mô Tả</th>
              <th className="w-1/4 py-2">Danh Mục</th>
              <th className="w-1/4 py-2">Hành Động</th>
            </tr>
          </thead>
          {}
          <tbody>
            {expenseFixedAll.map((expense) => (
              <tr key={expense.id} className="text-center border-b">
                <td className="py-2">{expense.id}</td>
                <td className="py-2">{expense.name}</td>
                <td className="py-2">{formatNumber(expense.amountInt)}</td>
                <td className="py-2">{expense.date}</td>
                <td className="py-2">{expense.description}</td>
                <td className="py-2">{expense.category}</td>
                
                <td className="py-2 flex">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button onClick={(e)=>handlDelete(expense.id)} className="bg-red-500 text-white px-4 py-2 rounded">
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

  export default TableExpense
