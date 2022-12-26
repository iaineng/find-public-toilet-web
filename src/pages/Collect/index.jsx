/* eslint-disable jsx-quotes */
/* eslint-disable import/first */
import { View } from "@tarojs/components";
import "./index.scss";
import { AtGrid } from "taro-ui";
import Taro from "@tarojs/taro";

import morePeopleImg from "@/assets/more-people.svg";
import usingToiletImg from "@/assets/using-toilet.svg";

const Collect = () => {
  /**
   * @type {import("taro-ui/types/grid").AtGridProps["data"]}
   */
  const datas = [
    { value: "刷新使用人数", image: morePeopleImg },
    {
      value: "使用厕所",
      image: usingToiletImg,
    },
  ];

  const onGridClick = (item, index) => {
    switch (index) {
      case 0:
        Taro.navigateTo({ url: "../NumberOfToilet/index" });
        break;
      case 1:
        Taro.navigateTo({ url: "../UsingToilet/index" });
        break;
    }
  };

  return (
    <View className="collect-view">
      <View style={{ background: "white" }}>
        <AtGrid data={datas} onClick={onGridClick} />
      </View>
    </View>
  );
};

export default Collect;
