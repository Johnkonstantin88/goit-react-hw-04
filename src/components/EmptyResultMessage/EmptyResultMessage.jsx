import css from './EmptyResultMessage.module.css';

const EmptyResultMessage = () => {
  return (
    <div className={css.container}>
      <img
        className={css.img}
        src="https://cdn-icons-png.flaticon.com/512/7466/7466140.png"
        alt="empty search image"
      />
      <p className={css.text}>
        Sorry, there are no images matching your search query. Please try again.
      </p>
    </div>
  );
};

export default EmptyResultMessage;
