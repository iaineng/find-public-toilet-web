import http from "@/utils/http";

const getLocationToiletInfoApi = async (latitude, longitude) => {
  const response = await http.get(
    "https://apis.map.qq.com/ws/place/v1/search",
    {
      params: {
        keyword: "厕所",
        boundary: `nearby(${latitude},${longitude},1000,1)`,
        key: "HWLBZ-WZN6D-YAJ4V-HNDBE-PXNU6-C7BO4",
      },
    }
  );

  console.log(response);

  return response.data.data;

  // return [
  //   {
  //     id: "11847976332537982783",
  //     title: "公共厕所",
  //     address: "江西省南昌市东湖区二七北路与福州路交叉口东南方向131米",
  //     tel: "",
  //     category: "基础设施:公共设施:公共厕所",
  //     type: 0,
  //     location: {
  //       lat: 28.681672,
  //       lng: 115.91954,
  //     },
  //     _distance: 129.11,
  //     ad_info: {
  //       adcode: 360102,
  //       province: "江西省",
  //       city: "南昌市",
  //       district: "东湖区",
  //     },
  //   },
  // ];
};

export default getLocationToiletInfoApi;
