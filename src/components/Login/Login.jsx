import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Enviando os dados:" + username + " " + password);
    navigate("/selecionar-cliente");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Bem vindo de volta!</h1>
        <p>Faça login para continuar.</p>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre-me
          </label>
          <Link to="/esqueci-senha">Esqueceu a senha?</Link> 
        </div>

        <button>Entrar</button>

        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="#">Solicite uma proposta</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
