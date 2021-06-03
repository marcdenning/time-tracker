import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import About from './About';
import './App.css';
import StopwatchContainer from './StopwatchContainer';
import {useState} from 'react';

export default function App() {
  const [stopwatches, setStopwatches] = useState([{
    id: 0,
    startTime: 0,
    elapsedTime: 0,
    displayTime: 0,
    label: 'Stopwatch',
    isPaused: true,
    isSelected: false,
    timeoutId: null
  }]);
  const interval = 100

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
              <StopwatchContainer interval={interval} stopwatches={stopwatches} setStopwatches={setStopwatches} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
