import { useEffect, useState } from 'react';
import { getPhotosBySearchValue } from '../../services/unsplash-api';
import toast, { Toaster } from 'react-hot-toast';

import ImageCard from '../ImageCard/ImageCard';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EmptyResultMessage from '../EmptyResultMessage/EmptyResultMessage';
import LoadMoreButton from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

import css from './ImageGallery.module.css';

const ImageGallery = ({ searchValue }) => {
  const [images, setImages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

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
      {isLoading && <Loader />}
      {images && images.length !== 0 && (
        <ul className={css.list}>
          {images.map(photo => {
            return (
              <li key={photo.id} className={css.listItem}>
                <ImageCard {...photo} showModal={onShowModal} />
              </li>
            );
          })}
        </ul>
      )}
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

export default ImageGallery;
