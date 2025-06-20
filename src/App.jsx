import './App.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import { EmpresasProvider } from './contexts/EmpresasContext'; 
;
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
    <EmpresasProvider>
      <Router>
        <AppWrapper />
      </Router>
    </EmpresasProvider>
  );
}

export default App;
