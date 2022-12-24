/* eslint-disable jsx-quotes */
import { Map, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const MapToilet = () => {
  const mapContext = Taro.createMapContext();
  return (
    <View>
      <Map
        className="map"
        latitude={40.010907}
        showCompass
        longitude={116.327148}
      />
    </View>
  );
};

export default MapToilet;
