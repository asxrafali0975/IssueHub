import React from 'react'

function Navbar() {
  return (
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#1152d4]" />
              IssueHub
              <span className="text-slate-400">•</span>
              Campus Issue Tracker
            </div>
  )
}

export default Navbar