import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import axios from 'axios';
import { get } from 'lodash';

import { BackLink } from 'components/BackLink/BackLink';
import { Box } from 'components/Global.styled';
import {
  Image,
  NameTitle,
  InfoTitle,
  InfoList,
  InfoItem,
  ItemTitle,
  ItemValue,
  ImageBox,
  Wrap,
} from './Details.styled';

export const Details = () => {
  const [character, setCharacter] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from || '/home';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(result.data);
      } catch (error) {
        Notify.failure('Something went wrong');
      }
    };
    fetchData();
  }, [id]);
  const informationFields = {
    gender: 'gender',
    status: 'status',
    species: 'species',
    type: 'type',
    origin: 'origin.name',
  };
  return (
    <Wrap>
      <BackLink to={backLinkHref} />
      <Box>
        <ImageBox>
          <Image src={character.image} alt="Character Name" />
        </ImageBox>
        <NameTitle>{character.name}</NameTitle>
        <InfoTitle>Informations</InfoTitle>
        <InfoList>
          {Object.entries(informationFields).map(([key, value]) => {
            return (
              <InfoItem key={key}>
                <ItemTitle>{key}</ItemTitle>
                <ItemValue>
                  {get(character, value) !== ''
                    ? get(character, value)
                    : 'Unknown'}
                </ItemValue>
              </InfoItem>
            );
          })}
        </InfoList>
      </Box>
    </Wrap>
  );
};
