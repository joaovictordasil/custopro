import './App.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes';

function AppWrapper() {
  const location = useLocation();

  const estiloPorRota = {
    '/': 'background-login',
    '/esqueci-senha': 'background-forgot',
    '/selecionar-cliente': 'background-selecionar',
  };

  const backgroundClass = estiloPorRota[location.pathname] || '';
  const isTelaComEstilo = !!backgroundClass;

  return (
    <div className={isTelaComEstilo ? `App ${backgroundClass}` : 'App'}>
      <AppRoutes />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
