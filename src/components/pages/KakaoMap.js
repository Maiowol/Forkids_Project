import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const { kakao } = window;
const url = process.env.REACT_APP_URL;

const KakaoMap = () => {
  const [Places, setPlaces] = useState([]);
  const { placePostId } = useParams();
  const container = useRef(null);

  // axios 통신
  React.useEffect(() => {
    axios
      .get(`${url}/api/places/` + placePostId)
      .then((res) => {
        // console.log(res.data.placeDetails)
        setPlaces(res.data.placeDetails);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const options = {
      center: new kakao.maps.LatLng(37.537187, 127.005476),
      level: 4,
      draggable: false,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container.current, options);

    // 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();
    // console.log(geocoder)

    // 주소로 좌표를 검색
    geocoder.addressSearch(`${Places.region}`, function (result, status) {
     
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // console.log(coords);

        // 인포윈도우로 장소에 대한 설명을 표시
        var infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:6px 0;font-family:Nanum Gothic;font-weight:700px;">' +
            Places.location +
            "</div>",
        });
        infowindow.open(map, marker);

        map.setCenter(coords);
      }
    });
  });

  if (!Places) {
    return <div></div>;
  }

  return (
    <div
      id="map"
      style={{
        width: "1000px",
        height: "480px",
      }}
      ref={container}
    />
  );
};

export default KakaoMap;
