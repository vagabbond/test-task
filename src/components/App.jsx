import { Route, Routes } from 'react-router';

import { Home } from 'pages/Home/Home';
import { Details } from 'pages/Details/Details';
export const App = () => {
  return (
    <Routes>
      <Route path="/test-task">
        <Route index element={<Home />} />
        <Route path="details/:id" element={<Details />} />
      </Route>
    </Routes>
  );
};
