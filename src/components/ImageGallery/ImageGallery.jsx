import ImageCard from '../ImageCard/ImageCard';

import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onShowModal }) => {
  return (
    <>
      {images && images.length !== 0 && (
        <ul className={css.list}>
          {images.map(photo => {
            return (
              <li key={photo.id} className={css.listItem}>
                <ImageCard {...photo} onShowModal={onShowModal} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ImageGallery;
