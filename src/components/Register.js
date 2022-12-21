import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, register } from '../features/auth/authSlice';
import Loader from './Loader';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const { username, email, password, password2 } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (isError) {
      for (const error of message) {
        if (error.param === 'username') {
          document.getElementById('username-label').classList.remove('valid');
          document.getElementById('username-label').classList.add('invalid');
          document.getElementById('username').setCustomValidity(error.msg);
          document.getElementById('username-validation').textContent = document.getElementById('username').validationMessage;
          continue;
        }
        if (error.param === 'email') {
          document.getElementById('email-label').classList.remove('valid');
          document.getElementById('email-label').classList.add('invalid');
          document.getElementById('email').setCustomValidity(error.msg);
          document.getElementById('email-validation').textContent = document.getElementById('email').validationMessage;
          continue;
        }
        if (error.param === 'password') {
          document.getElementById('password-label').classList.remove('valid');
          document.getElementById('password').setCustomValidity(error.msg);
          continue;
        }
      }
      setForm(prevState => ({
        ...prevState,
        password: '',
        password2: '',
      }));
    }
    if (isSuccess || token) {
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

  const handleRegister = async e => {
    e.preventDefault();
    const body = { username, email, password };
    dispatch(register(body));
  };

  /* Validation */
  /* Todo: add service to check if username or email is in use */
  /* Todo: investigate a more elegent way to do this */
  useEffect(() => {
    const usernameLabel = document.getElementById('username-label');
    const usernameInput = document.getElementById('username');
    const taken = false;
    if (username.length > 20) {
      usernameInput.setCustomValidity('Username is too long');
      usernameLabel.classList.remove('valid');
      usernameLabel.classList.add('invalid');
    } else if (username.length < 1) {
      usernameInput.setCustomValidity('Username is required');
      usernameLabel.classList.remove('valid');
      usernameLabel.classList.remove('invalid');
    } else if (taken) {
      usernameInput.setCustomValidity('Username is already in use');
      usernameLabel.classList.remove('valid');
      usernameLabel.classList.add('invalid');
    } else {
      usernameInput.setCustomValidity('');
      usernameLabel.classList.remove('invalid');
      usernameLabel.classList.add('valid');
    }
    document.getElementById('username-validation').textContent = usernameInput.validationMessage;
  }, [username]);

  useEffect(() => {
    const emailLabel = document.getElementById('email-label');
    const emailInput = document.getElementById('email');
    const taken = false;
    if (emailInput.validity.typeMismatch) {
      emailLabel.classList.remove('valid');
      emailLabel.classList.add('invalid');
    } else if (email.length < 1) {
      emailLabel.classList.remove('valid');
      emailLabel.classList.remove('invalid');
    } else if (taken) {
      emailInput.setCustomValidity('Email is already in use');
      emailLabel.classList.remove('valid');
      emailLabel.classList.add('invalid');
    } else {
      emailInput.setCustomValidity('');
      emailLabel.classList.remove('invalid');
      emailLabel.classList.add('valid');
    }
    document.getElementById('email-validation').textContent = emailInput.validationMessage;
  }, [email]);

  useEffect(() => {
    const pwdLabel = document.getElementById('password-label');
    const pwdInput = document.getElementById('password');

    let length = !pwdInput.validity.tooShort;
    let upper = false;
    let lower = false;
    let number = false;
    let symbol = false;

    if (password.length >= 8) {
      document.getElementById('pw-length').classList.add('valid');
    } else {
      document.getElementById('pw-length').classList.remove('valid');
    }
    const symbolList = '!@#$%^&*()_+-=[]\\{}|;\':",./<>?`~';
    for (const c of password) {
      if (parseInt(c, 10)) {
        number = true;
        continue;
      }
      if (symbolList.includes(c)) {
        symbol = true;
        continue;
      }
      if (c === c.toLowerCase()) {
        lower = true;
        continue;
      }
      if (c === c.toUpperCase()) {
        upper = true;
        continue;
      }
    }
    if (lower) {
      document.getElementById('pw-lower').classList.add('valid');
    } else {
      document.getElementById('pw-lower').classList.remove('valid');
    }
    if (upper) {
      document.getElementById('pw-upper').classList.add('valid');
    } else {
      document.getElementById('pw-upper').classList.remove('valid');
    }
    if (number) {
      document.getElementById('pw-number').classList.add('valid');
    } else {
      document.getElementById('pw-number').classList.remove('valid');
    }
    if (symbol) {
      document.getElementById('pw-symbol').classList.add('valid');
    } else {
      document.getElementById('pw-symbol').classList.remove('valid');
    }

    if (length && upper && lower && number && symbol) {
      pwdLabel.classList.add('valid');
      pwdInput.setCustomValidity('');
    } else {
      pwdInput.setCustomValidity(
        `Password requires 
        ${!length ? 'at least 8 characters' : ''}
        ${!length && (!upper || !lower || !number || !symbol) ? ', ' : ''}
        ${!upper ? 'at least 1 uppercase letter' : ''}
        ${!upper && (!lower || !number || !symbol) ? ', ' : ''}
        ${!lower ? 'at least 1 lowercase letter' : ''}
        ${!lower && (!number || !symbol) ? ', ' : ''}
        ${!number ? 'at least 1 number' : ''}
        ${!number && !symbol ? ', ' : ''}
        ${!symbol ? 'at least 1 symbol' : ''}
        `
      );
      pwdLabel.classList.remove('valid');
    }
  }, [password]);

  useEffect(() => {
    const confirmLabel = document.getElementById('confirm-label');
    const confirmInput = document.getElementById('password2');
    if (password !== password2) {
      confirmInput.setCustomValidity('Passwords do not match');
      confirmLabel.classList.remove('valid');
    } else if (password.length > 0) {
      confirmInput.setCustomValidity('');
      confirmLabel.classList.add('valid');
    }
    document.getElementById('confirm-validation').textContent = confirmInput.validationMessage;
  }, [password, password2]);

  /* Rendering */

  if (isLoading) {
    return <Loader />
  }

  return (
    <main id='register'>
      <form id='register-form' onSubmit={(e) => handleRegister(e)}>
        <legend className='form-title'>Create Account</legend>
        <div className="form-group">
          <label id='username-label' htmlFor="username">Username</label>
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
          <div id='username-validation' className='validation-message'></div>
        </div>
        <div className='form-group'>
          <label id='email-label' htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type={'email'}
            placeholder=''
            required
            value={form.email}
            onChange={e => onChange(e)}
          />
          <div id='email-validation' className='validation-message'></div>
        </div>
        <div className="form-group">
          <label id='password-label' htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type={'password'}
            minLength='8'
            placeholder=''
            required
            value={form.password}
            onChange={e => onChange(e)}
          />
          <div id='pw-validation' className='validation-message'>
            <div id='pw-length' className='pw-check'>Length</div>
            <div id='pw-upper' className='pw-check'>Upper</div>
            <div id='pw-lower' className='pw-check'>Lower</div>
            <div id='pw-number' className='pw-check'>Number</div>
            <div id='pw-symbol' className='pw-check'>Symbol</div>
          </div>
        </div>
        <div className="form-group">
          <label id='confirm-label' htmlFor="password2">Confirm Password</label>
          <input
            name="password2"
            id="password2"
            type={'password'}
            placeholder=''
            required
            value={form.password2}
            onChange={e => onChange(e)}
          />
          <div id='confirm-validation' className='validation-message'></div>
        </div>
        <button type="submit" className='form-btn'>Register</button>
      </form>
    </main>
  );
}

export default Register;
