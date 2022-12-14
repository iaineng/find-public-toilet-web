/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import { Map, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import "./index.scss";
import { useEffect, useState } from "react";
import getLocationToiletInfoApi from "@/api/getLocationToiletInfo";

import toiletIcon from "@/assets/toilet.svg";

const MapToilet = () => {
  // const mapContext = Taro.createMapContext("myMap");
  const params = useRouter().params;

  const [markers, setMarkers] = useState([]);

  const { latitude, longitude } = params;

  useEffect(() => {
    (async () => {
      const locationMap = await getLocationToiletInfoApi(latitude, longitude);
      // console.log(locationMap);
      setMarkers(
        locationMap.map((item) => ({
          id: Number(item.id),
          latitude: item.location.lat,
          longitude: item.location.lng,
          iconPath: toiletIcon,
          width: 50,
          height: 50,
        }))
      );
      // console.log(markers);
    })();
  }, [latitude, longitude]);

  return (
    <View>
      <Map
        className="map"
        id="myMap"
        circles
        showLocation
        latitude={latitude}
        showCompass
        longitude={longitude}
        markers={markers}
        covers={markers}
        enableTraffic
      />
    </View>
  );
};

export default MapToilet;
