/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { View, Picker } from "@tarojs/components";
import "./index.scss";
import { AtButton, AtList, AtListItem, AtSteps } from "taro-ui";
import { useEffect, useState } from "react";
import getLocationToiletInfoApi from "@/api/getLocationToiletInfo";
import Taro from "@tarojs/taro";
import getToiletQueueNumber from "@/api/getToiletQueueNumber";
import { getToken } from "@/utils/token";
import postUsingToilet from "@/api/postUsingToilet";

const UsingToilet = () => {
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

  const onSubmit = async () => {
    const token = getToken();

    const result = await postUsingToilet(selectedToilet.id, token);
    if (result == true) {
      Taro.showToast({
        title: "????????????",
        icon: "success",
        duration: 2000,
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 2000);
    } else {
      Taro.showToast({
        title: "????????????",
        icon: "error",
        duration: 2000,
      });
    }
  };

  return (
    <View className="using-toilet">
      <View className="steps-view">
        <AtSteps
          items={[
            { title: "?????????", desc: "????????????????????????????????????" },
            { title: "?????????", desc: "?????????????????????20?????????????????????????????????" },
          ]}
        />
      </View>
      <View className="input-view">
        <AtList>
          <Picker
            mode="selector"
            range={toiletSelector}
            onChange={onSelectToiletChange}
            rangeKey="address"
          >
            <AtListItem
              arrow="right"
              title="??????????????????"
              note={selectedToilet.address}
            />
          </Picker>
          <AtListItem title="????????????" extraText={queueNumber}></AtListItem>
          <AtListItem
            title="????????????"
            extraText={
              selectedToilet.distance && `${selectedToilet.distance}???`
            }
          ></AtListItem>
        </AtList>
      </View>
      <View className="footer-btn">
        <AtButton type="primary" onClick={onSubmit}>
          ??????
        </AtButton>
      </View>
    </View>
  );
};

export default UsingToilet;
