import React, { useState } from 'react';

export default function Schedule() {
  const [autoSchedule, setAutoSchedule] = useState(false);
  const [enableTime, setEnableTime] = useState('20:00');
  const [disableTime, setDisableTime] = useState('06:00');
  const [transition, setTransition] = useState<'gradual' | 'instant'>('gradual');
  const [activeDays, setActiveDays] = useState({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: false,
    Sun: false,
  });

  const handleDayToggle = (day: string) => {
    setActiveDays((prev) => ({
      ...prev,
      [day]: !prev[day as keyof typeof prev],
    }));
  };

  const handleSave = () => {
    console.log('Saving schedule:', {
      autoSchedule,
      enableTime,
      disableTime,
      transition,
      activeDays,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Schedule</h1>

      {/* Auto Schedule Toggle */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-5">
        <div className="flex justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Automatic Schedule</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Automatically enable filter during evening hours to reduce eye strain
            </p>
          </div>
          
          <div className="relative inline-block w-14 h-8 flex-shrink-0">
            <input
              type="checkbox"
              className="peer sr-only"
              id="auto-schedule"
              checked={autoSchedule}
              onChange={(e) => setAutoSchedule(e.target.checked)}
            />
            <label
              htmlFor="auto-schedule"
              className="block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-cyan-600 transition-colors"
            ></label>
            <label
              htmlFor="auto-schedule"
              className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-6 cursor-pointer"
            ></label>
          </div>
        </div>
      </div>

      {/* Schedule Settings */}
      <div className={`bg-white rounded-xl p-6 shadow-sm mb-5 ${!autoSchedule ? 'opacity-50 pointer-events-none' : ''}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-5">Schedule Settings</h3>

        <div className="grid grid-cols-2 gap-6">
          {/* Enable Time */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800 flex items-center gap-2">
              <span className="text-lg">🌙</span>
              Enable Filter At
            </label>
            <input
              type="time"
              value={enableTime}
              onChange={(e) => setEnableTime(e.target.value)}
              disabled={!autoSchedule}
              className="p-3 border-2 border-gray-200 rounded-lg text-base text-gray-700 bg-white hover:border-gray-300 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all disabled:bg-gray-50"
            />
            <span className="text-xs text-gray-400">Evening start time</span>
          </div>

          {/* Disable Time */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800 flex items-center gap-2">
              <span className="text-lg">☀️</span>
              Disable Filter At
            </label>
            <input
              type="time"
              value={disableTime}
              onChange={(e) => setDisableTime(e.target.value)}
              disabled={!autoSchedule}
              className="p-3 border-2 border-gray-200 rounded-lg text-base text-gray-700 bg-white hover:border-gray-300 focus:outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 transition-all disabled:bg-gray-50"
            />
            <span className="text-xs text-gray-400">Morning end time</span>
          </div>
        </div>

        {/* Transition Type */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-800 block mb-3">Transition Style</label>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTransition('gradual')}
              disabled={!autoSchedule}
              className={`
                flex items-center gap-3 p-4 border-2 rounded-lg transition-all duration-200 text-left
                ${transition === 'gradual'
                  ? 'border-cyan-600 bg-cyan-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-cyan-600 hover:bg-cyan-50 hover:-translate-y-0.5 hover:shadow-md'
                }
                disabled:cursor-not-allowed disabled:opacity-50
              `}
            >
              <span className="text-2xl">📊</span>
              <div>
                <div className="text-sm font-semibold text-gray-800">Gradual</div>
                <div className="text-xs text-gray-500">Smooth 30-minute transition</div>
              </div>
            </button>

            <button
              onClick={() => setTransition('instant')}
              disabled={!autoSchedule}
              className={`
                flex items-center gap-3 p-4 border-2 rounded-lg transition-all duration-200 text-left
                ${transition === 'instant'
                  ? 'border-cyan-600 bg-cyan-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-cyan-600 hover:bg-cyan-50 hover:-translate-y-0.5 hover:shadow-md'
                }
                disabled:cursor-not-allowed disabled:opacity-50
              `}
            >
              <span className="text-2xl">⚡</span>
              <div>
                <div className="text-sm font-semibold text-gray-800">Instant</div>
                <div className="text-xs text-gray-500">Apply immediately</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Active Days */}
      <div className={`bg-white rounded-xl p-6 shadow-sm mb-5 ${!autoSchedule ? 'opacity-50 pointer-events-none' : ''}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Active Days</h3>
        <p className="text-sm text-gray-500 mb-4">Select which days the schedule should run</p>

        <div className="grid grid-cols-7 gap-3">
          {Object.entries(activeDays).map(([day, isActive]) => (
            <button
              key={day}
              onClick={() => handleDayToggle(day)}
              disabled={!autoSchedule}
              className={`
                py-3.5 border-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-cyan-600 text-white border-cyan-600'
                  : 'border-gray-200 text-gray-700 bg-white hover:border-cyan-600 hover:bg-cyan-50'
                }
                disabled:cursor-not-allowed disabled:opacity-50
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl p-6 shadow-md text-white mb-6">
        <div className="flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">ℹ️</span>
          <div className="text-sm leading-relaxed">
            {autoSchedule ? (
              <>
                <strong className="block text-base mb-1.5">Schedule Active</strong>
                <p className="opacity-95">
                  Filter will enable at {enableTime} and disable at {disableTime}
                  {' '}on {Object.entries(activeDays).filter(([_, active]) => active).map(([day]) => day).join(', ')}
                </p>
              </>
            ) : (
              <>
                <strong className="block text-base mb-1.5">Schedule Inactive</strong>
                <p className="opacity-95">Enable automatic schedule to activate filter based on time</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!autoSchedule}
          className="px-8 py-3 bg-cyan-600 text-white rounded-lg text-base font-semibold flex items-center gap-2 hover:bg-cyan-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
        >
          💾 Save Schedule
        </button>
      </div>
    </div>
  );
}
