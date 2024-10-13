import css from './LoadMoreBtn.module.css';

const LoadMoreButton = ({ onLoadMore }) => {
  return (
    <div className={css.buttonContainer}>
      <button type="button" className={css.loadMoreBtn} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreButton;
