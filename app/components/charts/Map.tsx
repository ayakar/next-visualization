'use client';
import { useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Risk } from '../../types/RiskRating';

interface Props {
    locationData: Risk[] | null;
    onClickHandler?: (data: string) => void | null;
}

const Map: React.FC<Props> = ({ locationData, onClickHandler }) => {
    const position: LatLngExpression = [43.6532, -79.3832]; // default location
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

            {locationData?.map((item, index) => {
                const marker =
                    item['Risk Rating'] > 0.8 ? './assets/marker-high.svg' : item['Risk Rating'] > 0.5 ? './assets/marker-md.svg' : './assets/marker-low.svg';

                return (
                    <Marker
                        icon={L.icon({
                            iconUrl: marker,
                            iconSize: [20, 20],
                            iconAnchor: [0, 0],
                        })}
                        key={index}
                        position={[item.Lat, item.Long]}
                        title={`${item['Asset Name']}`}
                        eventHandlers={{ click: () => onClickHandler && onClickHandler(`${item.Lat},${item.Long}`) }}
                    >
                        {!onClickHandler && (
                            <Popup>
                                <h2>{item['Asset Name']}</h2>
                                <div>{item['Business Category']}</div>
                                <div>{item['Year']}</div>
                            </Popup>
                        )}
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;
