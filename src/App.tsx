import { Outlet } from 'react-router';

import LinkItem from './LinkItem';

export default function App() {
  return (
    <div>
      <LinkItem route="/">
        <h2>Home</h2>
      </LinkItem>
      <br />
      <Outlet />
    </div>
  );
}
