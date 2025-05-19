import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.container} />
    </div>
  );
};

export default Spinner;