import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WelcomeMessage from './components/WelcomeMessage';
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='appContainer'>
      <div className='navbarContainer'>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
            {/* <Route path='/spots'>

            </Route>
            <Route path='/goofy'>

            </Route> */}
          </Switch>
        )}
        <div className={'contentWrapper'}>
          <div className={'contentContainer'}>
            <WelcomeMessage />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
