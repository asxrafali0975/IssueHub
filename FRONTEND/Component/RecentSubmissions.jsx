import React from "react";

function RecentSubmissions({ dataToDisplay }) {

  function seeFullComplaint(complaint) {
    console.log(complaint);
  }

  function getStatusStyle(status) {
    if (status === "resolved")
      return "bg-green-100 text-green-800 border border-green-200";

    if (status === "pending")
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    

    return "bg-slate-200 text-slate-700 border";
  }

  return (
    <div className="mb-7">

      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        Recent Complaints
      </h2>



      {/* Header */}
      <div className="grid grid-cols-4 lg:grid-cols-5 pl-5 bg-white rounded-2xl shadow overflow-hidden text-blue-900 mt-5">
        <div className="p-4">Title</div>
        <div className="p-4">Category</div>
        <div className="p-4">Status</div>
        <div className="p-4">Date</div>
        <div className="p-4 hidden lg:block">Description</div>
      </div>

      {/* Rows */}

      <div className="bg-white rounded-2xl shadow overflow-hidden text-blue-900  mt-5" >

        {dataToDisplay.map((c) => (
          <div
            key={c._id}
            onClick={() => seeFullComplaint(c)}
            className="grid grid-cols-4 pl-5 lg:grid-cols-5 border-t hover:bg-blue-50/80 transition cursor-pointer "
          >

            <div className="p-4 font-semibold">
              {c.title}
            </div>

            <div className="p-4">
              {c.category}
            </div>

            <div className="p-4">
              <span
                className={`px-2 py-1 rounded-lg text-xs inline-block font-semibold border ${getStatusStyle(c.status)}`}
              >
                {c.status}
              </span>
            </div>

            <div className="p-4">
              {c.date}
            </div>

            <div className="p-4 hidden lg:block">
              {c.description}
            </div>

          </div>
        ))}

      </div>

    </div>
  
  );
}

export default RecentSubmissions;