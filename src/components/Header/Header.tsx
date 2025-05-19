import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useDispatch } from 'react-redux';
import { clearTokens } from '../../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearTokens());
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.link_active}` : styles.link
                }
                to="/home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.link_active}` : styles.link
                }
                to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.link_active}` : styles.link
                }
                to="/about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <button className={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
