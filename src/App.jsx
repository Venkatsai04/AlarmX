import React, { useState } from 'react'

const App = () => {

  const [Time, setTime] = useState(0)

  const getCurrTime = () => {
    const now = new Date()
    const Hours = now.getHours().toString()
    const Minutes = now.getMinutes().toString()
    const Seconds = now.getSeconds().toString()
    const timeNow = `${Hours.length == 2 ? Hours : '0' + Hours}:${Minutes.length == 2 ? Minutes : '0' + Minutes}`
    return timeNow
  }

  setInterval(() => {
    setTime(getCurrTime())
  }, 1000);

  return (
    <>
      <div
        className="relative flex min-h-screen flex-col bg-[#141a1f] justify-between overflow-x-hidden"
        style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
      >
        <div>
          <div className="flex items-center bg-[#141a1f] p-4 pb-2 justify-between">
            <div className="text-white flex size-12 shrink-0 items-center">
              {/* Gear Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,80a48,48..." />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold flex-1 text-center">AlarmX</h2>
            <div className="flex w-12 items-center justify-end">
              <button className="flex h-12 items-center justify-center rounded-full text-white">
                <div className="text-white">
                  {/* Plus Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,128a8..." />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <h1 className="text-white text-[32px] font-bold px-4 text-center pb-3 pt-6">{Time}</h1>

          {["7:00 AM", "8:00 AM", "9:00 AM"].map((time, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-[#141a1f] px-4 min-h-[72px] py-2 justify-between"
            >
              <div className="flex flex-col justify-center">
                <p className="text-white text-base font-medium">{time}</p>
                <p className="text-[#9daebe] text-sm">Mon, Tue, Wed, Thu, Fri</p>
              </div>
              <div className="shrink-0">
                <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-[#2b3640] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#dce8f3]">
                  <div
                    className="h-full w-[27px] rounded-full bg-white"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px" }}
                  ></div>
                  <input type="checkbox" className="invisible absolute" />
                </label>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex gap-2 border-t border-[#2b3640] bg-[#1f272e] px-4 pb-3 pt-2">
            <a className="flex flex-1 flex-col items-center text-white" href="#">
              <div className="flex h-8 items-center justify-center">
                {/* User Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M230.93,220..." />
                </svg>
              </div>
            </a>
            <a className="flex flex-1 flex-col items-center text-[#9daebe]" href="#">
              <div className="flex h-8 items-center justify-center">
                {/* Android Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M176,156a12..." />
                </svg>
              </div>
            </a>
          </div>
          <div className="h-5 bg-[#1f272e]"></div>
        </div>
      </div>
    </>
  )
}

export default App
