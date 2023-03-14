import axios from 'axios';
import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

import {
  Item,
  List,
  ItemImage,
  ItemSpecies,
  ItemName,
  InfoWrap,
  ListLink,
  Wrap,
} from './List.styled';

export const ListComponent = ({ filter, location }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://rickandmortyapi.com/api/character/?name=${filter}`
        );
        setData(result.data.results);
      } catch (error) {
        Notify.failure('No results found');
      }
    };
    fetchData();
  }, [filter]);
  return (
    <>
      {data.length > 0 && (
        <List>
          {data
            .sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            })
            .map(item => {
              return (
                <Item key={item.id}>
                  <ListLink
                    to={`details/${item.id}`}
                    state={{ from: location }}
                  >
                    <Wrap>
                      <ItemImage src={item.image} />
                    </Wrap>
                    <InfoWrap>
                      <ItemName>{item.name}</ItemName>
                      <ItemSpecies>{item.species}</ItemSpecies>
                    </InfoWrap>
                  </ListLink>
                </Item>
              );
            })}
        </List>
      )}
    </>
  );
};

ListComponent.propTypes = {
  filter: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};
