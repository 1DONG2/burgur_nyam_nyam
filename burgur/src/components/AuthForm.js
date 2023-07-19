import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React from 'react';
import { useState } from 'react';

function AuthForm() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={onSubmit} className='container'>
        <input
          onChange={onChange}
          name='email'
          type='email'
          placeholder='Email'
          required
          value={email}
          className='authInput'
        />
        <input
          onChange={onChange}
          name='password'
          type='text'
          placeholder='Password'
          required
          value={password}
          className='authInput'
        />
        <input
          type='submit'
          value={newAccount ? 'Create Account' : 'Log In'}
          className='authInput authSubmit'
        />
        {error && <span className='authError'>{error}</span>}
      </form>

      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? 'Log In' : 'Create Account'}
      </span>
    </>
  );
}

export default AuthForm;
