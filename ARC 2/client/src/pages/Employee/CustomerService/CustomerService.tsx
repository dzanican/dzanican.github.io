import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SurveyModal from '../../../components/SurveyModal/SurveyModal';
import './CustomerService.css';

const CustomerService: React.FC = () => {
  const [searchParams] = useSearchParams();
  const weekNumber = parseInt(searchParams.get('week') || '1', 10);
  const [weekEnding, setWeekEnding] = useState('');
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  useEffect(() => {
    // Calculate week ending date based on week number
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekDate = new Date(startOfYear);
    weekDate.setDate(startOfYear.getDate() + (weekNumber - 1) * 7);
    setWeekEnding(weekDate.toLocaleDateString());
  }, [weekNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSurveyModal(true);
  };

  const handleSurveyResponse = (sendSurvey: boolean) => {
    // Here you would handle the survey response
    console.log(sendSurvey ? 'Sending survey to customer' : 'Skipping survey');
    // Continue with form submission
    console.log('Submitting customer service report');
  };

  return (
    <div className="customer-service-report">
      <div className="report-header">
        <h2>CUSTOMER SERVICE REPORT</h2>
        <div className="address">10050 16th St. N., St. Petersburg, FL 33716, Tel: 727-577-4999 or 800-246-2592</div>
      </div>

      <form id="customerServiceForm" onSubmit={handleSubmit}>
        <div className="report-top-section">
          <div className="srv-section">
            <label>SRV Number</label>
            <input type="text" required />
          </div>
          <div className="engineer-section">
            <label>Service Engineer:</label>
            <input type="text" id="serviceEngineer" readOnly />
          </div>
          <div className="week-section">
            <div>
              Work Week # WW
              <input type="number" id="workWeek" min="1" max="53" value={weekNumber} required />
            </div>
            <div>
              Week ending
              <span id="weekEnding">{weekEnding}</span>
            </div>
          </div>
        </div>

        <div className="report-info-grid">
          <div className="left-column">
            <div className="form-row">
              <label>Customer:</label>
              <input type="text" required />
            </div>
            <div className="form-row">
              <label>Address:</label>
              <input type="text" required />
            </div>
            <div className="form-row">
              <label>Contact:</label>
              <input type="text" />
            </div>
            <div className="form-row">
              <label>Tel:</label>
              <input type="tel" />
            </div>
            <div className="form-row">
              <label>Email:</label>
              <input type="email" />
            </div>
          </div>
          <div className="right-column">
            <div className="form-row">
              <label>Tool (P) Number:</label>
              <input type="text" />
            </div>
            <div className="form-row">
              <label>Job Type:</label>
              <input type="text" />
            </div>
            <div className="form-row">
              <label>System Type:</label>
              <input type="text" />
            </div>
            <div className="form-row">
              <label>JIRA Ticket Number:</label>
              <input type="text" />
            </div>
          </div>
        </div>

        <div className="time-section">
          <h4>Travel and Work Time:</h4>
          <table className="time-table">
            <thead>
              <tr>
                <th>Date</th>
                <th data-day="Mon">Mon</th>
                <th data-day="Tue">Tue</th>
                <th data-day="Wed">Wed</th>
                <th data-day="Thu">Thu</th>
                <th data-day="Fri">Fri</th>
                <th data-day="Sat">Sat</th>
                <th data-day="Sun">Sun</th>
                <th>Hours Total</th>
                <th>Hourly Rates</th>
                <th>Totals [USD]</th>
              </tr>
              <tr>
                <th></th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Travel Hours</td>
                {Array(7).fill(null).map((_, i) => (
                  <td key={i}><input type="number" step="0.5" min="0" /></td>
                ))}
                <td>0</td>
                <td>$253.00</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>Regular Hrs<br />8am - 5pm</td>
                {Array(7).fill(null).map((_, i) => (
                  <td key={i}><input type="number" step="0.5" min="0" /></td>
                ))}
                <td>0</td>
                <td>$253.00</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>Overtime/<br />Weekend (h)</td>
                {Array(7).fill(null).map((_, i) => (
                  <td key={i}><input type="number" step="0.5" min="0" /></td>
                ))}
                <td>0</td>
                <td>$380.00</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>Holiday (h)</td>
                {Array(7).fill(null).map((_, i) => (
                  <td key={i}><input type="number" step="0.5" min="0" /></td>
                ))}
                <td>0</td>
                <td>$506.00</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td></td>
                {Array(7).fill(0).map((_, i) => (
                  <td key={i}>0</td>
                ))}
                <td>0</td>
                <td>Total</td>
                <td>$0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="description-section">
          <h4>Purpose of Visit / Problem Description:</h4>
          <textarea rows={4} required></textarea>
        </div>

        <div className="description-section">
          <h4>Solution:</h4>
          <textarea rows={4} required></textarea>
        </div>

        <div className="description-section">
          <h4>Recommendations:</h4>
          <textarea rows={3}></textarea>
        </div>

        <div className="description-section">
          <h4>Additional:</h4>
          <textarea rows={3}></textarea>
        </div>

        <div className="return-visit-section">
          <label>Return Visit Required?</label>
          <label><input type="radio" name="returnVisit" value="Y" /> Y</label>
          <label><input type="radio" name="returnVisit" value="Yes" /> Yes</label>
          <label><input type="radio" name="returnVisit" value="No" /> No</label>
        </div>

        <div className="signature-section">
          <div className="signature-block">
            <div className="signature-line"></div>
            <div>Customer Signature</div>
            <div className="signature-line"></div>
            <div>Date</div>
          </div>
          <div className="signature-block">
            <div className="signature-line"></div>
            <div>Service Engineer Signature</div>
            <div className="signature-line"></div>
            <div>Date</div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">Submit Report</button>
        </div>
      </form>

      <SurveyModal
        isOpen={showSurveyModal}
        onClose={() => setShowSurveyModal(false)}
        onConfirm={handleSurveyResponse}
      />
    </div>
  );
};

export default CustomerService;
