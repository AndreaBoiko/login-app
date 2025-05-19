import { useSearchParams } from 'react-router-dom';
import { Doctor } from '../types/doctor';

export const useFilter = (doctors: Doctor[] | null, searchTerm: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (filter: string) => {
    if (filter) {
      searchParams.set('filter', filter);
    } else if (filter === '') {
      searchParams.delete('filter');
    }

    setSearchParams(searchParams);
  };

  const filter = searchParams.get('filter');
  const term = searchTerm.toLowerCase();

  const sortedList =
    doctors?.filter((doctor) => {
      if (!term) return true;

      if (filter === 'name') {
        return `${doctor.name} ${doctor.surname}`.toLowerCase().includes(term);
      }

      if (filter === 'specialization') {
        return doctor.specialization.toLowerCase().includes(term);
      }

      if (filter === 'city') {
        return doctor.city.toLowerCase().includes(term);
      }

      return (
        `${doctor.name} ${doctor.surname}`.toLowerCase().includes(term) ||
        doctor.specialization.toLowerCase().includes(term) ||
        doctor.city.toLowerCase().includes(term)
      );
    }) ?? [];

  return {
    sortedList,
    updateFilter,
  };
};
