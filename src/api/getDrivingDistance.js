import http from "@/utils/http";

const getDrivingDistance = async (fromLat, fromLng, toLat, toLng) => {
  const url = "https://apis.map.qq.com/ws/direction/v1/driving/";
  const response = await http.get(url, {
    params: {
      key: "HWLBZ-WZN6D-YAJ4V-HNDBE-PXNU6-C7BO4",
      from: `${fromLat},${fromLng}`,
      to: `${toLat},${toLng}`,
      get_speed: 1,
    },
  });

  console.log(response);

  return response.data.result;
};
export default getDrivingDistance;
