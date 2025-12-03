import React from 'react';
import LoginEnfermeroPersonalizado from './LoginEnfermero';
import Dashboard from './dashboard/dashboard_main';
import { useState } from 'react';
import './index.css';
function App() {
  const [user, setUser] = useState(null);
  const handleSuccess = (userData) => {
    setUser(userData); 
    localStorage.setItem('user', JSON.stringify(userData));
  };
  if (user) {
    return <Dashboard user={user} />;
  }
  return (
    <div className="App">
        <LoginEnfermeroPersonalizado onLoginSuccess={handleSuccess}/>
      
    </div>
  );
}

export default App;