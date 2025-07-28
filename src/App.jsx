import React, { useRef, useEffect, useState } from 'react';
import FaceTime from './components/FaceTime';

const App = () => {
  const alarmSoundRef = useRef(new Audio('/alarm.wav'));

  const [showDialog, setShowDialog] = useState(false);
  const [newTime, setNewTime] = useState(''); // This will still be HH:MM from the input
  const [newNote, setNewNote] = useState('');
  const [repeatDays, setRepeatDays] = useState([]);
  const [AlrmQueue, setAlrmQueue] = useState([]);
  const [IsAlarmRunning, setIsAlarmRunning] = useState(false);
  const [IsMorning, setIsMorning] = useState(true);

  const [Time, setTime] = useState();
  const [AlarmsList, setAlarmsList] = useState([
    {
      time: "13:42:05", // Example: Set with seconds
      note: "Wake Up Call",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  ]);

  useEffect(() => {
    if (alarmSoundRef.current) {
      alarmSoundRef.current.loop = true;
    }

    const interval = setInterval(() => {
      if (!IsAlarmRunning && AlrmQueue.length > 0) {
        const now = new Date();
        const Hours = now.getHours().toString().padStart(2, '0');
        const Minutes = now.getMinutes().toString().padStart(2, '0');
        const Seconds = now.getSeconds().toString().padStart(2, '0'); // Get seconds
        const timeNow = `${Hours}:${Minutes}:${Seconds}`; // Full HH:MM:SS
        const currentDay = now.toLocaleString('en-US', { weekday: 'short' });

        AlrmQueue.forEach((alarm) => {
          const alarmDays = alarm.days || [];
          // Ensure alarm.time always has seconds for direct comparison
          const fullAlarmTime = alarm.time.length === 5 ? `${alarm.time}:00` : alarm.time; // Add seconds if missing

          const shouldTrigger = alarmDays.length === 0 || alarmDays.includes(currentDay);

          if (fullAlarmTime === timeNow && shouldTrigger) { // Compare full HH:MM:SS
            setIsAlarmRunning(true);
            alarmSoundRef.current.play();
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [AlrmQueue, IsAlarmRunning]);

  const setAlarm = (alarmObject) => {
    if (alarmObject && alarmObject.time && alarmObject.note) {
      // Ensure the time string always includes seconds when adding to queue
      const timeWithSeconds = alarmObject.time.length === 5 ? `${alarmObject.time}:00` : alarmObject.time;
      const alarmWithDays = { ...alarmObject, time: timeWithSeconds, days: alarmObject.days || [] };
      setAlrmQueue(prev => [...prev, alarmWithDays]);
    }
  };

  const handleVerifiedStop = () => {
    setIsAlarmRunning(false);
    alarmSoundRef.current.pause();
    alarmSoundRef.current.currentTime = 0;
  };

  const getCurrTime = () => {
    const now = new Date();
    const Hours = now.getHours().toString().padStart(2, '0'); // padStart for 2 digits
    const Minutes = now.getMinutes().toString().padStart(2, '0');
    const Seconds = now.getSeconds().toString().padStart(2, '0');
    const timeNow = `${Hours}:${Minutes}:${Seconds}`;
    return timeNow;
  };

  useEffect(() => {
    // const now = new Date();
    // const Hours = now.getHours();
    // if (Hours >= 4 && Hours < 12) {
    //   setIsMorning(true);
    // } else {
    //   setIsMorning(false);
    // }
    setIsMorning(true)
  }, [IsAlarmRunning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 22V20C20 18.9391 19.5786 17.9217 18.8284 17.1716C18.0783 16.4214 17.0609 16 16 16H8C6.93913 16 5.92172 16.4214 5.17157 17.1716C4.42143 17.9217 4 18.9391 4 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <h1 className="text-white text-[40px] font-bold px-4 text-center pb-3 pt-6">{Time}</h1>

          <div className='h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700'>
            {AlarmsList.map((alarm, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#0a0029] px-4 min-h-[72px] py-2 justify-around overflow-y-auto"
              >
                <div className="flex flex-col justify-center">
                  <p className="text-white text-base font-medium">{alarm.time}</p> {/* Now displays HH:MM:SS */}
                  <p className="text-yellow-300 text-base w-25 overflow-x-auto font-small text-nowrap">{alarm.note}</p>
                  <p className="text-[#9daebe] text-sm w-25 overflow-x-auto [&::-webkit-scrollbar]:h-2 text-nowrap">
                    {(alarm.days && alarm.days.length > 0) ? (alarm.days.length !== 7 ? alarm.days.join(', ') : 'Everyday') : 'No repeat'}
                  </p>
                </div>
                <div className="shrink-0">
                  <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-[#2b3640] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-yellow-300">
                    <div
                      className="h-full w-[27px] rounded-full bg-white"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px" }}
                    ></div>
                    <input
                      type="checkbox"
                      checked={AlrmQueue.some(a => a.time === alarm.time && a.note === alarm.note)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAlarm(alarm);
                        } else {
                          setAlrmQueue(prev => prev.filter(a => !(a.time === alarm.time && a.note === alarm.note)));
                        }
                      }}
                      className="invisible absolute"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mb-12 mt-4">
          <button
            onClick={() => setShowDialog(true)}
            className="w-12 h-12 flex items-center justify-center bg-yellow-300 rounded-full hover:bg-blue-700 transition"
          >
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
        </div>
      </div>

      {showDialog && (
        <div className="mt-3 fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-40">
          <div className="bg-transparent backdrop-blur-xl rounded-xl p-6 w-80 space-y-4 shadow-amber-50">
            <h2 className="text-xl font-bold text-center text-white">New Alarm</h2>

            <label className="block ">
              <span className="text-sm font-semibold text-white">Time</span>
              {/* Keep type="time" but clarify its HH:MM nature */}
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full mt-1 p-2 border rounded bg-white"
              />
               <p className="text-xs text-gray-400 mt-1">Alarm will set at :00 seconds (e.g., 12:30:00)</p>
            </label>

            <label className="block ">
              <span className="text-sm font-semibold text-white">Note</span>
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full mt-1 p-2 border rounded bg-white"
                placeholder="E.g. Wake up"
              />
            </label>

            <div>
              <span className="text-sm font-semibold block mb-2 text-white">Repeat</span>
              <div className="grid grid-cols-4 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() =>
                      setRepeatDays((prev) =>
                        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                      )
                    }
                    className={`px-2 py-1 text-sm rounded-full ${repeatDays.includes(day) ? 'bg-blue-700 text-white' : 'bg-gray-200'
                      }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowDialog(false)} className="text-gray-500 hover:underline">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newTime) {
                    // When saving, ensure newTime includes seconds, defaulting to :00
                    const timeWithSeconds = newTime.length === 5 ? `${newTime}:00` : newTime;

                    setAlarmsList((prev) => [
                      ...prev,
                      {
                        time: timeWithSeconds, // Save with seconds
                        note: newNote || 'Alarm',
                        days: [...repeatDays],
                      },
                    ]);
                    setShowDialog(false);
                    setNewTime('');
                    setNewNote('');
                    setRepeatDays([]);
                  }
                }}
                className="bg-yellow-300 px-4 py-2 rounded text-black font-semibold hover:bg-blue-700 hover:text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {
        IsAlarmRunning && (
          <div className='fixed inset-0 z-[50000] bg-white flex items-center justify-center'>
            <div className='text-center'>
              <h1 className='text-3xl font-bold mb-4'>⏰</h1>
              {IsMorning ? (
                <FaceTime stopAlarm={handleVerifiedStop} />
              ) : (
                <button
                  onClick={handleVerifiedStop}
                  className='px-6 py-3 bg-yellow-300 text-black font-semibold rounded-lg hover:bg-red-700 transition'
                >
                  Stop Alarm
                </button>
              )}
            </div>
          </div>
        )
      }
    </>
  );
};

export default App;