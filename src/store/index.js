import UserStore from "@/store/UserStore";

class RootStore {
  userStore = new UserStore();
}

const rootStore = new RootStore();
const useStore = () => rootStore;

export default useStore;
