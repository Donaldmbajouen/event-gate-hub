
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      switch (user.role) {
        case 'organisateur':
          navigate('/organisateur/events');
          break;
        case 'participant':
          navigate('/participant/events');
          break;
        case 'administrateur':
          navigate('/admin/users');
          break;
        default:
          navigate('/');
      }
    }
  }, [user, navigate]);

  return (
    <div className="p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirection...</h1>
        <p className="text-gray-600">Vous êtes redirigé vers votre dashboard...</p>
      </div>
    </div>
  );
};

export default Dashboard;
