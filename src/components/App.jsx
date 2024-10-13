import { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.module.css';

const App = () => {
  const [searchValue, setSearchValue] = useState(null);

  const handleSearch = value => {
    setSearchValue(value);
  };
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ImageGallery searchValue={searchValue} />
    </>
  );
};

export default App;
