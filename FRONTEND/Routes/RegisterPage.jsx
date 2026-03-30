import React, { useState, useTransition } from 'react'
import Navbar from '../Component/Navbar'
import axios from 'axios'
import Alert from '../Component/Alert'
import { useNavigate, Link } from 'react-router'

function RegisterPage() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [dataToDisplay, setData] = useState("")
  const [clsSetter, setCls] = useState("")
  const [pending, startTransition] = useTransition()

  const [Openalert, setalert] = useState(false)

  const submitFunc = (e) => {
    e.preventDefault()



    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setData("Both Email And Password are Required")
      setCls("alert alert-warning")
      setalert(true)
      return
    }

    if (!trimmedEmail.endsWith("@axiscolleges.in")) {

      setData("Enter Correct Email ")
      setCls("alert alert-warning")
      setalert(true)
      return

    }

    axios.post("http://localhost:8000/auth/SignUp", {
      "email": trimmedEmail,
      "password": trimmedPassword
    }, { withCredentials: true })
      .then((resp) => {
        if (resp.status === 201) {
          if (resp.data.redirect === "mail_sent") {
            navigate("/OTP")
          }
        }
      })
      .catch((err) => {

        if (!err.response) {
          setData("Server Not Reachable")
        }

        else if (err.response.status === 409) {
          setData("User Already Exists")

        }
        else if (err.response.status === 500) {
          setData("Internal Server Error")
        }
        else {
          setData("Unknown Error")
        }
        setCls("alert alert-error")
        setalert(true)

      })
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100">

        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
          {Openalert && <Alert value={dataToDisplay} cls={clsSetter} />}
          <div className="mx-auto max-w-2xl text-center">

            <Navbar />

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Track, manage, and resolve issues—faster.
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm/6 text-slate-600 sm:text-base">
              Raise issues, follow progress, and keep communication clear with a simple workflow built for students and staff.
            </p>
          </div>

          <div className="mx-auto mt-8 w-full max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={submitFunc} className="flex flex-col">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    CREATE ACCOUNT
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Sign Up
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Use your official college email to register.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="name@axiscolleges.in"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#1152d4] focus:ring-4 focus:ring-[#1152d4]/15"
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#1152d4] focus:ring-4 focus:ring-[#1152d4]/15"
                  />
                </div>

                <button
                  type="submit"


                  className={`mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-4 focus:ring-[#1152d4]/20 ${pending
                    ? "bg-slate-300"
                    : "bg-[#1152d4] hover:bg-[#0b3aa4] active:bg-[#092f86]"
                    }`}
                >
                  Register
                </button>

                <p className="mt-5 text-center text-xs text-slate-500">
                  Already have an account ? <span className='text-[#1152d4]'> <Link to="/">Login</Link> </span>
                </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default RegisterPage
