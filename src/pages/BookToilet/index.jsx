/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { View, Picker } from "@tarojs/components";
import "./index.scss";
import { useState, useEffect, useMemo } from "react";
import { AtButton, AtList, AtListItem, AtTimeline } from "taro-ui";
import getLocationToiletInfoApi from "@/api/getLocationToiletInfo";
import Taro from "@tarojs/taro";
import getToiletQueueNumber from "@/api/getToiletQueueNumber";
import { getToken } from "@/utils/token";
import postBookToilet from "@/api/postBookToilet";

const BookToilet = () => {
  const [startTimeSelected, setStartTimeSelected] = useState("-----");
  const [endTimeSelected, setEndTimeSelected] = useState("-----");
  const [toiletSelector, setToiletSelector] = useState([]);

  const [myLocation, setMyLocation] = useState({
    latitude: undefined,
    longitude: undefined,
  });
  const [selectedToilet, setSelectedToilet] = useState({
    id: undefined,
    address: undefined,
    distance: undefined,
  });

  const [queueNumber, setQueueNumber] = useState(undefined);

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
        myLocation.longitude
      );

      setToiletSelector(
        response.map((item) => ({
          id: item.id,
          address: item.address,
          distance: item._distance,
        }))
      );
    })();
  }, [myLocation]);

  useEffect(() => {
    (async () => {
      const result = await Taro.getLocation();
      setMyLocation({ latitude: result.latitude, longitude: result.longitude });
      // console.log(result);
    })();
  }, []);

  const onSelectToiletChange = (event) => {
    const { id, address, distance } = toiletSelector[event.detail.value];

    setSelectedToilet({
      id,
      address,
      distance,
    });

    console.log(selectedToilet);
  };

  // 刷新排队人数
  useEffect(() => {
    (async () => {
      if (selectedToilet.id === undefined) {
        return;
      }

      setQueueNumber(await getToiletQueueNumber(selectedToilet.id));
    })();
  }, [selectedToilet]);

  const onSubmit = async () => {
    const token = getToken();

    const result = await postBookToilet(
      startTimeSelected,
      endTimeSelected,
      selectedToilet.id,
      token
    );
    if (result == true) {
      Taro.showToast({
        title: "预约成功",
        icon: "success",
        duration: 2000,
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 2000);
    } else {
      Taro.showToast({
        title: "预约失败",
        icon: "error",
        duration: 2000,
      });
    }
  };

  const nowTime = useMemo(
    () => new Date().getHours() + ":" + new Date().getMinutes(),
    []
  );
  return (
    <View className="at-article">
      <View style={{ background: "white" }}>
        <View className="at-article__h1">
          流程
          <AtTimeline
            items={[
              { title: "预约" },
              { title: "时间开始", color: "green" },
              { title: "到达地点", color: "red" },
              { title: "时间结束", color: "yellow" },
            ]}
          />
        </View>
      </View>
      <View style={{ margin: "1em 0" }}>
        <AtList>
          <Picker
            mode="time"
            start={nowTime}
            end={endTimeSelected}
            onChange={(event) => setStartTimeSelected(event.detail.value)}
          >
            <AtListItem
              arrow="right"
              title="开始时间"
              extraText={startTimeSelected}
            />
          </Picker>
          <Picker
            start={startTimeSelected}
            onChange={(event) => setEndTimeSelected(event.detail.value)}
            mode="time"
          >
            <AtListItem
              arrow="right"
              title="结束时间"
              extraText={endTimeSelected}
            />
          </Picker>
          <Picker
            mode="selector"
            range={toiletSelector}
            onChange={onSelectToiletChange}
            rangeKey="address"
          >
            <AtListItem
              arrow="right"
              title="选择附近厕所"
              note={selectedToilet.address}
            />
          </Picker>
          <AtListItem title="排队人数" extraText={queueNumber}></AtListItem>
          <AtListItem
            title="位置距离"
            extraText={
              selectedToilet.distance && `${selectedToilet.distance}米`
            }
          ></AtListItem>
        </AtList>
      </View>
      <View className="footer-btn">
        <AtButton type="primary" onClick={onSubmit}>
          提交
        </AtButton>
      </View>
    </View>
  );
};
export default BookToilet;
