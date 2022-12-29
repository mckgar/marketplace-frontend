import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, createItem } from '../features/item/itemSlice';
import Loader from './Loader';
import './styles/ItemForm.css';

const ItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username } = useSelector(state => state.auth);
  const { response, isLoading, isError, isSuccess, message } = useSelector(state => state.item);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: 'null'
  });
  const { name, description, price, quantity, category } = form;

  useEffect(() => {
    if (isError) {
      for (const error of message) {
        if (error.param === 'name') {
          document.getElementById('name-label').classList.remove('valid');
          document.getElementById('name-label').classList.add('invalid');
          document.getElementById('name').setCustomValidity(error.msg);
          document.getElementById('name-validation').textContent = document.getElementById('name').validationMessage;
          continue;
        }
        if (error.param === 'description') {
          document.getElementById('description-label').classList.remove('valid');
          document.getElementById('description-label').classList.add('invalid');
          document.getElementById('description').setCustomValidity(error.msg);
          document.getElementById('description-validation').textContent = document.getElementById('description').validationMessage;
          continue;
        }
        if (error.param === 'price') {
          document.getElementById('price-label').classList.remove('valid');
          document.getElementById('price-label').classList.add('invalid');
          document.getElementById('price').setCustomValidity(error.msg);
          document.getElementById('price-validation').textContent = document.getElementById('price').validationMessage;
          continue;
        }
        if (error.param === 'quantity') {
          document.getElementById('quantity-label').classList.remove('valid');
          document.getElementById('quantity-label').classList.add('invalid');
          document.getElementById('quantity').setCustomValidity(error.msg);
          document.getElementById('quantity-validation').textContent = document.getElementById('quantity').validationMessage;
          continue;
        }
        if (error.param === 'category') {
          document.getElementById('category-label').classList.remove('valid');
          document.getElementById('category-label').classList.add('invalid');
          document.getElementById('category').setCustomValidity(error.msg);
          document.getElementById('category-validation').textContent = document.getElementById('category').validationMessage;
          continue;
        }
      }
      setForm(prevState => ({
        ...prevState
      }));
      document.getElementById('item-form').classList.add('error');
    }
    if (isSuccess || response) {
      navigate(`/account/${username}`);
    }
    dispatch(reset());
  }, [response, isError, isSuccess, message, dispatch, navigate, username])

  const onChange = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handlePost = e => {
    e.preventDefault();
    const body = { name, description, price, quantity, category };
    dispatch(createItem(body));
  };

  /* Check if logged in once on page load */

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [navigate, username]);

  /* Validation */

  useEffect(() => {
    const label = document.getElementById('name-label');
    const input = document.getElementById('name');
    if (name.length > 255) {
      input.setCustomValidity('Name is too long');
      label.classList.remove('valid');
      label.classList.add('invalid');
    } else if (name.length < 1) {
      input.setCustomValidity('Name is required');
      label.classList.remove('valid');
      label.classList.remove('invalid');
    } else {
      input.setCustomValidity('');
      label.classList.add('valid');
      label.classList.remove('invalid');
    }
    document.getElementById('name-validation').textContent = input.validationMessage;
  }, [name]);

  useEffect(() => {
    const label = document.getElementById('description-label');
    const input = document.getElementById('description');
    if (description.length > 1024) {
      input.setCustomValidity('Description is too long');
      label.classList.remove('valid');
      label.classList.add('invalid');
    } else {
      input.setCustomValidity('');
      label.classList.add('valid');
      label.classList.remove('invalid');
    }
    document.getElementById('description-validation').textContent = input.validationMessage;
  }, [description]);

  useEffect(() => {
    const label = document.getElementById('price-label');
    const input = document.getElementById('price');
    if (price === '') {
      input.setCustomValidity('');
      label.classList.remove('valid');
      label.classList.remove('invalid');
    } else if (price < 0) {
      input.setCustomValidity('Price cannot be negative');
      label.classList.remove('valid');
      label.classList.add('invalid');
    } else {
      input.setCustomValidity('');
      label.classList.add('valid');
      label.classList.remove('invalid');
    }
    document.getElementById('price-validation').textContent = input.validationMessage;
  }, [price]);

  useEffect(() => {
    const label = document.getElementById('quantity-label');
    const input = document.getElementById('quantity');
    if (quantity === '') {
      input.setCustomValidity('');
      label.classList.remove('valid');
      label.classList.remove('invalid');
    } else if (quantity < 1) {
      input.setCustomValidity('Must have an item to sell');
      label.classList.remove('valid');
      label.classList.add('invalid');
    } else {
      input.setCustomValidity('');
      label.classList.add('valid');
      label.classList.remove('invalid');
    }
  }, [quantity]);

  useEffect(() => {
    const label = document.getElementById('category-label');
    if (category !== 'null') {
      label.classList.add('valid');
    } else {
      label.classList.remove('valid');
    }
  }, [category]);

  /* Rendering */

  if (isLoading) {
    return (
      <main id='post-item'>
        <Loader />
      </main>
    );
  }

  return (
    <main id='post-item'>
      <form id='item-form' onSubmit={e => handlePost(e)}>
        <legend className='form-title'>Post Item</legend>
        <div className='form-group'>
          <label id='name-label' htmlFor='name'>Name *</label>
          <input
            name='name'
            id='name'
            type={'text'}
            placeholder=''
            minLength={1}
            maxLength={255}
            required
            value={form.usename}
            onChange={e => onChange(e)}
          />
          <div id='name-validation' className='validation-message'></div>
        </div>
        <div className='form-group'>
          <label id='description-label' className='valid' htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            placeholder=''
            minLength={1}
            maxLength={1024}
            value={form.description}
            onChange={e => onChange(e)}
          ></textarea>
          <div id='description-validation' className='validation-message'></div>
        </div>
        <div className='form-group'>
          <label id='price-label' htmlFor='price'>Price *</label>
          <input
            name='price'
            id='price'
            type={'number'}
            placeholder=''
            min={0}
            required
            value={form.price}
            onChange={e => onChange(e)}
          />
          <div id='price-validation' className='validation-message'></div>
        </div>
        <div className='form-group'>
          <label id='quantity-label' htmlFor='quantity'>Quantity *</label>
          <input
            name='quantity'
            id='quantity'
            type={'number'}
            placeholder=''
            min={1}
            step={1}
            required
            value={form.quantity}
            onChange={e => onChange(e)}
          />
          <div id='quantity-validation' className='validation-message'></div>
        </div>
        <div className='form-group'>
          <label id='category-label' htmlFor='category'>Category *</label>
          <select
            name='category'
            id='category'
            placeholder='Select Category'
            value={form.category}
            onChange={e => onChange(e)}
          >
            <option value='null'>Select Category</option>
            <option value='accessories'>Accessories</option>
            <option value='books'>Books</option>
            <option value='clothing'>Clothing</option>
            <option value='decorations'>Decorations</option>
            <option value='games'>Games</option>
            <option value='office'>Office</option>
            <option value='toys'>Toys</option>
          </select>
          <div id='category-validation' className='validation-message'></div>
        </div>
        <button type="submit" className='form-btn'>Register</button>
      </form>
    </main>
  );
};

export default ItemForm;
