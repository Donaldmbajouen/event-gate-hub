
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Calendar, Users, QrCode } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const menuItems = {
    organisateur: [
      { icon: Calendar, label: 'Mes Événements', path: '/organisateur/events' },
      { icon: QrCode, label: 'Scanner QR', path: '/organisateur/scanner' },
    ],
    participant: [
      { icon: Calendar, label: 'Événements', path: '/participant/events' },
      { icon: QrCode, label: 'Mes Billets', path: '/participant/tickets' },
    ],
    administrateur: [
      { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
      { icon: Calendar, label: 'Tous les Événements', path: '/admin/events' },
    ]
  };

  const currentMenuItems = menuItems[user.role] || [];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-ticket-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🎫</span>
          </div>
          <div>
            <h2 className="font-bold text-lg bg-ticket-gradient bg-clip-text text-transparent">
              EventGate
            </h2>
            <p className="text-sm text-gray-600 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {currentMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="mb-4">
          <p className="font-medium">{user.nom}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <Button variant="outline" onClick={logout} className="w-full">
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
