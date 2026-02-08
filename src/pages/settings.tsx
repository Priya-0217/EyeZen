import React, { useState } from 'react';

export default function Settings() {
  const [launchAtStartup, setLaunchAtStartup] = useState(false);
  const [minimizeToTray, setMinimizeToTray] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);

  const handleCheckUpdates = () => {
    alert('You are using the latest version!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Settings</h1>

      {/* General Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-5">General Preferences</h3>

        <div className="divide-y divide-gray-200">
          {/* Launch at Startup */}
          <div className="flex justify-between items-center py-5">
            <div className="flex-1">
              <div className="text-base font-medium text-gray-800 mb-1">Launch at Startup</div>
              <div className="text-sm text-gray-500">Automatically start EyeCare when you log in</div>
            </div>
            
            <div className="relative inline-block w-12 h-6 ml-6">
              <input
                type="checkbox"
                className="peer sr-only"
                id="startup"
                checked={launchAtStartup}
                onChange={(e) => setLaunchAtStartup(e.target.checked)}
              />
              <label
                htmlFor="startup"
                className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-cyan-600 transition-colors"
              ></label>
              <label
                htmlFor="startup"
                className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-6 cursor-pointer"
              ></label>
            </div>
          </div>

          {/* Minimize to Tray */}
          <div className="flex justify-between items-center py-5">
            <div className="flex-1">
              <div className="text-base font-medium text-gray-800 mb-1">Minimize to System Tray</div>
              <div className="text-sm text-gray-500">Keep app running in background when closed</div>
            </div>
            
            <div className="relative inline-block w-12 h-6 ml-6">
              <input
                type="checkbox"
                className="peer sr-only"
                id="tray"
                checked={minimizeToTray}
                onChange={(e) => setMinimizeToTray(e.target.checked)}
              />
              <label
                htmlFor="tray"
                className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-cyan-600 transition-colors"
              ></label>
              <label
                htmlFor="tray"
                className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-6 cursor-pointer"
              ></label>
            </div>
          </div>

          {/* Show Notifications */}
          <div className="flex justify-between items-center py-5">
            <div className="flex-1">
              <div className="text-base font-medium text-gray-800 mb-1">Show Notifications</div>
              <div className="text-sm text-gray-500">Display system notifications for events</div>
            </div>
            
            <div className="relative inline-block w-12 h-6 ml-6">
              <input
                type="checkbox"
                className="peer sr-only"
                id="notifications"
                checked={showNotifications}
                onChange={(e) => setShowNotifications(e.target.checked)}
              />
              <label
                htmlFor="notifications"
                className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-cyan-600 transition-colors"
              ></label>
              <label
                htmlFor="notifications"
                className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-6 cursor-pointer"
              ></label>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Keyboard Shortcuts</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700 font-medium">Toggle Filter</span>
            <div className="flex gap-1.5 items-center text-sm text-gray-600">
              <kbd className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-md font-mono text-xs font-semibold text-gray-700 shadow-sm">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-md font-mono text-xs font-semibold text-gray-700 shadow-sm">Alt</kbd>
              <span>+</span>
              <kbd className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-md font-mono text-xs font-semibold text-gray-700 shadow-sm">F</kbd>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700 font-medium">Open Dashboard</span>
            <div className="flex gap-1.5 items-center text-sm text-gray-600">
              <kbd className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-md font-mono text-xs font-semibold text-gray-700 shadow-sm">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-md font-mono text-xs font-semibold text-gray-700 shadow-sm">Alt</kbd>
              <span>+</span>
              <kbd className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-md font-mono text-xs font-semibold text-gray-700 shadow-sm">D</kbd>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700 font-medium">Quick Settings</span>
            <div className="flex gap-1.5 items-center text-sm text-gray-600">
              <kbd className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-md font-mono text-xs font-semibold text-gray-700 shadow-sm">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-md font-mono text-xs font-semibold text-gray-700 shadow-sm">Alt</kbd>
              <span>+</span>
              <kbd className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-md font-mono text-xs font-semibold text-gray-700 shadow-sm">S</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">About EyeCare</h3>

        <div className="text-center">
          <div className="text-6xl mb-4">👀</div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">EyeCare</h2>
          <p className="text-sm text-gray-500 mb-4">Version 1.0.0</p>
          
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
            Free desktop eye protection app that reduces eye strain by filtering blue light
            and controlling screen brightness. Built as an open-source alternative to commercial
            eye care software.
          </p>

          <div className="flex flex-col gap-3 max-w-md mx-auto mb-8">
            <button
              onClick={handleCheckUpdates}
              className="px-6 py-3 border-2 border-cyan-600 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 hover:border-cyan-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
            >
              🔄 Check for Updates
            </button>
            
            <button className="px-6 py-3 border-2 border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-700 hover:border-cyan-600 hover:bg-cyan-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-2">
              <a href="https://github.com/yourusername/eyecare" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                💻 View on GitHub
              </a>
            </button>
            
            <button className="px-6 py-3 border-2 border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-700 hover:border-cyan-600 hover:bg-cyan-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-2">
              📝 Report Issue
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-base font-semibold text-gray-800 mb-3">Credits</h4>
            <p className="text-sm text-gray-600 mb-1">Built with Electron, React, and TypeScript</p>
            <p className="text-xs text-gray-400">Licensed under MIT License</p>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm mb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Information</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between p-3 bg-white rounded-md">
            <span className="text-sm font-medium text-gray-600">Platform:</span>
            <span className="text-sm text-gray-500 font-mono">{navigator.platform}</span>
          </div>
          
          <div className="flex justify-between p-3 bg-white rounded-md">
            <span className="text-sm font-medium text-gray-600">User Agent:</span>
            <span className="text-sm text-gray-500 font-mono">{navigator.userAgent.split(' ')[0]}</span>
          </div>
          
          <div className="flex justify-between p-3 bg-white rounded-md">
            <span className="text-sm font-medium text-gray-600">Screen Resolution:</span>
            <span className="text-sm text-gray-500 font-mono">{window.screen.width} × {window.screen.height}</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-2 border-red-200 bg-red-50 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Danger Zone</h3>
        <p className="text-sm text-gray-500 mb-4">These actions cannot be undone</p>
        
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border-2 border-red-300 rounded-lg text-red-700 text-sm font-semibold hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2">
            🗑️ Reset All Settings
          </button>
          
          <button className="px-5 py-2.5 bg-white border-2 border-red-300 rounded-lg text-red-700 text-sm font-semibold hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2">
            🔄 Clear App Data
          </button>
        </div>
      </div>
    </div>
  );
}