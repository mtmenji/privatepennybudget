import React, { useState } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import Ratio from './Ratio';

const Gallery = ({ selectedBudgetId, selectedMonth, selectedYear }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const components = [
    <PieChart selectedBudgetId={selectedBudgetId} />,
    <BarChart selectedMonth={selectedMonth} selectedYear={selectedYear} selectedBudgetId={selectedBudgetId} />,
    <Ratio selectedMonth={selectedMonth} selectedYear={selectedYear} />
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? components.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === components.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='flex items-center justify-center'>
      <button 
        onClick={handlePrev} 
        className='bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200 material-symbols-outlined'
      >
        arrow_back_ios
      </button>
      
      <div className='flex justify-center items-center'>
        {selectedBudgetId && components[currentIndex]}
      </div>
      
      <button 
        onClick={handleNext} 
        className='bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200 material-symbols-outlined'
      >
        arrow_forward_ios
      </button>
    </div>
  );
};

export default Gallery;