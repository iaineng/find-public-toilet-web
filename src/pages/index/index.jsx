/* eslint-disable jsx-quotes */
import { View } from "@tarojs/components";
import { useState } from "react";
import { AtButton, AtForm, AtGrid, AtInput, AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";

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
    switch (index) {
      case 1:
        Taro.navigateTo({
          url: "",
        });
    }
  };

  return (
    <View className="index-view">
      <View>
        <AtGrid data={gridData} onClick={onGridClick} />
      </View>
      <View>
        <AtForm>
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
            <AtButton>搜索</AtButton>
          </AtInput>
        </AtForm>
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
