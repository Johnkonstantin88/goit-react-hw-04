import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={css.container}>
      <img
        className={css.img}
        src="https://cdn-icons-png.flaticon.com/512/2582/2582150.png"
        alt="error image"
      />
      <p className={css.text}>
        Just look! Again these playful demons are plotting their vile
        machinations!
      </p>
    </div>
  );
};

export default ErrorMessage;
