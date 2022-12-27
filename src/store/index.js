import MyLocationStore from "@/store/MyLocationStore";
import UserStore from "@/store/UserStore";
import { useContext, createContext } from "react";

class RootStore {
  constructor() {
    this.userStore = new UserStore();
    this.myLocationStore = new MyLocationStore();
  }
}

const rootStore = new RootStore();

const context = createContext(rootStore);
const useStore = () => useContext(context);

export default useStore;
