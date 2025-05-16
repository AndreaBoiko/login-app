import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { clearTokens } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './ProtectedPage.module.scss';

interface UserData {
  name: string;
  email: string;
  surname: string;
}

const ProtectedPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearTokens());
    navigate('/');
  };

  useEffect(() => {
    axios
      .get('https://run.mocky.io/v3/20ec8886-ab6e-4141-b8ff-a05d93b0d44e')
      .then((res) => setUser(res.data))
      .catch(() => logout());
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Protected Page</h2>
      {user ? (
        <div className={styles.cardsContainer}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.img}>
                <img src="/images/dottore.jpeg" alt="doctor" />
              </div>
              <p>
                Dott. {user.name} {user.surname}
              </p>
              <p>Medico di medicina generale</p>
              <span></span>
              <p>Email: {user.email}</p>
              <p>
                Indirizzo: Via Livigno, 2<br />
                20158 Milano
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
