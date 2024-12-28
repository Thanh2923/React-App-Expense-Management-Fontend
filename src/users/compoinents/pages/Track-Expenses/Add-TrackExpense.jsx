import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTrackExpense } from '../../../../redux/TrackExpense_Thunk';
import { getData } from '../../../../redux/Category_Thunk';

import { toast } from 'react-toastify';

const AddTrackExpense = ({ onClose }) => {
  let dispatch = useDispatch();
  const Category = useSelector(state => state.Category.Category);
  useEffect(() => {
    if(user && user.email){
      dispatch(getData(user.email));
    }
  }, [dispatch]);

  // Lấy ngày hiện tại và cài đặt ngày mặc định
  const currentDate = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD
  let today = new Date();

  // Trừ 10 ngày từ ngày hiện tại
  today.setDate(today.getDate() - 10);
  
const formattedDate = today.toISOString().split('T')[0]; // Định dạng YYYY-MM-DD

console.log(formattedDate); // In ra ngày cách đây 10 ngày

  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(currentDate);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  // State để lưu lỗi từng trường
  const [expenseNameError, setExpenseNameError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const [user,setUser] =  useState(null)
   useEffect(() => {
     const storedUser = localStorage.getItem('user');
     if (storedUser!==null) {
       setUser(JSON.parse(storedUser));
     }else{
       setUser("user")
     }
   }, []);
  // Kiểm tra lỗi form
  const validateForm = () => {
    let isValid = true;

    // Kiểm tra expenseName
    if (!expenseName) {
      setExpenseNameError("Tên chi phí là bắt buộc!");
      isValid = false;
    } else {
      setExpenseNameError('');
    }

    // Kiểm tra amount
    if (!amount) {
      setAmountError("Số tiền là bắt buộc!");
      isValid = false;
    } else if (isNaN(amount)) {
      setAmountError("Số tiền phải là một số!");
      isValid = false;
    } else {
      setAmountError('');
    }

    // Kiểm tra date
    if (!date) {
      setDateError("Ngày là bắt buộc!");
      isValid = false;
    } else {
      setDateError('');
    }

    // Kiểm tra category
    if (!category) {
      setCategoryError("Chọn loại chi phí là bắt buộc!");
      isValid = false;
    } else {
      setCategoryError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Không gửi dữ liệu nếu có lỗi
    }
    let email = user.email
    let amountInt = parseInt(amount);
    let newTrackExpense = { name: expenseName, amountInt, date, description, category, email };
    dispatch(addNewTrackExpense(newTrackExpense));
    toast.success("Thêm mới thành công!");
    onClose(); // Đóng form sau khi gửi dữ liệu
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[40%] mx-auto bg-white shadow-md rounded-md p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Thêm Chi Phí</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="expenseName">
                Tên Chi Phí
              </label>
              <input
                type="text"
                id="expenseName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                placeholder="Nhập tên chi phí"
              />
              {expenseNameError && <p className="text-red-500 text-sm">{expenseNameError}</p>}
            </div>
            <div className="w-1/2">
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
              />
              {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
              Ngày
            </label>
            <input
              type="date"
              id="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={formattedDate} // Ngày không được nhỏ hơn ngày hiện tại
            />
            {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
              Mô Tả
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
              Chọn loại chi phí
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
            {categoryError && <p className="text-red-500 text-sm">{categoryError}</p>}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Thêm Chi Phí
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrackExpense;
