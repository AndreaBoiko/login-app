import { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Spinner from '../../components/Spinner/Spinner';
import styles from './UserPage.module.scss';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const userFromStore = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (userFromStore) {
      setUser(userFromStore);
    }
  }, [userFromStore]);

  return (
    <div className={styles.wrapper}>
      <h2>Profile</h2>
      <div className={styles.content}>
        {user ? (
          <div className={styles.card}>
            <div className={styles.image}>
              <img src={user.photo} alt="profile photo" />
            </div>
            <div className={styles.info}>
              <h3>
                {user.name} {user.surname}
              </h3>
              <div>
                Nato il <span>{user.birthDate}</span>
              </div>
              <div>
                Email: <span>{user.email}</span>
              </div>
              <div>
                Residenza: <span>{user.residence}</span>
              </div>
              <div>
                Dottore: <span>{user.doctor}</span>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
        <div className={styles.modify}>
          <button>
            <Link to="/edit-profile">
              <img src="images/edit-button.png" alt="modify" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
