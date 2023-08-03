import { connect } from 'react-redux';
import React, { useEffect } from 'react'
import "./App.css"
import Login from './components/login';
import { BrowserRouter as Routes, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import { getUserAuth } from './action';
const App = (propes) => {
  useEffect(()=>{
    propes.getUserAuth();
  },[]);
  return (
    <div className='app'>
      <Routes>
      <Switch>
          <Route exact path='/' Component={Login}>
            <Login/>
          </Route>
          <Route path="/home">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </Routes>
    </div>
  )
}
// console.log(getUserAuth);
// console.log("hii");

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({
	getUserAuth: () => dispatch(getUserAuth()),
});


export default connect(mapStateToProps,mapDispatchToProps)(App)