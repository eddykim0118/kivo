import React, { useState, useEffect } from 'react';
import { signUp, signIn, signOut } from '../auth';
import { requestLocationOwnership } from '../locationRequests';
import { supabase } from '../supabaseClient';

const SignUpAndRequestLocation: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  // Session persistence: check if user is already logged in
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUserId(data.user.id);
        setUserEmail(data.user.email ?? null);
      }
    };
    getSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        setUserEmail(session.user.email ?? null);
      } else {
        setUserId(null);
        setUserEmail(null);
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = async () => {
    const { data, error } = await signUp(email, password);
    if (error) {
      setMessage(`Sign up error: ${error.message}`);
    } else if (data?.user) {
      setUserId(data.user.id);
      setUserEmail(data.user.email ?? null);
      setMessage('Sign up successful! Now request location ownership.');
    } else {
      setMessage('Sign up error: No user returned.');
    }
  };

  const handleSignIn = async () => {
    const { data, error } = await signIn(email, password);
    if (error) {
      setMessage(`Login error: ${error.message}`);
    } else if (data?.user) {
      setUserId(data.user.id);
      setUserEmail(data.user.email ?? null);
      setMessage('Login successful!');
    } else {
      setMessage('Login error: No user returned.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUserId(null);
    setUserEmail(null);
    setMessage('Logged out.');
  };

  const handleRequestLocation = async () => {
    if (!userId) {
      setMessage('Sign up or log in first!');
      return;
    }
    const { data, error } = await requestLocationOwnership(location, userId);
    if (error) {
      setMessage(`Request error: ${error.message}`);
    } else {
      setMessage(`Requested ownership for location: ${data.location_name}`);
    }
  };

  // (Optional) Redirect to dashboard after login/signup
  // useEffect(() => {
  //   if (userId) {
  //     window.location.href = '/dashboard';
  //   }
  // }, [userId]);

  return (
    <div>
      {!userId ? (
        <>
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
          {isLogin ? (
            <button onClick={handleSignIn}>Login</button>
          ) : (
            <button onClick={handleSignUp}>Sign Up</button>
          )}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </>
      ) : (
        <>
          <div>
            <strong>Logged in as:</strong> {userEmail}
            <button onClick={handleSignOut} style={{ marginLeft: 8 }}>Logout</button>
          </div>
          <h2>Request Location Ownership</h2>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location Name" />
          <button onClick={handleRequestLocation}>Request Ownership</button>
        </>
      )}
      <div>{message}</div>
    </div>
  );
};

export default SignUpAndRequestLocation;