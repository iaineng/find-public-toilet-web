/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { Input, View } from "@tarojs/components";
import "./index.scss";
import { AtButton } from "taro-ui";
import { useState } from "react";
import Taro from "@tarojs/taro";

const ContactSupport = () => {
  const [sendMessage, setSendMessage] = useState("");

  return (
    <View className="contact-support">
      <View className="send-input">
        <Input
          name="send"
          type="text"
          value={sendMessage}
          onInput={(event) => setSendMessage(event.detail.value)}
          placeholder="输入你遇到的问题"
        />
        <AtButton
          className="send-btn"
          type="primary"
          onClick={() => {
            Taro.showToast({
              title: "暂未开放",
              icon: "error",
              duration: 2000,
            });
          }}
        >
          发送
        </AtButton>
      </View>
    </View>
  );
};

export default ContactSupport;
