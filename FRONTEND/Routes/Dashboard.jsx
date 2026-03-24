import React, { useEffect, useState } from "react";
import CompStatusGrid from "../Component/CompStatusGrid";
import RecentSubmissions from "../Component/RecentSubmissions";
import { useNavigate } from "react-router";
import axios from "axios";

const CATEGORY_OPTIONS = [
  "Infrastructure",
  "Faculty",
  "Administration",
  "Mess/Canteen",
  "Hostel",
  "Other",
];

function getStatusStyle(status) {
  if (status === "Resolved")
    return "bg-green-100 text-green-800 border border-green-200";
  if (status === "Pending")
    return "bg-yellow-100 text-yellow-800 border border-yellow-200";
  return "bg-slate-200 text-slate-700 border";
}

function Dashboard() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [dataToDisplay, setData] = useState([]); // complaints array
  const [clsSetter, setCls] = useState("");
  const [Openalert, setalert] = useState(false);

  const [image, setImage] = useState(null);



  useEffect(() => {
    axios
      .get("http://localhost:8000/dash/stud_dashboard", {
        withCredentials: true,
      })
      .then((resp) => {
        console.log(resp.data);

        if (Array.isArray(resp.data)) {
          setData(resp.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log(err);

        setData([]);

        if (!err.response) {
          setCls("alert alert-error");
          setalert(true);
        } else if (err.response.status === 401) {
          navigate("/");
        } else if (err.response.status === 500) {
          setCls("alert alert-error");
          setalert(true);
        } else {
          setCls("alert alert-error");
          setalert(true);
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please accept disclaimer");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", desc);
      const date = new Date().toLocaleDateString("en-GB");
      formData.append("date", date);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "http://localhost:8000/dash/submit_complaint",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Complaint submitted");

      setTitle("");
      setDesc("");
      setImage(null);
      setShowForm(false);

      window.location.reload()

    } catch (err) {
      console.log(err);
      alert("Error submitting complaint");
    }
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-blue-50 via-slate-100 to-pink-50 px-3 py-0 lg:py-6">
      <div className="max-w-6xl mx-auto py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 md:gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-800 mb-1">
              Student Dashboard
            </h1>
            <p className="text-slate-500 max-w-md">
              View status of past complaints or submit new issues directly to
              the administration.
            </p>
          </div>

          <button
            className="mt-2 sm:mt-0 px-6 py-2 bg-gradient-to-r from-sky-600 via-blue-500 to-indigo-500 hover:to-pink-500 transition text-white font-semibold rounded-lg shadow-lg text-base"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Back to Dashboard" : "Submit Complaint"}
          </button>

        </div>

        {!showForm ? (
          <div>
            <CompStatusGrid dataToDisplay={dataToDisplay} />
            <RecentSubmissions dataToDisplay={dataToDisplay} />
          </div>
        )
          :
          (
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-800 mb-7">
                Submit a New Complaint
              </h2>

              <form
                className="bg-white rounded-2xl shadow-lg p-7 flex flex-col gap-5"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Category
                  </label>

                  <select
                    className="border rounded-lg px-3 py-2 w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Title
                  </label>

                  <input
                    type="text"
                    maxLength={45}
                    required
                    className="border rounded-lg px-3 py-2 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Detailed Description
                  </label>

                  <textarea
                    rows={4}
                    maxLength={300}
                    required
                    className="border rounded-lg px-3 py-2 w-full"
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                      setCharCount(e.target.value.length);
                    }}
                  />

                  <div className="text-xs text-slate-500 text-right mt-1">
                    {charCount}/300
                  </div>
                </div>

                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    Upload Evidence
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    required
                    className="block w-full border border-dashed border-blue-300 rounded-lg py-2 px-3"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                  />

                  <label className="text-blue-900 text-xs">
                    I confirm that the above information is truthful.
                  </label>
                </div>

                <button className="mt-2 w-full bg-blue-600 text-white rounded-lg px-5 py-2 text-lg shadow-lg">
                  Submit Complaint
                </button>
              </form>
            </div>
          )}
      </div>
    </div>
  );
}

export default Dashboard;