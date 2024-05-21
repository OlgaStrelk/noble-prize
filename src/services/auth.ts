import { deleteCookie, setCookie } from './utils';
import { loginRequest, getUserRequest, logoutRequest } from './api';
import {
  getUserAction,
  getUserSuccessAction,
  loginAction,
  loginSuccessAction,
  logoutAction,
  logoutSuccessAction
} from './actions/user';
import { useDispatch, useSelector } from './hooks';

export function useAuth() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    dispatch(getUserAction());
    return await getUserRequest()
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(getUserSuccessAction({ ...data.user, id: data.user._id }));
        }
        return data.success;
      });
  };

  const signIn = async (form: { email: string; password: string }) => {
    dispatch(loginAction());
    const data = await loginRequest(form)
      .then(res => {
        let authToken;
        res.headers.forEach(header => {
          if (header.indexOf('Bearer') === 0) {
            authToken = header.split('Bearer ')[1];
          }
        });
        if (authToken) {
          setCookie('token', authToken);
        }
        return res.json();
      })
      .then(data => data);

    if (data.success) {
      dispatch(loginSuccessAction({ ...data.user, id: data.user._id }));
    }
  };

  const signOut = async () => {
    await dispatch(logoutAction());
    dispatch(logoutSuccessAction());
    return logoutRequest().then(() => {
      deleteCookie('token');
    });
  };

  return {
    user,
    getUser,
    signIn,
    signOut
  };
}