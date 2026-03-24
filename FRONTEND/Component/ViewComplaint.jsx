import React from "react";

function ViewComplaint({ data, onClose }) {
  return (
    <div
      className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-full h-screen "
      onClick={onClose} // ✅ outside click close
    >

      <div
        className="card bg-base-100 w-96 shadow-lg relative h-[90%] w-[50%]"
        onClick={(e) => e.stopPropagation()} // ❌ close na ho andar click pe
      >

        {/* Close button */}
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Image */}
        {data.image ? (
          <figure>
            <img src={`http://localhost:8000/${data.image}`} />
          </figure>
        ) : (
          <figure>
            <img src="https://via.placeholder.com/300" />
          </figure>
        )}

        {/* Data */}
        <div className="card-body text-white">

          <div className="card-body">
            <h2 className="card-title">{data.title}</h2>
            <p>{data.description}</p>

            <p>Category: {data.category}</p>
            <p>Status: {data.status}</p>

              <p>{data.date}</p>
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewComplaint;