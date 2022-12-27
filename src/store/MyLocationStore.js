import Taro from "@tarojs/taro";
import { makeAutoObservable } from "mobx";

class MyLocationStore {
  latitude = undefined;
  longitude = undefined;

  constructor() {
    makeAutoObservable(this);
    this.refresh();
  }
  async refresh() {
    const result = await Taro.getLocation();
    this.latitude = result.latitude;
    this.longitude = result.longitude;
  }
}
export default MyLocationStore;
