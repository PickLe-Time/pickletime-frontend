import axios from '../api/axios.jsx';
import useUser from './useUser.jsx';

// Refreshes access token and user data and sets to context
const useRefreshToken = () => {
  const { setUser } = useUser();

  const refresh = async () => {
    const response = await axios.post('/api/auth/refresh');
    setUser(() => ({
      // ...prev,
      id: response.data.id,
      username: response.data.username,
      displayName: response.data.displayName,
      role: response.data.role,
      accessToken: response.data.accessToken,
      settings: {
        theme: response.data.theme,
        color: response.data.color,
      }
    }));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
