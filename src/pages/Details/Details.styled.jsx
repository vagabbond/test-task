import styled from 'styled-components';

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
`;
export const Image = styled.img`
  width: 150px;
  height: 148px;
  border-radius: 50%;
  border: 5px solid #f2f2f7;
  @media screen and (min-width: 1440px) {
    width: 300px;
    height: 300px;
  }
`;

export const NameTitle = styled.h1`
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  color: #081f32;
  text-align: center;
  margin-top: 34px;
  @media screen and (min-width: 1440px) {
    font-size: 48px;
    line-height: 56px;
  }
`;

export const InfoTitle = styled.h2`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  letter-spacing: 0.15px;

  color: #8e8e93;
  margin-top: 35px;
`;

export const InfoList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: 16px;
  @media screen and (min-width: 1440px) {
    margin-top: 48px;
    justify-content: center;
    align-items: center;
  }
`;

export const InfoItem = styled.li`
  padding-left: 16px;
  padding-top: 9px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(33, 33, 33, 0.08);
  @media screen and (min-width: 1440px) {
    width: 413px;
  }
`;

export const ItemTitle = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;

  letter-spacing: 0.15px;

  color: #081f32;
  ::first-letter {
    text-transform: uppercase;
  }
`;

export const ItemValue = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: 0.25px;

  color: #6e798c;
`;

export const Wrap = styled.div`
  position: relative;
`;
