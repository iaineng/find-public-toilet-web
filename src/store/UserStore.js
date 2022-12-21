import { makeAutoObservable } from "mobx";
import Taro from "@tarojs/taro";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  username = "miku";
  //   password = "miku";
  avatar = "";
  id = 0;

  login() {
    Taro.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          Taro.request({
            url: "https://test.com/onLogin",
            data: {
              code: res.code,
            },
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  }
  register() {}
  changeInfo() {}
}

const userStore = new UserStore();

const useUserStore = () => userStore;
export default useUserStore;
