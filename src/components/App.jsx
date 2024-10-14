import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { getPhotosBySearchValue } from '../services/unsplash-api';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import EmptyResultMessage from './EmptyResultMessage/EmptyResultMessage';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreButton from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';

import './App.module.css';

const App = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [images, setImages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleSearch = value => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      setImages(null);
      setIsError(false);
      setIsLoading(true);
      setCurrentPage(1);
      setModalData(null);
    }

    const getPhotos = async () => {
      try {
        if (!searchValue) {
          return;
        }

        const { results, total } = await getPhotosBySearchValue(searchValue);

        setImages(results);
        setTotalImages(total);
      } catch (error) {
        toast.error(error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos();
    setCurrentPage(prevPage => prevPage + 1);
  }, [searchValue]);

  const onLoadMore = async () => {
    setCurrentPage(prevPage => prevPage + 1);
    setIsLoading(true);

    try {
      const { results } = await getPhotosBySearchValue(
        searchValue,
        currentPage
      );
      setImages(prevState => [...prevState, ...results]);
    } catch (error) {
      toast.error(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollMore = () => {
    window.scrollBy({
      top: 338,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (currentPage > 2) scrollMore();
  }, [images, currentPage]);

  const onShowModal = e => {
    setIsShowModal(true);

    const filteredImage = images.filter(
      ({ urls: { small } }) => e.target.src === small
    );
    setModalData(filteredImage[0]);
  };

  const onCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ImageGallery images={images} onShowModal={onShowModal} />
      {isLoading && <Loader />}
      {images && images.length === 0 && <EmptyResultMessage />}
      {isError && <ErrorMessage />}
      {images !== null && images.length !== totalImages && (
        <LoadMoreButton onLoadMore={onLoadMore} />
      )}
      {modalData && (
        <ImageModal
          isOpen={isShowModal}
          closeModal={onCloseModal}
          modalData={modalData}
        />
      )}
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
