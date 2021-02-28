import './App.css';

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-title">
          <h1>Time Tracker</h1>
        </div>
        <nav className="app-header-nav">
          <a href="#" className="app-header-toggle">About</a>
        </nav>
      </header>
      <div className="app-body">
        Main app area.
      </div>
      <footer className="app-footer">
        <button type="button" className="button-primary">Add</button>
      </footer>
    </div>
  );
}

export default App;
