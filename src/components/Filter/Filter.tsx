import React, { useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  updateFilter: (value: string) => void;
  setSearchTerm: (value: string) => void;
};

const Filter: React.FC<Props> = ({ updateFilter, setSearchTerm }) => {
  const [text, setText] = useState<string>('');
  const [searchParams] = useSearchParams();
  const category = searchParams.get('filter') || '';

  useEffect(() => {
    setSearchTerm(text);
  }, [text, setSearchTerm]);

  return (
    <div className={styles.container}>
    <h4>Filtra per:</h4>
      <div className={styles.filter}>
        <select
          className={styles.option1}
          value={category}
          onChange={(e) => updateFilter(e.target.value)}>
          <option value="">Tutti</option>
          <option value="name">Nome</option>
          <option value="specialization">Specializzazione</option>
          <option value="city">Citta</option>
        </select>
        <input type="text" value={text} onChange={(e) => {setText(e.target.value)}}/>
      </div>
    </div>
  );
};

export default Filter;
