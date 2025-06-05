import "./ForgotPassword.css"; 

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Link de recuperação enviado para seu e-mail!");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Recuperar Senha</h1>
        <p>Informe seu e-mail para receber um link de redefinição de senha.</p>
        <div className="input-field">
          <input type="email" placeholder="Seu e-mail" required />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
