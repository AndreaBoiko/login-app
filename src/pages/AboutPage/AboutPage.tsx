import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { clearTokens } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './AboutPage.module.scss';
import Spinner from '../../components/Spinner/Spinner';

interface UserData {
  name: string;
  email: string;
  surname: string;
}

const AboutPage = () => {
  const [data, setData] = useState<UserData | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearTokens());
    navigate('/');
  };

  useEffect(() => {
    axios
      .get('https://run.mocky.io/v3/20ec8886-ab6e-4141-b8ff-a05d93b0d44e')
      .then((res) => setData(res.data))
      .catch(() => logout());
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Data from server</h2>
      {data ? (
        <div>
            <h3>{data.name} {data.surname}</h3>
            <p>{data.email}</p>
        </div>
      ) : (<Spinner/>)}
    </div>
  );
};

export default AboutPage;