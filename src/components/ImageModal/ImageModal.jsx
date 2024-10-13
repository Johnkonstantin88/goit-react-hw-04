import ReactModal from 'react-modal';
import css from './ImageModal.module.css';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90vh',
    height: 'auto',
    objectFit: 'cover',
  },
};

const afterOpen = () => document.body.classList.toggle(css.overflowNormalize);

const afterClose = () => {
  document.body.classList.remove(css.ReactModal__Body),
    document.body.classList.add(css.overflowNormalize);
};

const ImageModal = ({ isOpen, closeModal, modalData }) => {
  const {
    urls: { regular },
    description,
    alt_description,
  } = modalData;

  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      onAfterOpen={afterOpen}
      onAfterClose={afterClose}
      bodyOpenClassName={css.ReactModal__Body}
      // htmlOpenClassName={css.ReactModal__Html}
    >
      <div>
        <img src={regular} alt={alt_description} />
        <p>
          {description ||
            `${alt_description.replace(
              alt_description[0],
              alt_description[0].toUpperCase()
            )}.`}
        </p>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
