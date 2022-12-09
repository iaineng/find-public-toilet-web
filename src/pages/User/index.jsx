/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import useUserStore from "@/store/UserStore.js";
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtCard, AtList, AtListItem } from "taro-ui";

import "./index.scss";
import mikuImg from "@/assets/miku.png";

const User = () => {
  const userStore = useUserStore();

  return (
    <View className="user-view">
      <AtCard title="我的信息">
        <View className="user-info">
          <AtAvatar text={userStore.username} image={mikuImg}></AtAvatar>
          <Text className="nickname">{userStore.username}</Text>
        </View>
      </AtCard>
      <AtList>
        <AtListItem title="历史记录" arrow="right" />
        <AtListItem title="联系客服" arrow="right" />
        <AtListItem title="更新日记" arrow="right" />
        <AtListItem title="关于我们" arrow="right" />
      </AtList>
    </View>
  );
};

export default User;
