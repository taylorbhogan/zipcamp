import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SpotsList from './components/SpotsList'
import MySpotsList from './components/MySpotsList'
import SpotIdPage from './components/SpotIdPage'
import AreasList from './components/AreasList';
import UserPage from './components/UserPage';
import ScrollToTop from './components/ScrollToTop';
import './index.css'
import Splash from './components/Splash/Splash';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className='pageContainer'>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <ScrollToTop>
            <Switch>
              <Route exact path='/'>
                <Splash />
              </Route>
              <Route path='/signup'>
                <SignupForm />
              </Route>
              <Route exact path={'/spots'}>
                <SpotsList />
              </Route>
              <Route exact path={'/my-spots'}>
                <MySpotsList />
              </Route>
              <Route path='/spots/:spotId'>
                <SpotIdPage />
              </Route>
              <Route path='/areas'>
                <AreasList />
              </Route>
              <Route path='/users'>
                <UserPage />
              </Route>
            </Switch>
          </ScrollToTop>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
