/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import useUserStore from "@/store/UserStore.js";
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtList, AtListItem } from "taro-ui";

import "./index.scss";
import mikuImg from "@/assets/miku.png";

const User = () => {
  const userStore = useUserStore();

  return (
    <View>
      <View className="user-info">
        <AtAvatar text={userStore.username} image={mikuImg}></AtAvatar>
        <Text className="nickname">{userStore.username}</Text>
      </View>
      <AtList>
        <AtListItem title="历史记录" arrow="right" />
        <AtListItem title="历史记录" arrow="right" />
        <AtListItem title="历史记录" arrow="right" />
      </AtList>
      <Text>我是用户界面</Text>
    </View>
  );
};

export default User;
