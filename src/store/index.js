import UserStore from "@/store/UserStore";
import { useContext, createContext } from "react";

class RootStore {
  constructor() {
    this.userStore = new UserStore();
  }
}

const rootStore = new RootStore();

const context = createContext(rootStore);
const useStore = () => useContext(context);

export default useStore;
