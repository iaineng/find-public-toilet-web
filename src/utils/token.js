import Taro from "@tarojs/taro";

const TOKEN_KEY = "toilet";

const setToken = (token) => Taro.setStorageSync(TOKEN_KEY, token);
const getToken = () => Taro.getStorageSync(TOKEN_KEY);
const clearToken = () => Taro.removeStorageSync(TOKEN_KEY);

export { setToken, getToken, clearToken };
