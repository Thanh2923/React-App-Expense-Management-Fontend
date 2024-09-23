import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getData } from '../../../../redux/TrackExpense_Thunk';
import email from '../../../../redux/Get_email';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const groupByMonth = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const month = new Date(item.date).getMonth(); // Lấy chỉ số tháng (0-11)
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += item.amountInt;
    return acc;
  }, Array(12).fill(0));

  return groupedData;
};

const ChartColums = () => {
  const dispatch = useDispatch();
  const resultAll = useSelector(state => state.TrackExpense.TrackExpense);
  const result = resultAll && email ? resultAll.filter(item=> item.email ===email) : []
  

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const monthlyExpenses = result ? groupByMonth(result) : [];

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Expenses',
        data: monthlyExpenses,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expenses for the Year',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (in USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartColums;
