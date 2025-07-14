import './App.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import { EmpresasProvider } from './contexts/EmpresasContext'; 
import { GruposProvider } from './contexts/GruposCentroCustoContext'; 
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import LoadingOverlay from './components/LoadingOverlay';
import { SubgruposProvider } from './contexts/SubgruposContext';


function AppWrapper() {
  const location = useLocation();
  const { loading } = useLoading();

  const estiloPorRota = {
    '/': 'background-login',
    '/esqueci-senha': 'background-forgot',
    '/selecionar-cliente': 'background-selecionar',
  };

  const backgroundClass = estiloPorRota[location.pathname] || '';
  const isTelaComEstilo = !!backgroundClass;

  return (
    <div className={isTelaComEstilo ? `App ${backgroundClass}` : 'App'}>
      {loading && <LoadingOverlay />}
      <AppRoutes />
    </div>
  );
}

function App() {
  return (
  <EmpresasProvider>
      <GruposProvider>
        <SubgruposProvider> {/* <-- ENVOLVE AQUI */}
          <LoadingProvider>
            <Router>
              <AppWrapper />
            </Router>
          </LoadingProvider>
        </SubgruposProvider>
      </GruposProvider>
    </EmpresasProvider>
  );
}

export default App;
