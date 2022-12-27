/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtButton, AtList, AtListItem, AtModal } from "taro-ui";

import "./index.scss";
// import mikuImg from "@/assets/miku.png";
import useStore from "@/store/index.js";

import Taro from "@tarojs/taro";
import MessageModal from "@/components/UpdateMessaageModal";
import { useState } from "react";
import { observer } from "mobx-react";
// import { getToken } from "@/utils/token";

const User = () => {
  const { userStore } = useStore();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // const token = getToken();

  return (
    <View className="user-view">
      <View className="user-info">
        {userStore.username === "" ? (
          <AtButton type="primary" onClick={() => userStore.login()}>
            点我登录
          </AtButton>
        ) : (
          <>
            <AtAvatar
              text={userStore.username}
              circle
              image={userStore.avatar}
            ></AtAvatar>
            <Text className="nickname">{userStore.username}</Text>
          </>
        )}
      </View>
      <View style={{ margin: "1em 0" }}>
        <AtList>
          {/* <AtListItem title="历史记录" arrow="right" /> */}
          <AtListItem
            title="联系客服"
            arrow="right"
            onClick={() => {
              Taro.navigateTo({ url: "../ContactSupport/index" });
            }}
          />
          <AtListItem
            title="更新日记"
            arrow="right"
            onClick={() => setIsUpdateOpen(true)}
          />
          <MessageModal
            description={["初代版本 2022-12-25", "更新1 2022-12-27"]}
            content={[
              ["模板"],
              ["增加了使用厕所", "增加了更新日记", "增加了联系客服"],
            ]}
            openedState={[isUpdateOpen, setIsUpdateOpen]}
            title="更新日记"
          />
          <AtListItem
            title="关于我们"
            arrow="right"
            onClick={() => setIsAboutOpen(true)}
          />
          <AtModal
            isOpened={isAboutOpen}
            title="关于我们"
            content="我们是一群有理想的学生"
            onClose={() => setIsAboutOpen(false)}
            confirmText="确认"
          />
        </AtList>
      </View>
    </View>
  );
};

export default observer(User);
