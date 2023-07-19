import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      <div
        style={{
          maxWidth: 890,
          width: 'fit-content',
          margin: '0 auto',
          marginTop: 80,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path='/' element={<Home userObj={userObj} />}></Route>
              <Route
                path='/profile'
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }></Route>
            </>
          ) : (
            <>
              <Route path='/' element={<Auth />}></Route>
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
