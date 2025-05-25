import useAxiosPrivate from './useAxiosPrivate';
import useUser from './useUser';

// Clear user state and logout user info in backend
const useLogout = () => {
  const { setUser } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setUser({});
    try {
      await axiosPrivate.delete('/api/auth/logout');
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
