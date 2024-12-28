  import { useEffect, useState } from 'react';
  import AddTrackExpense from './Add-TrackExpense';
  import EditTrackExpense from './Edit-TrackExpense';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTrackExpenseid, getData } from '../../../../redux/TrackExpense_Thunk';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmDelete from '../ConfirmDelete';
import Pagination from '../Pagination';
import LoginReminder from '../LoginReminder';
import Nothing from '../nothing';

  const TableExpense = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [idItem,setIdItem] = useState(null)
    const [isOpen, setIsOpen] = useState(false); 
    const dispatch = useDispatch();
    const expenseFixed = useSelector(state => state.TrackExpense.TrackExpense);
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
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
      setCurrentPage(page);
      navigate(`/Track-Expense?page=${page}`);
    };
    const formatNumber = (number) => {
      return number.toLocaleString('vi-VN');
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleOpenModal = (id) => {
      setIdItem(id)
      openModal();
    };
    useEffect(()=>{
     if(user){
      if( user.email){
        dispatch(getData({email:user.email,page:currentPage,limit:5}))
      }else{
        dispatch(getData({page:currentPage,limit:5}))
      }
     }
      
    },[user,currentPage,dispatch])
    const handleEdit = (expense) => {
      setEditingExpense(expense);
    };

    const handleDelete = () => {
      dispatch(deleteTrackExpenseid(idItem))
      toast.success("Xoá thành công !");
      closeModal();
    };



    return (

      <div className="container lg:text-md text-sm mx-auto p-4">
        <ToastContainer/>
      <LoginReminder isVisible={isVisible} setIsVisible={setIsVisible}/>
              <ConfirmDelete isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete}/>
        
      {user && user?.email ?   <button
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
        {showForm && <AddTrackExpense onClose={() => setShowForm(false)} />}
        {editingExpense && (
          <EditTrackExpense
            expense={editingExpense}
            onClose={() => setEditingExpense(null)}
           
          />
        )}
{expenseFixed  && expenseFixed?.data?.length > 0 ? <table className={`min-w-full bg-white ${showForm || editingExpense ? 'opacity-50' : ''}`}>
          <thead className="bg-slate-600 text-white">
            <tr>
              <th className="w-1/7 py-2">ID</th>
              <th className="w-1/7 py-2">Chi Phí </th>
              <th className="w-1/7 py-2">Tiền</th>
              <th className="w-1/7 py-2">Ngày Tháng Năm</th>
              <th className="w-1/7 py-2">Mô Tả</th>
              <th className="w-1/7 py-2">Danh Mục</th>
              <th className="w-1/7 py-2">Hành Động</th>
            </tr>
          </thead>
          {}
          <tbody>
            { expenseFixed?.data && expenseFixed.data.map((expense,index) => (
              <tr key={index} className="text-center border-b">
                <td className="py-2">{index+1}</td>
                <td className="py-2">{expense.name}</td>
                <td className="py-2">{formatNumber(expense.amountInt)}</td>
                <td className="py-2">{expense.date}</td>
                <td className="py-2">{expense.description}</td>
                <td className="py-2">{expense.category}</td>
                
                <td className="py-2 flex justify-center">
                 {user && user?.email ? 
                <>
                 <button
                    onClick={() => handleEdit(expense)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button onClick={(e)=>handleOpenModal(expense._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete

                  </button>
                </> 
                :
                <>
                 <button
                    onClick={handleShowReminder}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button onClick={handleShowReminder} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete

                  </button>
                </>
                }
                </td>
              </tr>
            ))}
          </tbody>
        
        </table> : <Nothing/> }

       <div className='w-full mt-5'>
       <Pagination
        
        currentPage={currentPage}
        totalPages={expenseFixed?.totalPages}
        onPageChange={handlePageChange}
      />
       </div>
      </div>
    );
  };

  export default TableExpense
