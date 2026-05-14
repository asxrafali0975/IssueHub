import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewComplaint from "../Component/ViewComplaint";
import { useNavigate } from "react-router";
function TeamDashboard() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints(page);
  }, [page]);

  const fetchComplaints = async (page) => {
    try {
      const resp = await axios.get(
        `http://localhost:8000/team/team_dashboard?page=${page}`, { withCredentials: true }
      );
      setComplaints(resp.data);
    } catch (err) {
      if (err.response) {
        console.log("Error:", err.response.data.detail);
        if (err.response.status === 401) {

          if (err.response.data.detail=== "no permission to access this route") {
            alert("you dont have permissions to access this page")
            navigate("/")
            return
          }

          if (err.response.data.detail === "Not_authenticated") {
            navigate("/")
             alert("Login expired / Unauthorized");

          }
          else if (err.response.data.detail === "unauthorized") {
            navigate("/")
            alert("Login expired / Unauthorized");

          }
        }

      } else if (err.request) {
        console.log("No response from server");
      } else {
        console.log("Error:", err.message);
      }
    }
  };

  const forwardComplaint = async (id) => {
    try {
      await axios.post(
        `http://localhost:8000/team/forward_complaint`,
        { id },
        { withCredentials: true }
      );
      setComplaints(prev =>
        prev.map((c) => c._id === id ? { ...c, forwarded: true } : c)
      );
    } catch (err) {
      if (err.response?.status === 401) navigate("/");
      else alert("Failed to forward complaint");
    }
  };

  const viewMore = (complaint) => {
    setSelectedComplaint(complaint);
  };

  return (
    <div className="min-h-screen  text-black bg-slate-100 p-6">

      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Moderation Dashboard
      </h1>

     
      {selectedComplaint && (
        <ViewComplaint
          data={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}

      <div className="grid gap-4">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-xl shadow p-5 border-l-8 border-blue-500"
          >
            <div className="card card-side shadow-sm">

              <figure className="bg-red-800  w-[30%]">
                <img


                  src={`http://localhost:8000/${c.image}`}
                  className="h-[100%] w-[100%]"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{c.title}</h2>
                <p>{c.description}</p>

                <div className="card-actions justify-end">

                  <button
                    className="btn btn-primary"
                    onClick={() => viewMore(c)}
                  >
                    View More
                  </button>

                  {!c.forwarded ? (
                    <button
                      onClick={() => forwardComplaint(c._id)}
                      className="btn btn-secondary"
                    >
                      Forward
                    </button>
                  ) : (
                    <span className="btn btn-success">
                      Forwarded
                    </span>
                  )}

                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Prev
        </button>

        <span className="text-lg font-semibold">
          Page {page}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default TeamDashboard;