import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../Component/Navbar";
import Alert from "../Component/Alert";

function OTPVerification() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [dataToDisplay, setData] = useState("An OTP has been sent to your email")
  const [clsSetter, setCls] = useState("alert alert-warning")
  const [Openalert, setalert] = useState(true)


  const handleChange = (value, index) => {
    // Only allow numbers
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move forward
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const submitFunc = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");
    setLoading(true);

    axios.post("http://localhost:8000/auth/otpverification", 
      { otp: finalOtp }, 
      { withCredentials: true }
    )
      .then((resp) => {
        if (resp.status === 200 && (resp.data.redirect==="dashboard")) {
          setData("OTP Verified Successfully. Now Login");
          setCls("alert alert-success");
          setTimeout(() => {
            navigate("/"); //change this to /login later on
          }, 4000);
        } else {
          setData("Unexpected response from server.");
          setCls("alert alert-warning");
        }

        setalert(true);
      })
      .catch((err) => {
        if (!err.response) {
          setData("Server Not Reachable")
        }

        else if (err.response.status === 401) {
          if(err.response.data.detail==="Session Expired"){
          setData("Session Expired Try Again")
          }
          else if(err.response.data.detail==="Invalid OTP"){
          setData("Invalid OTP , Try Again")
          }

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
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100">
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
        {Openalert && <Alert value={dataToDisplay} cls={clsSetter} />}
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#1152d4]" />
              IssueHub
              <span className="text-slate-400">•</span>
              Verify account
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Verify your email
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm/6 text-slate-600 sm:text-base">
              Enter the 6-digit code we sent to your official email to complete your registration.
            </p>
          </div>

          <div className="mx-auto mt-8 w-full max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={submitFunc} className="flex flex-col items-stretch">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Security check
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    OTP verification
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Please enter the 6-digit code sent to your email.
                  </p>
                </div>

                <div className="flex justify-between gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border border-slate-200 bg-white text-center text-base font-semibold text-slate-900 outline-none transition focus:border-[#1152d4] focus:ring-4 focus:ring-[#1152d4]/15"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-4 focus:ring-[#1152d4]/20 ${
                    loading ? "bg-slate-300" : "bg-[#1152d4] hover:bg-[#0b3aa4] active:bg-[#092f86]"
                  }`}
                >
                  {loading ? "Verifying..." : "Verify and create account"}
                </button>

                <p className="mt-5 text-center text-xs text-slate-500">
                  Didn’t receive the code? <button type="button" className="font-semibold text-[#1152d4] hover:underline">Resend</button>
                </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default OTPVerification;
