import styled from 'styled-components';

export const Logo = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
export const WrapForm = styled.div`
  position: relative;
`;
export const Input = styled.input`
  width: 100%;
  height: 56px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding-left: 48px;
  padding-top: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  color: rgba(0, 0, 0, 0.5);
`;
export const Label = styled.label`
  position: absolute;
  top: 8px;
  left: 19px;
  transform: translate(50%, 50%);
`;
export const Wrap = styled.div`
  max-width: 600px;
  max-height: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 32px;
  @media screen and (min-width: 1440px) {
    margin-bottom: 16px;
  }
`;
