import useUserStore from "@/store/UserStore";
import { View, Text } from "@tarojs/components";
import { AtAvatar } from "taro-ui";

import "./index.scss";

const User = () => {
  const userStore = useUserStore();

  return (
    <View>
      <View className="user-info">
        <AtAvatar text={userStore.username}></AtAvatar>
        <Text className="nickname">{userStore.username}</Text>
      </View>
      <Text>我是用户界面</Text>
    </View>
  );
};

export default User;
