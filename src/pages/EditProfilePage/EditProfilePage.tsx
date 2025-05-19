import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useState } from 'react';
import { setUser } from '../../store/authSlice';
import Spinner from '../../components/Spinner/Spinner';
import { User } from '../../types/user';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<User | null>(user);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!formData) return;

    dispatch(setUser(formData));
    localStorage.setItem('user', JSON.stringify(formData));
    navigate('/profile');
  };

  if (!formData) return <Spinner />;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome" />
      <input
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        placeholder="Cognome"
      />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input
        name="residence"
        value={formData.residence}
        onChange={handleChange}
        placeholder="Residenza"
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProfilePage;
