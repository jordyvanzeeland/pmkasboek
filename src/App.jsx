import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './views/Login.jsx';
import Kasboek from './views/Kasboek.jsx';
import UserBooks from './views/UserBooks.jsx';
import Register from './views/Register.jsx';
import Customers from './views/admin/Customers.jsx';
import CustomerBooks from './views/admin/CustomerBooks.jsx';
import CustomerKasboek from './views/admin/CustomerKasboek.jsx';


function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<UserBooks />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/kasboek" element={<Kasboek />} />
          <Route exact path="/kasboek/:bookid" element={<Kasboek />} />

          <Route exact path="/admin" element={<Customers />} />
          <Route exact path="/admin/customer/:customerid" element={<CustomerBooks />} />
          <Route exact path="/admin/customer/:customerid/book/:bookid" element={<CustomerKasboek />} />
      </Routes>
    </Router>
  )
}

export default App