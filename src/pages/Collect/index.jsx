/* eslint-disable import/first */
import { View, Text } from "@tarojs/components";
import "./index.scss";
import { AtGrid } from "taro-ui";

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

  return (
    <View>
      <AtGrid data={datas} />
    </View>
  );
};

export default Collect;
