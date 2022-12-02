/* eslint-disable no-undef */
export default defineAppConfig({
  pages: ["pages/Index/index", "pages/User/index"],
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
        pagePath: "pages/Index/index",
        iconPath: "./assets/tabBar/home.png",
        selectedIconPath: "./assets/tabBar/home_selected.png",
        text: "首页",
      },
      // {
      //   pagePath: "pages/category/index",
      //   iconPath: "./static/tabBar/category.png",
      //   selectedIconPath: "./static/tabBar/category_selected.png",
      //   text: "分类"
      // },
      {
        pagePath: "pages/User/index",
        iconPath: "./assets/tabBar/user.png",
        selectedIconPath: "./assets/tabBar/user_selected.png",
        text: "我的",
      },
    ],
  },
});
