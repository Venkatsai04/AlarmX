import React, { useState } from 'react'

const App = () => {

  const [Time, setTime] = useState()
  const [Alarms, setAlarms] = useState([
    {
      time: "7:00 AM",
      note: "wake"
    },
    {
      time: "9:00 AM",
      note: "Bot"
    },
    {
      time: "10:00 AM",
      note: "Bot wake"
    },
    {
      time: "7:00 AM",
      note: "wake"
    },
    {
      time: "9:00 AM",
      note: "Bot"
    },
    {
      time: "10:00 AM",
      note: "Bot wake"
    },
    {
      time: "7:00 AM",
      note: "wake"
    },
    {
      time: "9:00 AM",
      note: "Bot"
    },
    {
      time: "10:00 AM",
      note: "Bot wake"
    },
  ])

  const getCurrTime = () => {
    const now = new Date()
    const Hours = now.getHours().toString()
    const Minutes = now.getMinutes().toString()
    const Seconds = now.getSeconds().toString()
    const timeNow = `${Hours.length == 2 ? Hours : '0' + Hours}:${Minutes.length == 2 ? Minutes : '0' + Minutes}:${Seconds.length == 2 ? Seconds : '0' + Seconds}`
    return timeNow
  }

  setInterval(() => {
    setTime(getCurrTime())
  }, 1000);

  return (
    <>
      <div
        className="relative flex min-h-screen flex-col bg-[#0a0029] justify-between overflow-x-hidden"
        style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
      >
        <div>
          <div className="flex items-center bg-[#0a0029] p-6 pb-2 justify-between">
            <h2 className="text-white text-lg font-bold ml-[25px] text-[25px] ">Alarm<span className='text-yellow-300'>X</span></h2>
            <div className=" w-12 ">
              <button className=" h-12 rounded-full text-white">
                <div className="text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M20 22V20C20 18.9391 19.5786 17.9217 18.8284 17.1716C18.0783 16.4214 17.0609 16 16 16H8C6.93913 16 5.92172 16.4214 5.17157 17.1716C4.42143 17.9217 4 18.9391 4 20V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <h1 className="text-white text-[40px] font-bold px-4 text-center pb-3 pt-6">{Time}</h1>

          {Alarms.map((alarm, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-[#0a0029] px-4 min-h-[72px] py-2 justify-around "
            >
              <div className="flex flex-col justify-center">
                <p className="text-white text-base font-medium">{alarm.time}</p>
                <p className="text-yellow-300 text-base font-small">{alarm.note}</p>
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

        <div className='flex items-center justify-center mb-12 mt-10 '>
          <button
            // onClick={onClick}
            className="flex items-center scale-105 justify-center w-12 h-12 rounded-full bg-yellow-300 text-black text-2xl hover:bg-blue-700 transition-colors"
            aria-label="Add"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
        </div>


      </div>
    </>
  )
}

export default App
