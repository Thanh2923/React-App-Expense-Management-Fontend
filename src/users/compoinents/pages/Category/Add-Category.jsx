import { useState,useEffect } from 'react';
import { addNewCategory } from '../../../../redux/Category_Thunk';
import { useDispatch  } from 'react-redux'
import { toast } from 'react-toastify';


const AddCategory = ({ onClose }) => {
  let dispatch = useDispatch();
  const [user,setUser] =  useState(null)
  const [expenseName, setExpenseName] = useState('');
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser!==null) {
        setUser(JSON.parse(storedUser));
      }else{
        setUser("user")
      }
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expenseName.trim()) {
      
      dispatch(addNewCategory({
        name: expenseName , email:user.email }));
        toast.success("Thêm mới thành công !")
        onClose()
      setExpenseName('');}
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative lg:w-[30%] w-[70%] mx-auto bg-white shadow-md rounded-md p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Thêm mới Danh mục</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
              required
            />
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

export default AddCategory;
