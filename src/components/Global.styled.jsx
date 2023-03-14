import styled from 'styled-components';

export const Box = styled.div`
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: 360px) {
    padding: 92px 24px;
    width: 360px;
  }

  @media screen and (min-width: 1440px) {
    width: 1440px;
    padding: 92px 210px;
  }
`;
