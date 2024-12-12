import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const MyTicketComponent = ({ initialTickets = [], onTicketsUpdate }) => {
  const [tickets, setTickets] = useState(
    initialTickets.length > 0
      ? initialTickets
      : JSON.parse(localStorage.getItem("tickets") || "[]")
  );

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));

    if (onTicketsUpdate) {
      onTicketsUpdate(tickets);
    }
  }, [tickets]);

  const handleDeleteTicket = (ticketId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (confirmDelete) {
      const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
      setTickets(updatedTickets);
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  const renderTicketStatus = (ticket) => {
    return (
      <span
        className="px-2 py-1 rounded text-sm font-semibold 
        bg-yellow-200 text-yellow-800"
      >
        Pending
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Tickets</h1>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-500">No tickets found</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-left">Ticket No</th>
                  <th className="p-4 text-left">Subject</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Priority</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{ticket.ticketNo}</td>
                    <td className="p-4">{ticket.subject}</td>
                    <td className="p-4">{ticket.department}</td>
                    <td className="p-4">
                      <span
                        className={`
                        px-2 py-1 rounded text-sm font-semibold
                        ${
                          ticket.priority === "High"
                            ? "bg-red-200 text-red-800"
                            : ticket.priority === "Medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }
                      `}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-4">{renderTicketStatus(ticket)}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewTicket(ticket)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteTicket(ticket.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isModalOpen && <Modal ticket={selectedTicket} onClose={closeModal} />}
      </div>
    </div>
  );
};

export default MyTicketComponent;
