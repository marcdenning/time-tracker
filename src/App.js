import './App.css';
import About from './About';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
        <div className="app-body">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <div>Main app page.</div>
            </Route>
          </Switch>
        </div>
        <footer className="app-footer">
          <button type="button" className="button-primary">Add</button>
        </footer>
      </div>
    </Router>
  );
}

export default App;
