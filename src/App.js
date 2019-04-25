import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Fetch from './Fetch'

class App extends Component {
  render() {
    return (   
      <Router>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
      {/* <Fetch /> */}
    </Router> 
      
      
    )
  }
}
function Home() {
  return <h2>Inicio</h2>;
}

function About() {
  return <h2>Acerca de</h2>;
}

function Topic({ match }) {
  
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Componentes</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Inicio</Link>
      </li>
      <li>
        <Link to="/about">Acerca de</Link>
      </li>
      <li>
        <Link to="/topics">Topicos</Link>
      </li>
    </ul>
  );
}


export default App;
