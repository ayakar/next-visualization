'use client';
import { useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapChartData, Risk } from '../../../types/RiskRating';

interface Props {
    mapData: MapChartData;
    onClickHandler?: (data: string) => void | null;
}

const Map: React.FC<Props> = ({ mapData, onClickHandler }) => {
    const position: LatLngExpression = [43.6532, -79.3832]; // default map
    const zoom: number = 5;

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {Object.keys(mapData).map((item) => {
                const lat = item.split(',')[0];
                const long = item.split(',')[1];

                const marker =
                    mapData[item].averageRiskRating > 0.8
                        ? './assets/marker-high.svg'
                        : mapData[item].averageRiskRating > 0.5
                        ? './assets/marker-md.svg'
                        : './assets/marker-low.svg';

                return (
                    <Marker
                        icon={L.icon({
                            iconUrl: marker,
                            iconSize: [20, 20],
                            iconAnchor: [0, 0],
                        })}
                        key={item}
                        position={[parseInt(lat), parseInt(long)]}
                        title={item}
                        eventHandlers={{ click: () => onClickHandler && onClickHandler(item) }}
                    >
                        {!onClickHandler && (
                            <Popup>
                                <div>{JSON.stringify(mapData[item].averageRiskRating)}</div>
                                <div>{JSON.stringify(mapData[item].assets.length)}</div>
                            </Popup>
                        )}
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;
