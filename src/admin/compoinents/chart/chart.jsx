import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getData } from '../../../redux/TrackExpense_Thunk';
import email from '../../../redux/Get_email';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF5A5F', '#FF7A45', '#00A8E8', '#F1E189', '#FF4949', '#85C1E9', '#F5B041'];

const groupByMonth = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const month = new Date(item.date).getMonth(); // Lấy chỉ số tháng (0-11)
    if (!acc[month]) {
      acc[month] = { name: new Date(item.date).toLocaleString('default', { month: 'short' }), value: 0 };
    }
    acc[month].value += item.amountInt;
    return acc;
  }, {});

  return Object.values(groupedData);
};

const Chart = () => {
  const dispatch = useDispatch();
  const resultAll = useSelector(state => state.TrackExpense.TrackExpense);
  const result = resultAll && email ? resultAll.filter(item=>item.email ===email) : []

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const data = result ? groupByMonth(result) : [];



  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
