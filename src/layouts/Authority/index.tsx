import { useAppSelector } from '@/store/hooks';
import { Navigate } from 'react-router';

interface Props {
  children: React.ReactNode;
}

const Authority: React.FC<Props> = (props) => {
  const { children } = props;

  const user = useAppSelector((state) => state.user);

  if (!user?.power) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default Authority;
