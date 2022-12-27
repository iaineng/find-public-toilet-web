/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { Input, View } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtButton, AtGrid, AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";

import "./index.scss";

import nearIcon from "@/assets/nearby.svg";
import inMapIcon from "@/assets/in-map.svg";
import popularIcon from "@/assets/popular.svg";

import getLocationToiletInfoApi from "@/api/getLocationToiletInfo";
import getToiletQueueNumber from "@/api/getToiletQueueNumber";

const Index = () => {
  /**
   * @type {import("taro-ui/types/grid").AtGridProps["data"]}
   */
  const gridData = [
    {
      image: nearIcon,
      value: "算法分析排队",
    },
    {
      image: inMapIcon,
      value: "地图上查看",
    },
    {
      image: popularIcon,
      value: "预约厕所",
    },
  ];

  const [inputSearch, setInputSearch] = useState("");
  const inputChange = (event) => {
    // console.log(event);
    setInputSearch(event.detail.value);
  };
  // 提交时，刷新我的位置以更新接口请求
  const inputSubmit = () => {
    setMyLocation((prevState) => ({ ...prevState }));
  };
  // 进入附近厕所的位置
  const nearToiletHandle = (latitude, longitude, name, address) => {
    // console.log(latitude, longitude);
    Taro.openLocation({
      name,
      address,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
  };
  // 顶部面板
  const onGridClick = (item, index) => {
    // console.log("点击了");
    switch (index) {
      case 1:
        Taro.navigateTo({
          url: `../MapToilet/index?latitude=${myLocation.latitude}&longitude=${myLocation.longitude}`,
        });
        break;
      case 0:
        Taro.navigateTo({ url: "../Analyze/index" });
        break;
      case 2:
        Taro.navigateTo({ url: "../BookToilet/index" });
        break;
    }
  };
  // 我的位置
  const [myLocation, setMyLocation] = useState({
    latitude: 40.010907,
    longitude: 116.327148,
  });
  // 附近的厕所
  const [nearToilet, setNearToilet] = useState([]);
  // 刷新附近恩的厕所数据
  useEffect(() => {
    (async () => {
      if (
        myLocation.latitude === undefined ||
        myLocation.longitude === undefined
      ) {
        return;
      }
      // console.log(myLocation);
      const response = await getLocationToiletInfoApi(
        myLocation.latitude,
        myLocation.longitude,
        inputSearch
      );
      // 先把排队人数都获取到，然后刷新附近的厕所数据
      const queue = response.map((item) => getToiletQueueNumber(item.id));
      Promise.all(queue).then((queues) => {
        setNearToilet(
          response.map((item, index) => ({
            location: item.location,
            title: item.title,
            address: item.address,
            id: item.id,
            queueNum: queues[index],
            distance: item._distance,
          }))
        );
      });
    })();
  }, [myLocation]);
  // 刷新我的位置
  useEffect(() => {
    (async () => {
      const result = await Taro.getLocation();
      setMyLocation({ latitude: result.latitude, longitude: result.longitude });
      // console.log(result);
    })();
  }, []);

  return (
    <View className="index-view">
      <View className="grid-view">
        <AtGrid data={gridData} onClick={onGridClick} />
      </View>
      <View className="input-control">
        <Input
          // className="input-control"
          name="locationName"
          placeholder="输入地点搜索"
          type="text"
          value={inputSearch}
          onInput={inputChange}
        />
        <AtButton onClick={inputSubmit} className="location-btn" type="primary">
          搜索
        </AtButton>
      </View>
      <View>
        <AtList>
          {/* <AtListItem
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
          /> */}
          {nearToilet.map((item, index) => (
            <AtListItem
              key={index}
              title={item.address}
              note={`距离你当前${item.distance}m`}
              extraText={`排队${item.queueNum}人`}
              onClick={() =>
                nearToiletHandle(
                  item.location.lat,
                  item.location.lng,
                  item.title,
                  item.address
                )
              }
              arrow="right"
            />
          ))}
        </AtList>
      </View>
    </View>
  );
};

export default Index;
