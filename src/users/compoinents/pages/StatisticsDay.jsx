import React, {useState, useEffect } from 'react'
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiTakeMyMoney,GiMoneyStack ,GiBanknote  } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { getTotalExpenseFixedByEmail } from '../../../redux/total_Thunk';
const StatisticsDay = () => {
    const dispatch = useDispatch();
    const [user,setUser] =  useState(null)
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser!==null) {
        setUser(JSON.parse(storedUser));
      }else{
        setUser("user")
      }
    }, []);
  const total = useSelector((state) => state.total.total);

  useEffect(()=>{
   if(user){
    if( user.email){
        dispatch(getTotalExpenseFixedByEmail(user.email))
    }else{
       
        dispatch(getTotalExpenseFixedByEmail({}))
       
    }
   }
  
  },[user,dispatch])

  const formatNumber = (number) => {
    return number ? number.toLocaleString('vi-VN') : '0';
  };
  return (
    <div className='w-full px-5 flex flex-col items-center bg-white'>
        <div className=' w-full py-3 border-b-[1px] '>
          <h3 className='text-lg font-bold uppercase'>Thống kê chi tiêu hàng ngày</h3>
        </div>
       <div className='w-full flex items-center'>
       <div className='w-[25%] py-4 items-center gap-2 flex'>
        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-red-500'>
        <MdOutlineAttachMoney className='text-white text-lg' />
        </div>
         <div className='flex flex-col w-[80%]'>
            <h3 className='text-red-400 text-xl font-semibold'>{formatNumber(total ? total.totalExpenseTracking : 0)}</h3>
            <p className='text-slate-400 text-sm pt-2 font-semibold'>Chi phí </p>
            <span className='text-slate-400 text-sm'>( tiền ăn sáng,trưa, tối ,tiền đi chơi, tiền xăng xe hằng ngày...)</span>
         </div>

        </div>

        <div className='w-[25%] py-4 items-center gap-2 flex'>
        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-orange-500'>
        <GiBanknote className='text-white text-lg' />
        </div>
         <div className='flex flex-col w-[80%]'>
            <h3 className='text-orange-400 text-xl font-semibold'>{formatNumber(total ? total.totalFixedExpense : 0)}</h3>
            <p className='text-slate-400 text-sm pt-2 font-semibold'>Chi phí cố định hàng tháng</p>
            <span className='text-slate-400 text-sm'>( tiền điện , tiền nước, tiền thuê trọ cố định...)</span>
         </div>

        </div>

        <div className='w-[25%] py-4 items-center gap-2 flex'>
        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-green-500'>
        <GiTakeMyMoney className='text-white text-lg' />
        </div>
         <div className='flex flex-col w-[80%]'>
            <h3 className='text-green-400 text-xl font-semibold'>{formatNumber(total ? total.totalBudgetSettings : 0)}</h3>
            <p className='text-slate-400 text-sm pt-2 font-semibold'>Ngân sách theo danh mục     </p>
            <span className='text-slate-400 text-sm'>( tổng tiền ăn uống, tiền xăng xe, tiền giải trí theo danh mục... )</span>

         </div>

        </div>

        <div className='w-[23%] py-4 items-center gap-2 flex'>
        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-blue-500'>
        <GiMoneyStack className='text-white text-lg' />
        </div>
         <div className='flex flex-col w-[80%]'>
            <h3 className='text-blue-400 text-xl font-semibold'>{formatNumber(total ? total.total : 0)}</h3>
            <p className='text-slate-400 text-sm pt-2 font-semibold'>Tổng ngân sách </p>
            <span className='text-slate-400 text-sm'>( tổng ngân sách hàng tháng của bạn. )</span>

         </div>

        </div>
       </div>
    </div>
  )
}

export default StatisticsDay
