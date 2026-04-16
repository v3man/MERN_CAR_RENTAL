import { useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Support = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Billing Issue",
      message: "I was double charged for my last booking.",
      date: "2026-03-10",
      status: "pending",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      subject: "Car condition",
      message: "The SUV I rented was not cleaned properly before pickup.",
      date: "2026-03-11",
      status: "resolved",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      subject: "Account recovery",
      message: "I lost access to my primary email and need to update it.",
      date: "2026-03-12",
      status: "pending",
    },
  ]);

  const handleResolve = (id) => {
    setMessages((prevs) =>
      (prevs || []).map((m) => (m.id === id ? { ...m, status: "resolved" } : m))
    );
    toast.success("Support ticket marked as resolved.");
  };

  const handleDelete = (id) => {
    setMessages((prevs) => prevs.filter((m) => m.id !== id));
    toast.success("Support ticket deleted.");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contact & Support</h1>
        <p className="text-gray-500 text-sm">
          Manage user inquiries, bug reports, and customer feedback.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 border-l-4 border-l-primary-500">
          <div className="text-sm text-gray-500 font-medium mb-1">Total Tickets</div>
          <div className="text-3xl font-bold text-gray-900">{messages.length}</div>
        </div>
        <div className="card p-6 border-l-4 border-l-amber-500">
          <div className="text-sm text-gray-500 font-medium mb-1">Pending Responses</div>
          <div className="text-3xl font-bold text-gray-900">
            {messages.filter((m) => m.status === "pending").length}
          </div>
        </div>
        <div className="card p-6 border-l-4 border-l-green-500">
          <div className="text-sm text-gray-500 font-medium mb-1">Resolved Tickets</div>
          <div className="text-3xl font-bold text-gray-900">
            {messages.filter((m) => m.status === "resolved").length}
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-lg font-semibold text-gray-800">Support Inbox</h2>
          <div className="flex gap-2">
             <button className="btn-outline text-xs px-3 py-1.5 flex items-center gap-2">
               <img src={assets.filter_icon} alt="filter" className="w-3 h-3" />
               Filter
             </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {messages.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No support tickets found. Everything looks good!
            </div>
          ) : (
            (messages || []).map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row gap-6 bg-white shrink-0">
                {/* Status indicator */}
                <div className="min-w-32">
                   <div className="text-xs text-gray-400 font-medium mb-1.5">{new Date(msg.date).toLocaleDateString()}</div>
                   <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        msg.status === "resolved" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {msg.status.toUpperCase()}
                   </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                     <h3 className="font-semibold text-gray-900 text-base">{msg.subject}</h3>
                     <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2.5 py-1 rounded-md">From: {msg.email}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-2">{msg.name}</div>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                    "{msg.message}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 justify-end md:justify-start">
                  {msg.status === "pending" && (
                    <button
                      onClick={() => handleResolve(msg.id)}
                      className="w-8 h-8 rounded-full bg-green-50 flex justify-center items-center hover:bg-green-100 transition-colors"
                      title="Mark as Resolved"
                    >
                      <img src={assets.check_icon} alt="Resolve" className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="w-8 h-8 rounded-full bg-red-50 flex justify-center items-center hover:bg-red-100 transition-colors"
                    title="Delete Ticket"
                  >
                    <img src={assets.delete_icon} alt="Delete" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
