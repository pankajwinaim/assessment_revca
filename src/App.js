// src/App.js
import React from 'react';
import './App.css';
import IssuesList from './components/IssuesList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <IssuesList />
      </header>
    </div>
  );
}

export default App;