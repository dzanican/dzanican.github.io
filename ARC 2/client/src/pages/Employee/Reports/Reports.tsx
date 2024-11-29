import React, { useEffect, useState } from 'react';
import './Reports.css';

interface WorkWeek {
  weekNumber: number;
  startDate: string;
  endDate: string;
  hasCSR: boolean;
  hasUtilization: boolean;
}

const Reports: React.FC = () => {
  const [workWeeks, setWorkWeeks] = useState<WorkWeek[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number>(1);

  useEffect(() => {
    // Calculate current work week
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7
    );
    setCurrentWeek(weekNumber);

    // Generate work weeks for the year
    const weeks: WorkWeek[] = [];
    for (let i = weekNumber; i >= 1; i--) {
      const weekStart = new Date(startOfYear);
      weekStart.setDate(weekStart.getDate() + (i - 1) * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      weeks.push({
        weekNumber: i,
        startDate: weekStart.toLocaleDateString(),
        endDate: weekEnd.toLocaleDateString(),
        // In a real app, these would be determined by checking if reports exist
        hasCSR: Math.random() > 0.5, // Simulated data
        hasUtilization: Math.random() > 0.5, // Simulated data
      });
    }
    setWorkWeeks(weeks);
  }, []);

  const handleDownloadCSR = (weekNumber: number) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading CSR for week ${weekNumber}`);
  };

  const handleDownloadUtilization = (weekNumber: number) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading Utilization for week ${weekNumber}`);
  };

  return (
    <div className="reports-container">
      <h2>My Reports</h2>
      
      <div className="work-weeks-list">
        {workWeeks.map((week) => (
          <div 
            key={week.weekNumber} 
            className={`work-week-item ${week.weekNumber === currentWeek ? 'current-week' : ''}`}
          >
            <div className="week-info">
              <div className="week-number">
                Work Week {week.weekNumber}
                {week.weekNumber === currentWeek && (
                  <span className="current-week-badge">Current Week</span>
                )}
              </div>
              <div className="week-dates">
                {week.startDate} - {week.endDate}
              </div>
            </div>
            <div className="week-actions">
              <button
                className={`download-btn ${!week.hasCSR ? 'disabled' : ''}`}
                onClick={() => handleDownloadCSR(week.weekNumber)}
                disabled={!week.hasCSR}
              >
                Download CSR
              </button>
              <button
                className={`download-btn ${!week.hasUtilization ? 'disabled' : ''}`}
                onClick={() => handleDownloadUtilization(week.weekNumber)}
                disabled={!week.hasUtilization}
              >
                Download Utilization
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
