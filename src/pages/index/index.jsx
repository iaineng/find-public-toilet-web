/* eslint-disable jsx-quotes */
import { View } from "@tarojs/components";
import { AtButton, AtGrid, AtInput } from "taro-ui";

import "./index.scss";

const Index = () => {
  /**
   * @type {import("taro-ui/types/grid").AtGridProps["data"]}
   */
  const gridData = [
    {
      image:
        "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
      value: "附近的厕所",
    },
    {
      image:
        "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
      value: "地图上查看",
    },
    {
      image:
        "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
      value: "热门的公厕",
    },
  ];

  return (
    <View className="index-view">
      <View>
        <AtGrid data={gridData} />
      </View>
      <View>
        <AtInput
          name="location"
          placeholder="输入地点搜索"
          title="成都"
          type="text"
        >
          <AtButton>搜索</AtButton>
        </AtInput>
      </View>
    </View>
  );
};

export default Index;
