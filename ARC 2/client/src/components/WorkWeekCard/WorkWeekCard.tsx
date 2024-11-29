import React from 'react';
import './WorkWeekCard.css';

interface WorkWeekCardProps {
  weekNumber: number;
  dateRange: string;
  onUtilizationSubmit: () => void;
  onCustomerServiceSubmit: () => void;
}

const WorkWeekCard: React.FC<WorkWeekCardProps> = ({
  weekNumber,
  dateRange,
  onUtilizationSubmit,
  onCustomerServiceSubmit,
}) => {
  return (
    <div className="work-week-card">
      <div className="work-week-header">
        <h2>Work Week {weekNumber}</h2>
        <span className="date-range">({dateRange})</span>
      </div>
      <div className="work-week-actions">
        <button 
          className="submit-button utilization"
          onClick={onUtilizationSubmit}
        >
          Submit Utilization Report
        </button>
        <button 
          className="submit-button customer-service"
          onClick={onCustomerServiceSubmit}
        >
          Submit Customer Service Report
        </button>
      </div>
    </div>
  );
};

export default WorkWeekCard;
