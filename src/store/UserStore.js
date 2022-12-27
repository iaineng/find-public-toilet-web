import { makeAutoObservable } from "mobx";
import Taro from "@tarojs/taro";
import userLogin from "@/api/userLogin";
import { setToken } from "@/utils/token";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  username = "";
  avatar = ""; // 存放base64 url
  id = 0;

  async login() {
    // console.log(this);
    const UserInfoResult = await Taro.getUserProfile({
      desc: "请授权信息以登录",
    });

    this.avatar = UserInfoResult.userInfo.avatarUrl;
    this.username = UserInfoResult.userInfo.nickName;

    const loginResult = await Taro.login();

    console.log(UserInfoResult);
    console.log(loginResult);

    const response = await userLogin(
      loginResult.code,
      this.avatar,
      this.nickName
    );
    if (response.status !== "success") {
      Taro.showToast({
        title: "登录失败",
        icon: "error",
        duration: 2000,
      });
    } else {
      setToken(response.token);
    }
  }
  changeInfo() {}
}

export default UserStore;

// const userStore = new UserStore();

// const useUserStore = () => userStore;
// export default useUserStore;
