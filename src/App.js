import './App.css';
// import { HashRouter as Router, Route } from 'react-router-dom' --> while connection Django to react
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PrivateRoute component={HomePage} path="/" exact/>
          <Route component={LoginPage} path="/login"/>
          <Route component={SignupPage} path="/signup"/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;