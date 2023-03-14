import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box } from 'components/Global.styled';
import { Logo, Wrap } from './Home.styled';
import logo from '../../images/logo.jpg';
import { ListComponent } from '../../components/List/List';
import { SearcBar } from '../../components/SearchBar/SearchBar';

export const Home = () => {
  const [filter, setFilter] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (!location.search) return;
    setFilter(decodeURIComponent(location.search.split('=')[1]));
  }, [location]);
  return (
    <Box>
      <Wrap>
        <Logo src={logo} alt="Logo" />
      </Wrap>
      <SearcBar />
      <ListComponent filter={filter} location={location} />
    </Box>
  );
};
