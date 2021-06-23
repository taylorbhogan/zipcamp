import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WelcomeMessage from './components/WelcomeMessage';
import SpotsList from './components/SpotsList'
import SpotIdPage from './components/SpotIdPage'
import AreasList from './components/AreasList';
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='appContainer'>
      <div className='pageContainer'>
      <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path='/'>
                <WelcomeMessage />
            </Route>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
            <Route exact path='/spots'>
              <SpotsList />
            </Route>
            <Route path='/spots/:spotId'>
              <SpotIdPage />
            </Route>
            <Route path='/areas'>
              <AreasList />
            </Route>
          </Switch>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
