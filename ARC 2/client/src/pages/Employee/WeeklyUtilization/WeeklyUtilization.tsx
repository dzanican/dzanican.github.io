import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './WeeklyUtilization.css';

// Mock data for the dropdown options
const ACTIVITY_OPTIONS = [
  'Training',
  'Meeting',
  'Development',
  'Testing',
  'Documentation',
  'Support',
  'Other'
];

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

interface Column {
  id: string;
  type: 'srv' | 'activity';
}

const WeeklyUtilization: React.FC = () => {
  const [searchParams] = useSearchParams();
  const weekNumber = searchParams.get('week') || '0';
  
  // State for managing columns
  const [columns, setColumns] = useState<Column[]>([
    { id: 'srv', type: 'srv' } // Initial SRV# column
  ]);
  
  // State for managing hours input
  const [hours, setHours] = useState<{ [key: string]: { [key: string]: string } }>(
    DAYS_OF_WEEK.reduce((acc, day) => ({
      ...acc,
      [day]: columns.reduce((cols, col) => ({
        ...cols,
        [col.id]: ''
      }), {})
    }), {})
  );

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: `activity_${columns.length}`,
      type: 'activity'
    };
    
    setColumns([...columns, newColumn]);
    
    // Add new column to hours state
    setHours(prevHours => {
      const newHours = { ...prevHours };
      Object.keys(newHours).forEach(day => {
        newHours[day] = {
          ...newHours[day],
          [newColumn.id]: ''
        };
      });
      return newHours;
    });
  };

  const handleHourChange = (day: string, columnId: string, value: string) => {
    // Only allow numbers and empty string
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setHours(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [columnId]: value
        }
      }));
    }
  };

  // Calculate total hours for each day
  const calculateDayTotal = (day: string) => {
    return Object.values(hours[day])
      .reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
  };

  return (
    <div className="utilization-container">
      <div className="utilization-header">
        <h1>Weekly Utilization Report</h1>
        <div className="date-range">
          <div className="date-input">
            <label>Week Starting</label>
            <input type="date" />
          </div>
          <div className="date-input">
            <label>Week Ending</label>
            <input type="date" />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="utilization-table">
          <colgroup>
            <col className="day-column" />
            <col className="srv-column" />
            {columns.map((col, index) => (
              index > 0 && <col key={col.id} className="activity-column" />
            ))}
            <col className="add-column" />
            <col className="day-total" />
          </colgroup>
          <thead>
            <tr>
              <th className="day-column">Day</th>
              <th className="srv-column">SRV#</th>
              {columns.map((col, index) => (
                index > 0 && (
                  <th key={col.id} className="activity-column">
                    <select defaultValue="">
                      <option value="" disabled>Select Activity</option>
                      {ACTIVITY_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </th>
                )
              ))}
              <th className="add-column">
                <button className="add-column-btn" onClick={handleAddColumn}>
                  +
                </button>
              </th>
              <th className="day-total"></th>
            </tr>
          </thead>
          <tbody>
            {DAYS_OF_WEEK.map(day => (
              <tr key={day}>
                <td className="day-cell">{day}</td>
                <td className="srv-cell">
                  <input
                    type="text"
                    value={hours[day]['srv']}
                    onChange={(e) => handleHourChange(day, 'srv', e.target.value)}
                    placeholder="Enter SRV#"
                  />
                </td>
                {columns.map((col, index) => (
                  index > 0 && (
                    <td key={col.id} className="hours-cell">
                      <input
                        type="text"
                        value={hours[day][col.id]}
                        onChange={(e) => handleHourChange(day, col.id, e.target.value)}
                        placeholder="0.0"
                      />
                    </td>
                  )
                ))}
                <td className="day-total">
                  {calculateDayTotal(day).toFixed(1)}
                </td>
              </tr>
            ))}
            <tr className="total-row">
              <td>Total Hours</td>
              <td></td>
              {columns.map((col, index) => (
                index > 0 && <td key={col.id}></td>
              ))}
              <td>
                {DAYS_OF_WEEK.reduce((sum, day) => sum + calculateDayTotal(day), 0).toFixed(1)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="submit-report">Submit Report</button>
    </div>
  );
};

export default WeeklyUtilization;
