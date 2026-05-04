import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import UnauthorizedPage from './pages/UnauthorizedPage'


function App() {
 

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route 
      path="/admin"
      element={
        <PrivateRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </PrivateRoute>
      }
      />

      <Route 
      path="/user"
      element={<PrivateRoute allowedRoles={["user"]}>
        <UserDashboard />
      </PrivateRoute>}
      />

<Route path="/unauthorized"  element={<UnauthorizedPage />}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
