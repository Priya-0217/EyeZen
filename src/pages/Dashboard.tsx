import React, { useState } from 'react';
import { setTheme } from '../theme';

const presets = {
  Health: { warmth: 0.4, brightness: 0.85 },
  Office: { warmth: 0.2, brightness: 1 },
  Reading: { warmth: 0.5, brightness: 0.8 },
  Game: { warmth: 0.1, brightness: 1 },
  Movie: { warmth: 0.3, brightness: 0.7 },
  Editing: { warmth: 0.15, brightness: 0.95 },
  Custom: { warmth: 0.3, brightness: 0.9 },
};

const presetDescriptions: Record<string, string> = {
  Health: 'Slightly lower color temperature and brightness, darker than office mode, suitable for people who are sensitive to light',
  Office: 'Balanced settings for comfortable office work',
  Reading: 'Warmer tones and reduced brightness for extended reading',
  Game: 'Minimal filtering for color accuracy in gaming',
  Movie: 'Optimized for watching movies in darker environments',
  Editing: 'Slight filtering while maintaining color accuracy',
  Custom: 'Your personalized settings',
};

export default function Dashboard() {
  const [enabled, setEnabled] = useState(false);
  const [warmth, setWarmth] = useState(0.3);
  const [brightness, setBrightness] = useState(1);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Calculate color temperature in Kelvin
  const getColorTemp = () => {
    const minTemp = 2700;
    const maxTemp = 6500;
    return Math.round(minTemp + (1 - warmth) * (maxTemp - minTemp));
  };

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    window.electronAPI?.toggleFilter(newEnabled);
  };

  const handleWarmthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setWarmth(value);
    setActivePreset(null);
    if (!enabled) {
      setEnabled(true);
      window.electronAPI?.toggleFilter(true);
    }
    window.electronAPI?.updateFilter(value, brightness);
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBrightness(value);
    setActivePreset(null);
    if (!enabled) {
      setEnabled(true);
      window.electronAPI?.toggleFilter(true);
    }
    window.electronAPI?.updateFilter(warmth, value);
  };

  const handlePresetClick = (presetName: string) => {
    const preset = presets[presetName as keyof typeof presets];
    setWarmth(preset.warmth);
    setBrightness(preset.brightness);
    setActivePreset(presetName);
    if (!enabled) {
      setEnabled(true);
      window.electronAPI?.toggleFilter(true);
    }
    window.electronAPI?.updateFilter(preset.warmth, preset.brightness);
  };

  const handleDay = () => {
    const dayWarmth = 0.15;
    const dayBrightness = 1;
    setWarmth(dayWarmth);
    setBrightness(dayBrightness);
    setActivePreset(null);
    setTheme('light');
    if (!enabled) {
      setEnabled(true);
      window.electronAPI?.toggleFilter(true);
    }
    window.electronAPI?.updateFilter(dayWarmth, dayBrightness);
  };

  const handleNight = () => {
    const nightWarmth = 0.6;
    const nightBrightness = 0.7;
    setWarmth(nightWarmth);
    setBrightness(nightBrightness);
    setActivePreset(null);
    setTheme('dark');
    if (!enabled) {
      setEnabled(true);
      window.electronAPI?.toggleFilter(true);
    }
    window.electronAPI?.updateFilter(nightWarmth, nightBrightness);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Display Settings</h1>

      {/* Color Temperature Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-5">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-medium text-gray-800">Color Temperature</span>
          <span className="text-lg font-semibold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-md">
            {getColorTemp()}K
          </span>
        </div>
        
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm text-gray-500 min-w-[60px] text-center">Warm</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={warmth}
            onChange={handleWarmthChange}
            className="flex-1 h-2 rounded appearance-none cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #ff8c42, #4a90e2)'
            }}
          />
          <span className="text-sm text-gray-500 min-w-[60px] text-center">Cool</span>
        </div>
      </div>

      {/* Brightness Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-5">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-medium text-gray-800">Brightness</span>
          <span className="text-lg font-semibold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-md">
            {Math.round(brightness * 100)}%
          </span>
        </div>
        
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm text-gray-500 min-w-[60px] text-center">Dimmer</span>
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.01"
            value={brightness}
            onChange={handleBrightnessChange}
            className="flex-1 h-2 rounded appearance-none cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #2d3748, #17a2b8)'
            }}
          />
          <span className="text-sm text-gray-500 min-w-[60px] text-center">Brighter</span>
        </div>
      </div>

      {/* Auto Day/Night Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative inline-block w-12 h-6">
            <input type="checkbox" className="peer sr-only" id="auto-toggle" />
            <label
              htmlFor="auto-toggle"
              className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-cyan-600 transition-colors"
            ></label>
            <label
              htmlFor="auto-toggle"
              className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-6 cursor-pointer"
            ></label>
          </div>
          
          <span className="text-base font-medium text-gray-800">Auto Day/Night</span>
          <span className="text-blue-500 cursor-pointer text-sm">ⓘ</span>
          
          <div className="flex gap-2 ml-auto">
            <button onClick={handleDay} className="px-5 py-2 border-2 border-gray-200 bg-white rounded-md text-sm font-medium text-gray-600 hover:border-cyan-600 hover:text-cyan-600 transition-all">
              Day
            </button>
            <button onClick={handleNight} className="px-5 py-2 border-2 border-gray-200 bg-white rounded-md text-sm font-medium text-gray-600 hover:border-cyan-600 hover:text-cyan-600 transition-all">
              Night
            </button>
            <button className="px-3 py-2 border-2 border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 rounded-md text-base hover:border-cyan-600 hover:bg-cyan-50 transition-all">
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* Presets Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Presets</h3>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          {Object.keys(presets).map((presetName) => (
            <button
              key={presetName}
              onClick={() => handlePresetClick(presetName)}
              className={`
                px-4 py-3 border-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activePreset === presetName
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md'
                  : 'border-gray-200 text-gray-700 bg-white hover:border-cyan-600 hover:bg-cyan-50 hover:-translate-y-0.5 hover:shadow-md'
                }
              `}
            >
              {presetName}
            </button>
          ))}
        </div>
        
        {activePreset && (
          <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-600 leading-relaxed border-l-4 border-cyan-600">
            {presetDescriptions[activePreset]}
          </div>
        )}
      </div>

      {/* Status Card */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl p-6 shadow-md text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${enabled ? 'bg-green-400 animate-pulse' : 'bg-white/30'}`}></div>
            <span className="text-base font-medium">
              {enabled ? 'Filter Active' : 'Filter Disabled'}
            </span>
          </div>
          
          <button
            onClick={handleToggle}
            className="px-6 py-2.5 bg-white/20 border-2 border-white/40 rounded-lg text-white text-sm font-semibold hover:bg-white/30 hover:border-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            {enabled ? 'Disable Filter' : 'Enable Filter'}
          </button>
        </div>
      </div>
    </div>
  );
}
