import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import Spinner from '../../components/Spinner/Spinner';
import { Doctor } from '../../types/doctor';
import Filter from '../../components/Filter/Filter';
import { useFilter } from '../../hooks/useFilter';

const HomePage = () => {
  const [doctors, setDoctors] = useState<Doctor[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {sortedList, updateFilter} = useFilter(doctors, searchTerm);

  async function getDoctors() {
    try {
      const response = await fetch('/api/doctor.json');
      const data = await response.json();

      if (data) {
        setDoctors(data);
      }
    } catch (error) {
      console.error('Error to load list of doctors');
    }
  }

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Trova il tuo medico</h2>
      <Filter setSearchTerm={setSearchTerm} updateFilter={updateFilter}/>
      <div className={styles.cardsContainer}>
        {doctors ? (
          sortedList.map((el) => (
            <div key={el.id} className={styles.card}>
              <div className={styles.image}>
                <img src={el.photo} alt="doctor" />
              </div>
              <p>
                Dott. {el.name} {el.surname}
              </p>
              <p>{el.specialization}</p>
              <span></span>
              <p>
                Email: <br />
                {el.email}
              </p>
              <p>
                Indirizzo: {el.address}
                <br />
                {el.postCode} {el.city}
              </p>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default HomePage;
