import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './views/Login.jsx';
import Kasboek from './views/Kasboek.jsx';
import UserBooks from './views/UserBooks.jsx';
import Register from './views/Register.jsx';


function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<UserBooks />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/kasboek" element={<Kasboek />} />
          <Route exact path="/kasboek/:bookid" element={<Kasboek />} />
      </Routes>
    </Router>
  )
}

export default App