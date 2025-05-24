import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './views/Login.jsx';
import Kasboek from './views/Kasboek.jsx';
import UserBooks from './views/UserBooks.jsx';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={localStorage.getItem('token') ? <UserBooks /> : <Login />} />
          <Route exact path="/kasboek" element={<Kasboek />} />
          <Route exact path="/kasboek/:bookid" element={<Kasboek />} />
      </Routes>
    </Router>
  )
}

export default App