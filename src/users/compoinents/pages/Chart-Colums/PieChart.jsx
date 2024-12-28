import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Import Pie chart từ react-chartjs-2
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../../redux/TrackExpense_Thunk';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Đăng ký các phần tử cần thiết cho biểu đồ tròn
import './SpendingChart.css';

// Đăng ký các phần tử cần thiết cho Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [user,setUser] =  useState(null)
  const dispatch = useDispatch();
  const [spendingData, setSpendingData] = useState({
    labels: [],
    datasets: [{
      label: 'Chi tiêu (VND)',
      data: [],
      backgroundColor: [
        'rgba(75, 192, 192, 1)', // Màu sắc cho từng phần
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
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
    if (user.email) {
        dispatch(getData({email:user.email}));
      }else{
        dispatch(getData({}));
  
      }
   }
  }, [user,dispatch]);

  useEffect(() => {
    // Chỉ thực hiện xử lý khi có dữ liệu chi tiêu từ Redux
    if (expenseFixed && expenseFixed.data) {
      const groupedData = expenseFixed.data.reduce((acc, { category, amountInt }) => {
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amountInt;
        return acc;
      }, {});

      const labels = Object.keys(groupedData); // Các danh mục chi tiêu
      const data = Object.values(groupedData); // Tổng chi tiêu theo danh mục

      // Tính tổng chi tiêu
      const totalSpending = data.reduce((sum, amount) => sum + amount, 0);

      // Tính tỷ lệ phần trăm cho mỗi danh mục
      const percentageData = data.map(amount => ((amount / totalSpending) * 100).toFixed(2));
     
   
      // Cập nhật dữ liệu biểu đồ với tỷ lệ phần trăm
      setSpendingData({
        labels: labels.map((label, index) => `${label} ${data[index]}  (${percentageData[index]}%)`), // Thêm phần trăm vào label
        datasets: [{
          label: 'Chi tiêu (VND)',
          data: data,
          backgroundColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1,
        }],
      });
    }
  }, [expenseFixed]);

  // Tùy chỉnh cấu hình biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Vị trí của legend (chú thích)
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const value = tooltipItem.raw; // Lấy giá trị chi tiêu
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0); // Tính tổng chi tiêu
            const percentage = ((value / total) * 100).toFixed(2); // Tính tỷ lệ phần trăm
            return `${tooltipItem.label}: ${value.toLocaleString()} VND (${percentage}%)`; // Hiển thị thông tin chi tiêu và phần trăm
          }
        }
      }
    }
  };

  return (
    <div className='w-full lg:w-[70%]' style={{ margin: '0 auto' }}>
      <h2 className='text-left mt-3'>Biểu đồ chi tiêu theo danh mục</h2>
      <Pie className='mb-10' data={spendingData} o  ptions={options} />
    </div>
  );
};

export default PieChart;
