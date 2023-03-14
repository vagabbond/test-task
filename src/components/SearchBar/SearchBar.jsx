import { useSearchParams } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';

import { Input, Label, WrapForm } from '../../pages/Home/Home.styled';
export const SearcBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  return (
    <WrapForm>
      <Label htmlFor="search">
        <BiSearchAlt2 color="rgba(0, 0, 0, 0.54)" size={18} />
      </Label>
      <Input
        placeholder="Filter by name..."
        name="search"
        id="search"
        value={query}
        onChange={e => {
          setSearchParams({ query: e.currentTarget.value });
        }}
      />
    </WrapForm>
  );
};
