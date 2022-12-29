import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, login } from '../features/auth/authSlice';
import Loader from "./Loader";
import './styles/Login.css';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const { username, password } = form;
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (isError) {
      setErrorMessage(message);
    } else if (isSuccess || token) {
      navigate('/');
    }
    dispatch(reset());
  }, [token, isError, isSuccess, message, dispatch, navigate]);

  const onChange = e => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    const body = { username, password };
    dispatch(login(body));
  };

  if (isLoading) {
    return (
      <main id='login'>
        <Loader />
      </main>
    );
  }

  return (
    <main id='login'>
      <form id='login-form' className={errorMessage ? 'error' : ''} onSubmit={(e) => handleLogin(e)}>
        <legend className="form-title">Login</legend>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            type={'text'}
            placeholder=''
            minLength='1'
            maxLength='20'
            required
            value={form.username}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type={'password'}
            placeholder=''
            required
            value={form.password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="error-message">{errorMessage}</div>
        <button type="submit" className='form-btn'>Log in</button>
      </form>
    </main>
  );
}

export default Login;
