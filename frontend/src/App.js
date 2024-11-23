import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Budget from './pages/Budget';
import Transactions from './pages/Transactions';

function App() {

  const { user } = useAuthContext()
  const theme = user?.theme || 'theme-parchment'

  return (
    <div className={`${theme} flex flex-col min-h-screen`}>
      <BrowserRouter>
        <Navbar />
        <div className='pages flex flex-col items-center flex-grow bg-light1 text-bodytext mt-14 lg:mt-12 h-full'>
          <Routes>
            <Route path='/' element={user ? <Dashboard /> : <Home />}/>
            <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />}/>
            <Route path='/settings' element={user ? <Settings /> : <Navigate to='/' />}/>
            <Route path='/budget' element={user ? <Budget /> : <Navigate to='/' />}/>
            <Route path='/transactions' element={user ? <Transactions /> : <Navigate to='/' />}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;