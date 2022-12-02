import { makeAutoObservable } from "mobx";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  username = "miku";
  //   password = "miku";
  avatar = "";
  id = 0;

  login() {}
  register() {}
  changeInfo() {}
}

const userStore = new UserStore();

const useUserStore = () => userStore;
export default useUserStore;
