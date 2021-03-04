import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import About from './About';
import './App.css';
import StopwatchContainer from './StopwatchContainer';

function App() {
  return (
    <Router>
      <div className="app-root">
        <header className="app-header">
          <div className="app-header-title">
            <Link to="/"><h1>Time Tracker</h1></Link>
          </div>
          <nav className="app-header-nav">
            <Link to="/about" className="app-header-toggle">About</Link>
          </nav>
        </header>
        <div className="app-wrapper">
          <Switch>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/">
              <StopwatchContainer />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
