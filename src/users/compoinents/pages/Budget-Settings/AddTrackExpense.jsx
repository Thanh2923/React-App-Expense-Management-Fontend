// AddTrackExpense.js

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBudgetSetting } from '../../../../redux/BudgetSetting_Thunk';
import { getData } from '../../../../redux/Category_Thunk';
import { toast } from 'react-toastify';
const AddTrackExpense = ({ onClose }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const Category = useSelector(state => state.Category.Category);
  const [user,setUser] =  useState(null)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser!==null) {
      setUser(JSON.parse(storedUser));
    }else{
      setUser("user")
    }
  }, []);
  useEffect(()=>{
    if(user && user.email){
      dispatch(getData(user.email))
    }
  },[user,dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewBudgetSetting({ category, amount: parseFloat(amount) ,email:user.email}));
    toast.success("Thêm mới thành công !")
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[30%] mx-auto bg-white shadow-md rounded-md p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Thêm Ngân Sách</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
              Chọn loại chi phí
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            >
              <option value="" disabled>
      Chọn loại chi phí
    </option>
             {Category.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
              Tiền
            </label>
            <input
              type="text"
              id="amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Nhập số tiền"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Thêm Mới Ngân Sách
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrackExpense;
