import { Link } from 'react-router';
import './App.css';

interface OwnProps {
  route: string;
  children: any;
}

function LinkItem(props: OwnProps) {
  const { route, children } = props;

  return <Link to={route}>{children}</Link>;
}

export default LinkItem;
