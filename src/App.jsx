import React, { useState } from 'react'

const App = () => {

  const [Time, setTime] = useState(0)

  const getCurrTime = () => {
    const now = new Date()
    const Hours = now.getHours().toString()
    const Minutes = now.getMinutes().toString()
    const Seconds = now.getSeconds().toString()

    const timeNow = `${Hours.length == 2? Hours: '0' + Hours}:${Minutes.length == 2? Minutes: '0' + Minutes}:${Seconds.length == 2? Seconds: '0' + Seconds}`

    return timeNow
  }

  setInterval(() => {
    console.log(getCurrTime());
    setTime(getCurrTime())
  }, 1000);

  return (
    <>
      <div className='flex items-center justify-center flex-col mt-4 gap-3'>
        <div>AlarmX</div>
        <span className='bold xl'>{Time}</span>
        <button className='pt-1 pb-1 pl-2 pr-2 bg-amber-200'>Set</button>
      </div>
    </>
  )
}

export default App
