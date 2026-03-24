import React from 'react'

function CompStatusGrid({dataToDisplay}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
    <div className="bg-gradient-to-br from-blue-500 to-sky-400 text-white rounded-xl p-6 flex flex-col items-center shadow-md">
      <div className="text-xl font-bold">Pending</div>
      <div className="text-4xl font-extrabold mt-2">
        {dataToDisplay.filter((c) => c.status === "pending").length}
       
      </div>
    </div>
    <div className="bg-gradient-to-br from-pink-400 via-pink-300 to-pink-200 text-white rounded-xl p-6 flex flex-col items-center shadow-md">
      <div className="text-xl font-bold">Resolved</div>
      <div className="text-4xl font-extrabold mt-2">
        {dataToDisplay.filter((c) => c.status === "resolved").length}
      </div>
    </div>
    <div className="bg-gradient-to-br from-slate-300 to-slate-100 text-blue-800 rounded-xl p-6 flex flex-col items-center shadow-md">
      <div className="text-xl font-bold">Total</div>
      <div className="text-4xl font-extrabold mt-2">{dataToDisplay.length}</div>
    </div>
  </div>

  )
}

export default CompStatusGrid