import React from "react";
import PropTypes from "prop-types";

const Modal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">Ticket Details</h3>
        <div className="space-y-2">
          <p>
            <strong>Ticket No:</strong> {ticket.ticketNo}
          </p>
          <p>
            <strong>Date:</strong> {ticket.date}
          </p>
          <p>
            <strong>Name:</strong> {ticket.name}
          </p>
          <p>
            <strong>Department:</strong> {ticket.department}
          </p>
          <p>
            <strong>Subject:</strong> {ticket.subject}
          </p>
          <p>
            <strong>Category:</strong> {ticket.category}
          </p>
          <p>
            <strong>Type:</strong> {ticket.type}
          </p>
          <p>
            <strong>Priority:</strong> {ticket.priority}
          </p>
          <p>
            <strong>Description:</strong> {ticket.description}
          </p>
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div>
              <strong>Attachments:</strong>
              <ul className="list-disc pl-5">
                {ticket.attachments.map((file, index) => (
                  <li key={index}>{file}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 justify-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  ticket: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
