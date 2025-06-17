import React from 'react';

const MonthSelector = ({ selectedMonth, setSelectedMonth, setCurrentActiveMonth }) => {
    return (
        <div className='months'>
            <ul>
                {[...Array(12)].map((_, index) => {
                    const month = index + 1;
                    const monthName = new Date(0, month - 1).toLocaleString('default', { month: 'long' });
                    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
                    return (
                        <li key={month} onClick={() => {
                            setSelectedMonth(month);
                            setCurrentActiveMonth(capitalizedMonth);
                        }} className={selectedMonth === month ? "active" : ''}>
                            {capitalizedMonth}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MonthSelector;