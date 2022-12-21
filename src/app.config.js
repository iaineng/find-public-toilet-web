/* eslint-disable no-undef */
export default defineAppConfig({
  pages: [
    "pages/Home/index",
    "pages/User/index",
    "pages/Collect/index",
    "pages/MapToilet/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#8a8a8a",
    selectedColor: "#FF0000",
    backgroundColor: "#fafafa",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/Home/index",
        iconPath: "./assets/tabBar/home.png",
        selectedIconPath: "./assets/tabBar/home_selected.png",
        text: "首页",
      },
      {
        pagePath: "pages/Collect/index",
        iconPath: "./assets/tabBar/category.png",
        selectedIconPath: "./assets/tabBar/category_selected.png",
        text: "数据",
      },
      {
        pagePath: "pages/User/index",
        iconPath: "./assets/tabBar/user.png",
        selectedIconPath: "./assets/tabBar/user_selected.png",
        text: "我的",
      },
    ],
  },
});
