import React from 'react';
import { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState(0);
  return (
    <div>
      Login{user}
      <button
        onClick={() => {
          setUser(user + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};

export default Login;
