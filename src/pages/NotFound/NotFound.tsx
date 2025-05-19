import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
      <p>Page not found</p>
      <button><Link to="/home">Back to home page</Link></button>
    </div>
  );
};

export default NotFound;