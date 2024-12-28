import React from 'react'
import StatisticsDay from './users/compoinents/pages/StatisticsDay'
import SpendingChart from './users/compoinents/pages/Chart-Colums/ChartColums'
import PieChart from './users/compoinents/pages/Chart-Colums/PieChart'

const MainHome = () => {
  return (
    <div className='w-[90%]  m-auto flex flex-col justify-center items-center'>
         <StatisticsDay/>
        <div className='w-full mt-3 flex justify-center  bg-white  '>
<div className='w-[90%] grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
<SpendingChart/>
       
       <PieChart/>
</div>
       
       </div>
    </div>
  )
}

export default MainHome
