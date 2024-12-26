import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../../redux/TrackExpense_Thunk';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './SpendingChart.css';

// Đăng ký các phần tử cần thiết cho Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SpendingChart = () => {
  const dispatch = useDispatch();
  const [user,setUser] =  useState(null)
  const [spendingData, setSpendingData] = useState({
    labels: [],
    datasets: [{
      label: 'Chi tiêu (VND)',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.4,
    }],
  });

  const expenseFixed = useSelector(state => state.TrackExpense.TrackExpense);
  
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
    if ( user.email) {
      dispatch(getData({}));
    }else{
          dispatch(getData({}));
    
        }
   }
  }, [user,dispatch]);

  useEffect(() => {
    console.log(expenseFixed)
   
    if (expenseFixed && expenseFixed.data ) {
      const groupedData = expenseFixed.data.reduce((acc, { date, amountInt }) => {
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += amountInt;
        return acc;
      }, {});

      const labels = Object.keys(groupedData); // Các ngày chi tiêu
      const data = Object.values(groupedData); // Tổng chi tiêu theo ngày

      // Cập nhật dữ liệu biểu đồ
      setSpendingData({
        labels,
        datasets: [
          {
            label: 'Chi tiêu (VND)',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      });
    }
  }, [expenseFixed]); // Phụ thuộc vào `expenseFixed` để xử lý khi dữ liệu thay đổi

  // Tùy chỉnh cấu hình biểu đồ
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Bắt đầu trục y từ 0
        ticks: {
          stepSize: 100000, // Khoảng cách giữa các giá trị trên trục y
        },
      },
    },
    plugins: {
      legend: {
        position: 'top', // Vị trí của legend (chú thích)
      },
    },
  };

  return (
   
    <div style={{ width: '100%', margin: '0 auto' }}>
      <h2 className='text-left'>Biểu đồ chi tiêu theo ngày</h2>
      <Line data={spendingData} options={options} />
    </div>
  );
};

export default SpendingChart;
