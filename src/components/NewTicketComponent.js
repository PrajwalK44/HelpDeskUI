import React, { useState, useEffect } from "react";
import MyTicketComponent from "./MyTicketComponent";


const NewTicketComponent = ({ onTicketCreated }) => {


  const [formData, setFormData] = useState({
    ticketNo: "",
    date: new Date().toISOString().split("T")[0],
    name: "",
    department: "",
    subject: "",
    category: "",
    type: "",
    priority: "",
    description: "",
    attachments: [],
  });

  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [errors, setErrors] = useState({});
  const [redirectToMyTickets, setRedirectToMyTickets] = useState(false);

  useEffect(() => {
    const savedDepartments = JSON.parse(
      localStorage.getItem("departments") || "[]"
    );
    const savedCategories = JSON.parse(
      localStorage.getItem("categories") || "[]"
    );
    const savedTypes = JSON.parse(localStorage.getItem("types") || "[]");
    const savedPriorities = JSON.parse(
      localStorage.getItem("priorities") || "[]"
    );

    setDepartments([
      "IT",
      "HR",
      "Finance",
      "Customer Support",
      "Marketing",
      "Sales",
      "Operations",
      ...savedDepartments,
    ]);
    setCategories([
      "Hardware",
      "Software",
      "Network",
      "Access",
      "Training",
      "Other",
      ...savedCategories,
    ]);
    setTypes([
      "Incident",
      "Service Request",
      "Problem",
      "Change Request",
      ...savedTypes,
    ]);
    setPriorities(["Low", "Medium", "High", "Critical", ...savedPriorities]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ticketNo.trim()) {
      newErrors.ticketNo = "Ticket number is required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.type) {
      newErrors.type = "Type is required";
    }
    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const existingTickets = JSON.parse(
        localStorage.getItem("tickets") || "[]"
      );
      const newTicket = {
        ...formData,
        id: Date.now(),
        attachments: formData.attachments.map((file) => file.name),
      };

      const updatedTickets = [...existingTickets, newTicket];
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));

      if (onTicketCreated) {
        onTicketCreated(newTicket);
      }

      // Set state to trigger redirection
      setRedirectToMyTickets(true);
    }
  };

  const handleAddCustomOption = (listName) => {
    const newOption = prompt(`Enter a new ${listName.slice(0, -1)}:`);
    if (newOption && newOption.trim()) {
      const currentOptions = JSON.parse(localStorage.getItem(listName) || "[]");
      const updatedOptions = [...currentOptions, newOption.trim()];

      localStorage.setItem(listName, JSON.stringify(updatedOptions));

      switch (listName) {
        case "departments":
          setDepartments((prev) => [...prev, newOption.trim()]);
          break;
        case "categories":
          setCategories((prev) => [...prev, newOption.trim()]);
          break;
        case "types":
          setTypes((prev) => [...prev, newOption.trim()]);
          break;
        case "priorities":
          setPriorities((prev) => [...prev, newOption.trim()]);
          break;
        default:
          break;
      }
    }
  };

  const renderFormField = (name, label, type = "text", options = []) => (
    <div className="mb-4 relative">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      {type === "select" ? (
        <div className="flex items-center">
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors[name] ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleAddCustomOption(`${name}s`)}
            className="ml-2 bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
          >
            +
          </button>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        New Ticket Submission
      </h2>
      {redirectToMyTickets ? (
        <MyTicketComponent /> // Conditional rendering based on state
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {renderFormField("ticketNo", "Ticket No.")}
            {renderFormField("date", "Date", "date")}
            {renderFormField("name", "Name")}
            {renderFormField("department", "Department", "select", departments)}
          </div>
          {renderFormField("subject", "Subject")}
          <div className="grid grid-cols-3 gap-4">
            {renderFormField("category", "Category", "select", categories)}
            {renderFormField("type", "Type", "select", types)}
            {renderFormField("priority", "Priority", "select", priorities)}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your issue in detail..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Attachments
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formData.attachments.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-semibold">Uploaded Files:</p>
                <ul className="list-disc pl-5">
                  {formData.attachments.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      {file.name}
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 text-sm ml-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewTicketComponent;
