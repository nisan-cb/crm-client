import React from 'react';
import './App.css';
import AdminArea from './components/AdminArea/AdminArea';
import AppiontmentPage from './components/AppointmentPage/AppointmentPage';

function App() {


  return (
    <div className="App">
      react app
      {currentPage()}

    </div>
  );
}

function currentPage() {
  const path = window.location.pathname;
  switch (path) {
    case '/':
      return <AppiontmentPage></AppiontmentPage>
    case '/admin':
      return <AdminArea></AdminArea>
    default:
      break;
  }
}

export default App;
