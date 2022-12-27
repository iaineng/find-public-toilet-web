/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { View, Picker, Text } from "@tarojs/components";
import "./index.scss";
import {
  AtListItem,
  AtList,
  AtTabs,
  AtTabsPane,
  AtButton,
  AtInput,
} from "taro-ui";
import { useState, useEffect } from "react";
import getLocationToiletInfoApi from "@/api/getLocationToiletInfo";
import getToiletQueueNumber from "@/api/getToiletQueueNumber";
import Taro from "@tarojs/taro";
import postRefreshToiletByUsingNum from "@/api/postRefreshToiletByUsingNum";
import { getToken } from "@/utils/token";
import postRefreshToiletByQueueNum from "@/api/postRefreshToiletByQueueNum";

const NumberOfToilet = () => {
  const [toiletSelector, setToiletSelector] = useState([]);
  const [selectedToilet, setSelectedToilet] = useState({
    id: undefined,
    address: undefined,
    distance: undefined,
  });

  const [myLocation, setMyLocation] = useState({
    latitude: undefined,
    longitude: undefined,
  });
  const [queueNumber, setQueueNumber] = useState(undefined);

  useEffect(() => {
    (async () => {
      const result = await Taro.getLocation();
      setMyLocation({ latitude: result.latitude, longitude: result.longitude });
      // console.log(result);
    })();
  }, []);

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

  const onSelectToiletChange = async (event) => {
    const { id, address, distance } = toiletSelector[event.detail.value];

    setSelectedToilet({
      id,
      address,
      distance,
    });

    setQueueNumber(await getToiletQueueNumber(id));
  };

  const [selectedCurrent, setSelectedCurrent] = useState(0);

  const [usingInputInfo, setUsingInputInfo] = useState({
    maxNum: undefined,
    usingNum: undefined,
  });
  const [queueInputInfo, setQueueInputInfo] = useState(undefined);
  const onSubmit = async () => {
    const token = getToken();
    let result;
    if (selectedCurrent === 0) {
      result = await postRefreshToiletByUsingNum(
        usingInputInfo.maxNum,
        usingInputInfo.usingNum,
        token
      );
    } else {
      result = await postRefreshToiletByQueueNum(queueInputInfo, token);
    }

    if (result == true) {
      Taro.showToast({
        title: "提交成功",
        icon: "success",
        duration: 2000,
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 2000);
    } else {
      Taro.showToast({
        title: "提交失败",
        icon: "error",
        duration: 2000,
      });
    }
  };
  return (
    <View className="number-toilet">
      <AtList>
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
        <AtListItem title="当前排队人数" extraText={queueNumber}></AtListItem>

        <AtListItem
          title="距离你"
          extraText={selectedToilet.distance && `${selectedToilet.distance}米`}
        />
      </AtList>
      <View style={{ margin: "1em 0" }}>
        <AtTabs
          current={selectedCurrent}
          tabList={[{ title: "使用人数" }, { title: "排队人数" }]}
          onClick={(value) => setSelectedCurrent(value)}
        >
          <AtTabsPane current={selectedCurrent} index={0}>
            <View className="tabs-content">
              <View className="input-control">
                <Text>容量：</Text>
                <AtInput
                  placeholder="输入厕所最大容量人数"
                  type="number"
                  value={usingInputInfo.maxNum}
                  onChange={(value) =>
                    setUsingInputInfo((state) => ({ ...state, maxNum: value }))
                  }
                />
              </View>
              <View className="input-control">
                <Text>使用：</Text>
                <AtInput
                  placeholder="输入目前在厕所的人数"
                  type="number"
                  onChange={(value) =>
                    setUsingInputInfo((state) => ({
                      ...state,
                      usingNum: value,
                    }))
                  }
                  value={usingInputInfo.usingNum}
                />
              </View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={selectedCurrent} index={1}>
            <View className="tabs-content">
              <View className="input-control">
                <Text>排队：</Text>
                <AtInput
                  placeholder="输入目前排队人数"
                  type="number"
                  value={queueInputInfo}
                  onChange={(value) => setQueueInputInfo(value)}
                />
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
      <View className="footer-btn">
        <AtButton type="primary" onClick={onSubmit}>
          提交
        </AtButton>
      </View>
    </View>
  );
};

export default NumberOfToilet;
