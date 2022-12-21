import { makeAutoObservable } from "mobx";
import Taro from "@tarojs/taro";
import userLoginApi from "@/api/User/userLogin";
import userRegisterApi from "@/api/User/userRegister";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  username = "miku";
  avatar = "";
  id = 0;

  login() {
    Taro.login({
      success: function (res) {
        if (res.code) {
          userLoginApi(res.code);
        } else {
          console.log("注册失败！" + res.errMsg);
        }
      },
    });
  }
  register() {
    const username = this.username;
    Taro.login({
      success: function (res) {
        if (res.code) {
          userRegisterApi(res.code, username);
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  }
  changeInfo() {}
}

export default UserStore;

// const userStore = new UserStore();

// const useUserStore = () => userStore;
// export default useUserStore;
