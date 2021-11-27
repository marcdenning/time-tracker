import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import About from './About';
import './App.css';
import StopwatchContainer from './StopwatchContainer';
import {getStopwatches} from './stopwatchStorage';
import {useEffect, useState} from 'react';

export default function App() {
  const [stopwatches, setStopwatches] = useState(getStopwatches());
  const interval = 100;

  // Restart in-progress stopwatches from previous session
  useEffect(() => {
    stopwatches.forEach(stopwatch => {
      if (!stopwatch.isPaused) {
        stopwatch.timeoutId = setInterval(tick, interval, stopwatch.id);
        setStopwatches(updateStopwatchState(stopwatch));
      }
    })
    // eslint-disable-next-line
  }, []);

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
              <StopwatchContainer interval={interval} stopwatches={stopwatches} setStopwatches={setStopwatches}
                                  tick={tick} updateStopwatchState={updateStopwatchState}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );

  function tick(stopwatchId) {
    setStopwatches((stopwatches) => {
      const stopwatch = stopwatches.find((s) => s.id === stopwatchId);
      const updatedStopwatch = {
        ...stopwatch,
        displayTime: stopwatch.elapsedTime + (new Date()).getTime() - stopwatch.startTime
      };

      return updateStopwatchState(updatedStopwatch)(stopwatches);
    });
  }

  function updateStopwatchState(updatedStopwatch) {
    return (stopwatches) => {
      return stopwatches.map((s) => {
        if (s.id === updatedStopwatch.id) {
          return updatedStopwatch;
        }
        return s;
      })
    };
  }
}
