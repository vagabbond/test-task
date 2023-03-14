import { HiArrowLeft } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { StyledLink, Span } from './BackLink.styled';
export const BackLink = ({ to }) => {
  console.log(to);
  return (
    <StyledLink to={to}>
      <HiArrowLeft size="16" />
      <Span>go back</Span>
    </StyledLink>
  );
};

BackLink.propTypes = {
  to: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
