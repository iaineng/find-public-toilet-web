import useStore from "@/store";
import http from "@/utils/http";
import { setToken } from "@/utils/token";

const userLoginApi = async (code) => {
  setToken(code);

  const response = await http.get();

  // if(response.status.)

  const { username, avatar, id } = response.data;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userStore } = useStore();
  userStore.avatar = avatar;
  userStore.id = id;
  userStore.username = username;
};

export default userLoginApi;
