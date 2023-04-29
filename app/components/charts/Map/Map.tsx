'use client';
import { useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapChartData, Risk } from '../../../types/RiskRating';
import { useFilterContext } from '@/app/contexts/FilterContext';

interface Props {
    mapData: MapChartData;
}

const Map: React.FC<Props> = ({ mapData }) => {
    const { selectedLocation, setSelectedLocation } = useFilterContext();
    const position: LatLngExpression = [43.6532, -79.3832]; // default map
    const zoom: number = 5;

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={true}
            // onClick={() => setSelectedLocation('')}
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
                const markerSize = selectedLocation === item ? 50 : 30;

                return (
                    <Marker
                        icon={L.icon({
                            iconUrl: marker,
                            iconSize: [markerSize, markerSize],
                            iconAnchor: [markerSize / 2, 0],
                        })}
                        key={item}
                        position={[parseInt(lat), parseInt(long)]}
                        title={item}
                        eventHandlers={{
                            click: () => setSelectedLocation((prev) => (prev !== item ? item : '')),
                            mouseover: (event) => event.target.openPopup(),
                            mouseout: (event) => event.target.closePopup(),
                        }}
                    >
                        <Popup closeButton={false}>
                            <div>Avg. Risk Rating:{mapData[item].averageRiskRating.toFixed(2)}</div>
                            <div>Total Assets: {mapData[item].assets.length}</div>
                            <div>
                                Business Categories:
                                <ul>
                                    {Object.keys(mapData[item].businessCategories).map((category) => (
                                        <li key={category}>{category}</li>
                                    ))}
                                </ul>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;
