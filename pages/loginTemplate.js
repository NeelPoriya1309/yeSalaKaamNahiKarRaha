import Link from 'next/link';
import { useState, useEffect } from 'react';

function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    setLoggedIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.status !== 'success') {
      //some error occured
      console.log(data.error);
      return;
    }

    localStorage.setItem('token', data.token);
    setLoggedIn(true);
    console.log('Logged in successfully!');
  };
  const logoutHandler = async (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setLoggedIn(false);
    console.log('Logged out successfully!');
  };

  return (
    <>
      <div>LOGIN PAGE</div>
      <p></p>
      <p></p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
      </form>
      {loggedIn && <button onClick={logoutHandler}>Logout</button>}
      <Link href="/videos"> Videos </Link>
    </>
  );
}

export default login;
