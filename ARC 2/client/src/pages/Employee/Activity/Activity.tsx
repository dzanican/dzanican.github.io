import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkWeekCard from '../../../components/WorkWeekCard/WorkWeekCard';
import './Activity.css';

const Activity: React.FC = () => {
  const navigate = useNavigate();

  // Calculate current work week of the year
  const getCurrentWorkWeek = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return Math.ceil((dayOfYear + start.getDay() + 1) / 7);
  };

  const currentWorkWeek = getCurrentWorkWeek();
  
  // Generate work weeks (2 previous, current, and 2 future weeks)
  const workWeeks = Array.from({ length: 5 }, (_, index) => {
    const weekOffset = index - 2; // -2, -1, 0, 1, 2
    const weekNumber = currentWorkWeek + weekOffset;
    
    // Calculate dates for this work week
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + (weekOffset * 7)); // Start from Sunday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // End on Saturday

    return {
      weekNumber,
      dateRange: `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      isCurrent: weekOffset === 0
    };
  });

  const handleUtilizationSubmit = (weekNumber: number) => {
    navigate(`/employee/utilization?week=${weekNumber}`);
  };

  const handleCustomerServiceSubmit = (weekNumber: number) => {
    navigate(`/employee/customer-service?week=${weekNumber}`);
  };

  return (
    <div className="activity-container">
      <h1>Activity</h1>
      <div className="work-weeks-list">
        {workWeeks.map((week) => (
          <div key={week.weekNumber} className={week.isCurrent ? 'current-week' : ''}>
            <WorkWeekCard
              weekNumber={week.weekNumber}
              dateRange={week.dateRange}
              onUtilizationSubmit={() => handleUtilizationSubmit(week.weekNumber)}
              onCustomerServiceSubmit={() => handleCustomerServiceSubmit(week.weekNumber)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
