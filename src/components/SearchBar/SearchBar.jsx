import { useState } from 'react';
import toast from 'react-hot-toast';

import css from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value === '') {
      toast.error('Search field is empty. Please, enter your query.');
      return;
    }

    onSearch(value);
    setValue('');
  };

  return (
    <>
      <header className={css.header}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button className={css.button} type="submit">
            <span className={css.buttonSpan}>Search</span>
          </button>
          <input
            className={css.input}
            type="text"
            name="searchText"
            aria-hidden="false"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    </>
  );
};

export default SearchBar;
