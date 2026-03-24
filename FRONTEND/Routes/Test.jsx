
import React, { useState } from "react";

/**
 * This Dashboard UI demo uses color schemes and structure
 * similar to the LoginPage and RegisterPage.
 * It is fully responsive, visually cohesive, and contains example
 * (dummy) complaints for illustration.
 */

const DUMMY_COMPLAINTS = [
  {
    id: 1,
    title: "AC not working in classroom 201",
    category: "Infrastructure",
    status: "Pending",
    department: "CS",
    submitted: "2024-06-01",
    description: "AC has been non-functional for 3 days. Students are uncomfortable.",
    evidence: "photo_ac.jpg"
  },
  {
    id: 2,
    title: "Harassment by faculty",
    category: "Faculty",
    status: "Resolved",
    department: "ME",
    submitted: "2024-06-02",
    description: "Faculty member using abusive language during lectures.",
    evidence: "proof_doc.pdf"
  },
  {
    id: 3,
    title: "Fan not working in library",
    category: "Infrastructure",
    status: "Rejected",
    department: "Library",
    submitted: "2024-06-03",
    description: "All fans are stopped, making library very hot.",
    evidence: ""
  }
];

function Dashboard() {
  const [dashboard, setDashboard] = useState("main");
  const [charCount, setCharCount] = useState(0);
  const [selectedComplaint, setSelectedComplaint] = useState(DUMMY_COMPLAINTS[0]);

  // Responsive Tailwind layouts & color palette adapted from auth pages
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 p-4 md:p-8">
      {/* Top dashboard-type navigation */}
      <nav className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setDashboard("main")}
          className={`px-4 py-1.5 rounded transition font-semibold text-sm shadow-sm
            ${
              dashboard === "main"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-100 text-blue-700 hover:bg-blue-50"
            }`}
        >
          Main Dashboard
        </button>
        <button
          onClick={() => setDashboard("moderator")}
          className={`px-4 py-1.5 rounded transition font-semibold text-sm shadow-sm
            ${
              dashboard === "moderator"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-100 text-blue-700 hover:bg-blue-50"
            }`}
        >
          Moderator Dashboard
        </button>
        <button
          onClick={() => setDashboard("director")}
          className={`px-4 py-1.5 rounded transition font-semibold text-sm shadow-sm
            ${
              dashboard === "director"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-100 text-blue-700 hover:bg-blue-50"
            }`}
        >
          Director Dashboard
        </button>
      </nav>

      {/* Main Dashboard */}
      {dashboard === "main" && (
        <div>
          {/* Cards */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl shadow bg-gradient-to-r from-blue-500 to-blue-300 text-white p-5 flex flex-col items-center">
              <span className="font-medium text-lg">Pending</span>
              <span className="text-3xl sm:text-4xl font-bold mt-1">
                {DUMMY_COMPLAINTS.filter((c) => c.status === "Pending").length}
              </span>
            </div>
            <div className="rounded-xl shadow bg-gradient-to-r from-green-500 to-green-300 text-white p-5 flex flex-col items-center">
              <span className="font-medium text-lg">Resolved</span>
              <span className="text-3xl sm:text-4xl font-bold mt-1">
                {DUMMY_COMPLAINTS.filter((c) => c.status === "Resolved").length}
              </span>
            </div>
            <div className="rounded-xl shadow bg-gradient-to-r from-rose-400 to-pink-200 text-white p-5 flex flex-col items-center">
              <span className="font-medium text-lg">Rejected</span>
              <span className="text-3xl sm:text-4xl font-bold mt-1">
                {DUMMY_COMPLAINTS.filter((c) => c.status === "Rejected").length}
              </span>
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Recent Complaints</h2>
            <ul className="divide-y rounded-xl overflow-hidden bg-white shadow">
              {DUMMY_COMPLAINTS.map((item) => (
                <li key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-blue-800">{item.title}</div>
                    <div className="text-xs text-slate-500">
                      Category: <span className="font-medium">{item.category}</span>{" "}
                      | Submitted: {item.submitted}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium min-w-[80px] text-center ${
                      item.status === "Pending"
                        ? "bg-yellow-50 text-yellow-700 border border-yellow-300"
                        : item.status === "Resolved"
                        ? "bg-green-50 text-green-700 border border-green-300"
                        : "bg-red-50 text-red-700 border border-red-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clean Table */}
          <div>
            <h2 className="text-xl font-bold mb-3 text-blue-900">Complaint Tracker</h2>
            <div className="overflow-x-auto rounded-xl shadow bg-white">
              <table className="w-full min-w-[560px] text-sm text-blue-900">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-left">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_COMPLAINTS.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-blue-50/40 transition">
                      <td className="p-3">{item.title}</td>
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.status === "Resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">{item.department}</td>
                      <td className="p-3">{item.submitted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Complaint Submission Form */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Submit New Complaint</h2>
            <form className="bg-white rounded-xl shadow p-6 flex flex-col gap-5">
              {/* Category */}
              <div>
                <label className="text-sm font-semibold block mb-1 text-blue-900" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  className="border rounded px-3 py-2 w-full focus:outline-blue-400"
                  defaultValue="Infrastructure"
                >
                  <option>Infrastructure</option>
                  <option>Faculty</option>
                  <option>Administration</option>
                  <option>Other</option>
                </select>
              </div>
              {/* Title */}
              <div>
                <label className="text-sm font-semibold block mb-1 text-blue-900" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  maxLength={50}
                  className="border rounded px-3 py-2 w-full focus:outline-blue-400"
                  placeholder="Enter issue title..."
                />
              </div>
              {/* Description */}
              <div>
                <label className="text-sm font-semibold block mb-1 text-blue-900" htmlFor="desc">
                  Detailed Description
                </label>
                <textarea
                  id="desc"
                  rows={4}
                  maxLength={300}
                  className="border rounded px-3 py-2 w-full focus:outline-blue-400"
                  placeholder="Describe the issue in detail (max 300 characters)"
                  onChange={(e) => setCharCount(e.target.value.length)}
                ></textarea>
                <div className="text-xs text-right text-slate-500 mt-1">
                  {charCount}/300
                </div>
              </div>
              {/* Evidence */}
              <div>
                <label className="text-sm font-semibold block mb-1 text-blue-900" htmlFor="evidence">
                  Upload Evidence (optional)
                </label>
                <input id="evidence" type="file" className="block w-full" />
              </div>
              {/* Disclaimer */}
              <div className="flex items-center">
                <input id="disclaimer" type="checkbox" className="mr-2" />
                <label htmlFor="disclaimer" className="text-sm text-blue-900">
                  I confirm that this complaint is true to the best of my knowledge.
                </label>
              </div>
              {/* Submit */}
              <button
                type="button"
                className="mt-3 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded font-semibold shadow"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Moderator Dashboard */}
      {dashboard === "moderator" && (
        <div>
          <h2 className="text-2xl font-bold mb-8 text-blue-900">Moderator Dashboard</h2>
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <select className="border rounded px-3 py-2 focus:outline-blue-400">
              <option>All Categories</option>
              <option>Infrastructure</option>
              <option>Faculty</option>
              <option>Administration</option>
              <option>Other</option>
            </select>
            <select className="border rounded px-3 py-2 focus:outline-blue-400">
              <option>All Departments</option>
              <option>CS</option>
              <option>EEE</option>
              <option>ME</option>
              <option>Library</option>
            </select>
          </div>

          {/* Responsive layout: complaint queue + preview */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Complaints List */}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-3 text-blue-800">Queue Complaints</h3>
              <ul className="divide-y bg-white rounded-xl shadow">
                {DUMMY_COMPLAINTS.map((item) => (
                  <li
                    key={item.id}
                    className={`p-4 hover:bg-blue-50/60 transition cursor-pointer flex justify-between items-center ${
                      selectedComplaint.id === item.id ? "bg-blue-100/40" : ""
                    }`}
                    onClick={() => setSelectedComplaint(item)}
                  >
                    <span className="font-medium text-blue-900">{item.title}</span>
                    <div className="flex gap-2 ml-2">
                      <button className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1.5 rounded text-xs font-semibold shadow">
                        Approve
                      </button>
                      <button className="bg-rose-600 hover:bg-rose-700 transition text-white px-3 py-1.5 rounded text-xs font-semibold shadow">
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Complaint Preview */}
            <div className="w-full md:w-[400px] bg-white rounded-xl shadow px-6 py-6 flex flex-col">
              <h3 className="font-bold mb-3 text-lg text-blue-900">Complaint Preview</h3>
              <div className="mb-2">
                <span className="font-semibold text-blue-700">Title: </span>
                {selectedComplaint.title}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-blue-700">Category: </span>
                {selectedComplaint.category}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-blue-700">Department: </span>
                {selectedComplaint.department}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-blue-700">Description: </span>
                {selectedComplaint.description}
              </div>
              <div>
                <span className="font-semibold text-blue-700">Evidence: </span>
                {selectedComplaint.evidence ? (
                  <span className="text-blue-700 underline cursor-pointer">{selectedComplaint.evidence}</span>
                ) : (
                  <span className="text-slate-400 italic">No file</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Director Dashboard */}
      {dashboard === "director" && (
        <div>
          <h2 className="text-2xl font-bold mb-8 text-blue-900">Director Dashboard</h2>
          {/* Statistic Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-blue-600 text-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-lg font-bold">Total Complaints</div>
              <div className="text-3xl font-extrabold mt-2">{DUMMY_COMPLAINTS.length}</div>
            </div>
            <div className="bg-yellow-400 text-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-lg font-bold">Pending</div>
              <div className="text-3xl font-extrabold mt-2">
                {DUMMY_COMPLAINTS.filter((c) => c.status === "Pending").length}
              </div>
            </div>
            <div className="bg-green-600 text-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-lg font-bold">Resolved</div>
              <div className="text-3xl font-extrabold mt-2">
                {DUMMY_COMPLAINTS.filter((c) => c.status === "Resolved").length}
              </div>
            </div>
          </div>
          {/* Complaints by Category */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">Complaints by Category</h3>
            <table className="min-w-full text-blue-900">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-2 font-medium">Category</th>
                  <th className="text-left p-2 font-medium">Count</th>
                </tr>
              </thead>
              <tbody>
                {["Infrastructure", "Faculty", "Administration", "Other"].map((cat) => (
                  <tr key={cat}>
                    <td className="p-2">{cat}</td>
                    <td className="p-2">
                      {
                        DUMMY_COMPLAINTS.filter((c) => c.category === cat).length
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;