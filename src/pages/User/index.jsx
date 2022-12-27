/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtList, AtListItem } from "taro-ui";

import "./index.scss";
import mikuImg from "@/assets/miku.png";
import useStore from "@/store/index.js";

const User = () => {
  const { userStore } = useStore();

  return (
    <View className="user-view">
      <View className="user-info">
        <AtAvatar text={userStore.username} circle image={mikuImg}></AtAvatar>
        <Text className="nickname">{userStore.username}</Text>
      </View>
      <View style={{ margin: "1em 0" }}>
        <AtList>
          {/* <AtListItem title="历史记录" arrow="right" /> */}
          <AtListItem title="联系客服" arrow="right" />
          <AtListItem title="更新日记" arrow="right" />
          <AtListItem title="关于我们" arrow="right" />
        </AtList>
      </View>
    </View>
  );
};

export default User;
