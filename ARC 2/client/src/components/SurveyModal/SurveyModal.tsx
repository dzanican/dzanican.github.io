import React from 'react';
import './SurveyModal.css';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (sendSurvey: boolean) => void;
}

const SurveyModal: React.FC<SurveyModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Customer Survey</h3>
        <p>Would you like to send a satisfaction survey to the customer?</p>
        <div className="modal-actions">
          <button 
            className="modal-btn confirm-btn"
            onClick={() => {
              onConfirm(true);
              onClose();
            }}
          >
            Yes, Send Survey
          </button>
          <button 
            className="modal-btn cancel-btn"
            onClick={() => {
              onConfirm(false);
              onClose();
            }}
          >
            No, Skip Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;
