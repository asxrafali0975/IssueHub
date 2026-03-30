import React from 'react'

function CompStatusGrid({dataToDisplay}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
    <div className=" text-blue-600 rounded-xl p-6 flex flex-col items-center shadow-md border-slate-300 border-[1.5px]">
      <div className="text-xl font-bold">Pending</div>
      <div className="text-4xl font-extrabold mt-2">
        {dataToDisplay.filter((c) => c.status === "pending").length}
       
      </div>
    </div>
    <div className=" text-green-600 rounded-xl p-6 flex flex-col items-center shadow-md border-slate-300 border-[1.5px]">
      <div className="text-xl font-bold">Resolved</div>
      <div className="text-4xl font-extrabold mt-2">
        {dataToDisplay.filter((c) => c.status === "resolved").length}
      </div>
    </div>
    <div className="  text-yellow-500 rounded-xl p-6 flex flex-col items-center shadow-md border-slate-300 border-[1.5px]">
      <div className="text-xl font-bold">Total</div>
      <div className="text-4xl font-extrabold mt-2">{dataToDisplay.length}</div>
    </div>
  </div>

  )
}

export default CompStatusGrid