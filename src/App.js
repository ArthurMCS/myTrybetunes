import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Route
          exact
          path="/"
          render={ (propsRouter) => <Login { ...propsRouter } /> }
        />
        <Route
          path="/search"
          render={ (propsRouter) => (
            <>
              <Header />
              <Search { ...propsRouter } />
            </>
          ) }
        />
        <Route
          path="/album/:id"
          render={ (propsRouter) => (
            <>
              <Header />
              <Album { ...propsRouter } />
            </>
          ) }
        />
        <Route
          path="/favorites"
          render={ () => (
            <>
              <Header />
              <Favorites />
            </>
          ) }
        />
        <Route
          exact
          path="/profile"
          render={ (propsRouter) => (
            <>
              <Header />
              <Profile { ...propsRouter } />
            </>) }
        />
        <Route
          exact
          path="/profile/edit"
          render={ (propsRouter) => (
            <>
              <Header />
              <ProfileEdit { ...propsRouter } />
            </>) }
        />
        <Route
          path="*"
          render={ () => <NotFound /> }
        />
      </HashRouter>
    );
  }
}

export default App;
