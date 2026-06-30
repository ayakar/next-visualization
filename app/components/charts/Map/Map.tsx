'use client';
import { useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapChartData, Risk } from '../../../types/RiskRating';
import { useFilters } from '@/app/hooks/useFilters';

interface Props {
    mapData: MapChartData;
}

const Map: React.FC<Props> = ({ mapData }) => {
    const { location, setLocation } = useFilters();
    const position: LatLngExpression = [43.86682, -79.2663]; // default map
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
                const averageRiskRating = mapData[item].totalRiskRating / mapData[item].assetsNum;

                const marker =
                    averageRiskRating > 0.7 ? './assets/marker-high.svg' : averageRiskRating > 0.5 ? './assets/marker-md.svg' : './assets/marker-low.svg';
                const markerSize = location === item ? 50 : 30;

                const textColor =
                    averageRiskRating > 0.7 ? 'text-risk-high-text' : averageRiskRating > 0.5 ? 'text-risk-medium-text' : 'text-risk-low-text';

                return (
                    <Marker
                        icon={L.icon({
                            iconUrl: marker,
                            iconSize: [markerSize, markerSize],
                            iconAnchor: [markerSize / 2, markerSize / 2],
                        })}
                        key={item}
                        position={[parseFloat(lat), parseFloat(long)]}
                        title={item}
                        eventHandlers={{
                            click: () => setLocation(location === item ? null : item),
                            mouseover: (event) => event.target.openPopup(),
                            mouseout: (event) => event.target.closePopup(),
                        }}
                    >
                        <Popup closeButton={false}>
                            <div className="flex gap-1 mb-2">
                                <span>Avg. Risk:</span>
                                <span className={`font-semibold ${textColor}`}>{averageRiskRating.toFixed(2)}</span>
                            </div>

                            <div className="mb-2">
                                <div>Business Categories</div>
                                <ul className="list-disc pl-3">
                                    {Object.keys(mapData[item].businessCategories).map((category) => (
                                        <li key={category}>{category}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Assets: </span>
                                <span>{mapData[item].assetsNum}</span>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;
