import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/schedule';
import Settings from './pages/settings';

// Sidebar navigation items
const navItems = [
  {
    path: '/',
    label: 'Display',
    icon: '🖥️',
  },
  {
    path: '/schedule',
    label: 'Schedule',
    icon: '⏰',
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: '⚙️',
  },
];

// Sidebar Component
function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.electronAPI?.onNavigate?.((path: string) => {
      navigate(path);
    });
  }, [navigate]);

  return (
    <div className="w-64 bg-gradient-to-b from-cyan-600 to-cyan-700 flex flex-col text-white shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-4xl">👀</span>
          <span className="text-2xl font-semibold tracking-wide">EyeCare</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-4 px-6 py-4 transition-all duration-200
              border-l-4 ${
                location.pathname === item.path
                  ? 'bg-white/15 text-white border-white font-medium'
                  : 'border-transparent text-white/85 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            <span className="text-xl w-6 flex items-center justify-center">{item.icon}</span>
            <span className="text-base">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-5 border-t border-white/10">
        <button
          onClick={() => window.electronAPI?.toggleFilter(true)}
          className="w-full py-3.5 bg-white/20 border-2 border-white/30 rounded-lg text-white text-base font-semibold flex items-center justify-center gap-2 hover:bg-white/30 hover:border-white/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="text-lg">✨</span>
          <span>Activate</span>
        </button>
      </div>
    </div>
  );
}

// Main Router Component
export default function Router() {
  return (
    <HashRouter>
      <div className="flex h-screen w-full overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
