/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { View } from "@tarojs/components";
import "./index.scss";
import { AtNoticebar } from "taro-ui";
// 通过算法分析排队
const Analyze = () => {
  return (
    <View className="analyze-view">
      <AtNoticebar single>算法仅供参考</AtNoticebar>
    </View>
  );
};

export default Analyze;
