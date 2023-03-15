import axios from 'axios';
import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

import {
  Item,
  List,
  ItemImage,
  ItemSpecies,
  ItemName,
  InfoWrap,
  ListLink,
  Wrap,
  ErorrWrap,
  ErrorMessage,
} from './List.styled';

export const ListComponent = ({ filter, location }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setError(false);
    }
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://rickandmortyapi.com/api/character/?name=${filter}`
        );
        setData(result.data.results);
        setError(false);
      } catch (error) {
        setError(true);
        setData([]);
        Notify.failure('No results found');
      }
    };
    fetchData();
  }, [filter]);
  return (
    <>
      {error ? (
        <ErorrWrap>
          <BsFillExclamationTriangleFill size={70} color="red" />
          <ErrorMessage>
            Unfortunately, we did not find a character with that name
          </ErrorMessage>
        </ErorrWrap>
      ) : (
        data.length > 0 && (
          <List>
            {data
              .sort((a, b) => {
                const current = a.name.toUpperCase();
                const next = b.name.toUpperCase();
                return current < next ? -1 : current > next ? 1 : 0;
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
        )
      )}
    </>
  );
};

ListComponent.propTypes = {
  filter: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};
