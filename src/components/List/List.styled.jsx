import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ListLink = styled(Link)`
  text-decoration: none;
`;
export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;

  @media screen and (min-width: 1440px) {
    margin-top: 51px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const Item = styled.li`
  width: 100%;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  @media screen and (min-width: 1440px) {
    width: calc((100% - 60px) / 4);
  }
`;

export const ItemImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
export const Wrap = styled.div`
  width: inherit;
  height: 232px;
  @media screen and (min-width: 1440px) {
    height: 168px;
  }
`;
export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
`;
export const ItemName = styled.h2`
  font-size: 20px;
  line-height: 30px;

  display: flex;
  align-items: center;
  letter-spacing: 0.15px;

  color: rgba(0, 0, 0, 0.87);

  margin: 0;
  padding: 0;
`;
export const ItemSpecies = styled.p`
  font-size: 16px;
  line-height: 21px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.6);
  @media screen and (min-width: 1440px) {
    font-size: 14px;
  }
`;
