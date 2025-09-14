"use client";
import React from "react";
import { YMaps, Map, Placemark } from "@iminside/react-yandex-maps";

type YandexMapControl =
    | "zoomControl"
    | "rulerControl"
    | "routeButtonControl"
    | "trafficControl"
    | "typeSelector"
    | "fullscreenControl"
    | "geolocationControl"
    | "searchControl";
type YandexMapModule =
    | "control.ZoomControl"
    | "control.FullscreenControl"
    | "control.SearchControl"
    | "control.GeolocationControl"
    | "control.TrafficControl"
    | "control.TypeSelector"
    | "control.RouteButtonControl"
    | "control.RulerControl";

interface IYandexMapProps {
    coordinates: number[];
    zoom: number;
    controls?: YandexMapControl[];
    modules?: YandexMapModule[];
}
const YandexMap: React.FC<IYandexMapProps> = ({ coordinates, zoom, controls, modules }) => {
    return (
        <YMaps>
            <Map
                width={"100%"}
                height={"100%"}
                defaultState={{
                    center: coordinates,
                    zoom,
                    controls,
                }}
                modules={modules}
            >
                <Placemark geometry={coordinates} />
            </Map>
        </YMaps>
    );
};
export default YandexMap;
