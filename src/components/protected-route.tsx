import { useAuth } from '../services/auth';
import { Navigate } from 'react-router-dom';
import { FC, useEffect, useState, ReactElement } from 'react';

export const ProtectedRouteElement: FC<{ element: ReactElement}> = ({ element }) => {
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return auth.user ? element : <Navigate to="/login" replace/>;
}