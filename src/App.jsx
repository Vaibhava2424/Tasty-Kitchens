import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import DetailedView from './components/DetailedView'
import SignupForm from './components/SignupForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        
        {/* All application routes are now at the top level */}
        <Route path="/" element={<Home />} />
        <Route path="/detailed-view/:id" element={<DetailedView />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Fallback route for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App