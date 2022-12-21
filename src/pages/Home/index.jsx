/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { View } from "@tarojs/components";
import { useState } from "react";
import { AtButton, AtGrid, AtInput, AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";

import "./index.scss";

import nearIcon from "@/assets/nearby.svg";
import inMapIcon from "@/assets/in-map.svg";
import popularIcon from "@/assets/popular.svg";
import { useEffect } from "react";

const Index = () => {
  /**
   * @type {import("taro-ui/types/grid").AtGridProps["data"]}
   */
  const gridData = [
    {
      image: nearIcon,
      value: "附近的厕所",
    },
    {
      image: inMapIcon,
      value: "地图上查看",
    },
    {
      image: popularIcon,
      value: "热门的公厕",
    },
  ];

  const [inputSearch, setInputSearch] = useState("");

  const inputChange = (event) => {
    setInputSearch(event.target.value);
  };

  const testHandle = () => {
    const params = {
      title: "清华大学紫荆学生公寓5号楼",
      address: "北京海淀区清华大学紫荆学生公寓5号楼",
      latitude: "40.010907",
      longitude: "116.327148",
    };
    const name = params.title;
    const address = params.address;
    const latitude = Number(params.latitude);
    const longitude = Number(params.longitude);

    Taro.openLocation({
      name,
      address,
      latitude,
      longitude,
    });
  };

  Taro.getLocation({
    type: "wgs84",
    success: function (res) {
      console.log(res);
    },
  });

  const onGridClick = (item, index) => {
    console.log("点击了");
    switch (index) {
      case 1:
        Taro.navigateTo({
          url: "MapToilet",
        });
    }
  };

  const [nearToilet, setNearToilet] = useState([]);

  useEffect(() => {
    setNearToilet(getLocationToiletInfoApi());
  }, []);

  return (
    <View className="index-view">
      <View>
        <AtGrid data={gridData} onClick={onGridClick} />
      </View>
      <View>
        <AtInput
          // className="input-control"
          name="locationName"
          clear
          placeholder="输入地点搜索"
          title="成都"
          type="text"
          value={inputSearch}
          onChange={inputChange}
        >
          <AtButton onClick={() => console.log(inputSearch)}>搜索</AtButton>
        </AtInput>
      </View>
      <View>
        <AtList>
          <AtListItem
            onClick={testHandle}
            title="芙蓉小区"
            note="距离你当前300m"
            extraText="目前排队5人"
            arrow="right"
          />
          <AtListItem
            onClick={testHandle}
            title="芙蓉小区"
            note="距离你当前300m"
            extraText="目前排队5人"
            arrow="right"
          />
          <AtListItem
            onClick={testHandle}
            title="芙蓉小区"
            note="距离你当前300m"
            extraText="目前排队5人"
            arrow="right"
          />
        </AtList>
      </View>
    </View>
  );
};

export default Index;
