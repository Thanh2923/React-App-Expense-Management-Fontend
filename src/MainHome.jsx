import React from 'react'
import StatisticsDay from './users/compoinents/pages/StatisticsDay'
import SpendingChart from './users/compoinents/pages/Chart-Colums/ChartColums'
import PieChart from './users/compoinents/pages/Chart-Colums/PieChart'

const MainHome = () => {
  return (
    <div className='w-[90%]  m-auto flex flex-col justify-center items-center'>
         <StatisticsDay/>
        <div className='w-full mt-3 bg-white flex '>
        <div className='w-[60%]'>
        <SpendingChart/>
        </div>
        <div className='w-40%'>
            <PieChart/>
        </div>
        </div>
    </div>
  )
}

export default MainHome
