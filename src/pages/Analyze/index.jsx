/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { View } from "@tarojs/components";
import "./index.scss";
import { AtNoticebar } from "taro-ui";
import { useRouter } from "@tarojs/taro";

import nearIcon from "@/assets/nearby.svg";
import { useEffect, useState } from "react";
import getDrivingDistance from "@/api/getDrivingDistance";

import getLocationToiletInfoApi from "@/api/getLocationToiletInfo";

// 通过算法分析排队
const Analyze = () => {
  const router = useRouter();

  const [myLocation, setMyLocation] = useState({
    latitude: router.params.latitude,
    longitude: router.params.longitude,
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
        "",
        3
      );
      // const temp = response.map((item) => ({
      //   id: item.id,
      //   title: item.title,
      //   latitude: item.location.lat,
      //   longitude: item.location.lng,
      // }));

      setNearToilet();
    })();
  }, [myLocation]);

  // useEffect(() => {
  //   (async () => {
  //     const results = await getDrivingDistance(
  //       myLocation.latitude,
  //       myLocation.longitude,
  //       40.009938,
  //       104.770077
  //     );

  //     console.log(results);
  //   })();
  // }, []);

  return (
    <View className="analyze-view">
      <AtNoticebar single>算法仅供参考</AtNoticebar>
    </View>
  );
};

export default Analyze;
