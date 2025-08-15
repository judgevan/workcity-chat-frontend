import React, { useState } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <>
          <Signup />
          <Login setUser={setUser} />
        </>
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
}
