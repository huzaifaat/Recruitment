'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Users, Settings, PieChart } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: PieChart },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];
  
  return (
    <aside 
      className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 pt-16 h-full transition-width duration-300 
                 ${collapsed ? 'w-16' : 'w-64'} bg-gray-800 border-r border-gray-200`}
    >
      <div className="flex flex-col flex-1 min-h-0 pt-5">
        <div className="flex-1 px-3 space-y-1 bg-gray-800 divide-y divide-gray-700">
          <ul className="space-y-2 pb-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 text-base rounded-lg group transition-colors
                             ${isActive 
                               ? 'bg-gray-900 text-white' 
                               : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    <Icon size={20} className={isActive ? 'text-indigo-400' : 'text-gray-400'} />
                    {!collapsed && (
                      <span className="ml-3 transition-opacity">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      
      <div className="p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center p-2 text-base text-gray-400 rounded-lg hover:bg-gray-700 group"
        >
          <svg 
            className={`w-6 h-6 transition-transform ${collapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span className="ml-3">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}