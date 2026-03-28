import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewComplaint from "../Component/ViewComplaint";
import { useNavigate } from "react-router";

function AdminDashboard() {
    const navigate = useNavigate();
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/team/get_forwarded", {
            withCredentials: true
        })
        .then((resp) => {
            setComplaints(resp.data);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            if (!err.response) {
                setError("Server not reachable");
            } else if (err.response.status === 401) {
                navigate("/");
            } else if (err.response.status === 500) {
                setError("Internal server error");
            } else {
                setError("Something went wrong");
            }
        });
    }, []);

    const resolveComplaint = async (id) => {
        try {
            await axios.post(
                `http://localhost:8000/team/resolve/${id}`,
                {},
                { withCredentials: true }
            );
            setComplaints(prev =>
                prev.map(c => c._id === id ? { ...c, status: "resolved" } : c)
            );
        } catch (err) {
            if (err.response?.status === 401) navigate("/");
            else alert("Failed to resolve complaint");
        }
    };

    const viewMore = (complaint) => setSelectedComplaint(complaint);

    if (loading) return <div className="p-10"><h2>Loading complaints...</h2></div>;
    if (error) return <div className="p-10 text-red-600"><h2>{error}</h2></div>;

    return (
        <div className="p-10 bg-slate-100 text-black min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Admin Complaint Panel</h1>

            {selectedComplaint && (
                <ViewComplaint
                    data={selectedComplaint}
                    onClose={() => setSelectedComplaint(null)}
                />
            )}

            <div className="grid gap-6">
                {complaints.length === 0 && <h3>No complaints found</h3>}
                {complaints.map((c) => (
                    <div key={c._id} className="bg-white shadow p-6 rounded-xl">
                        <h2 className="text-xl font-bold">{c.title}</h2>
                        <p className="text-gray-600 mt-2">{c.description}</p>
                        <p className="mt-2">
                            Status: <span className="ml-2 font-semibold">{c.status}</span>
                        </p>
                        {c.image && (
                            <img
                                src={`http://localhost:8000/${c.image}`}
                                alt="evidence"
                                className="mt-4 w-60 rounded"
                            />
                        )}
                        <div className="mt-4 flex gap-4">
                            <button
                                onClick={() => resolveComplaint(c._id)}
                                disabled={c.status === "resolved"}
                                className="bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                {c.status === "resolved" ? "Resolved" : "Resolve"}
                            </button>
                            <button className="btn btn-primary" onClick={() => viewMore(c)}>
                                View More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;