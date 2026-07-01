'use client';
import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { MapContainer, CircleMarker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapChartData, Risk } from '../../../types/RiskRating';
import { useFilters } from '@/app/hooks/useFilters';
import { BRAND_COLOR, SURFACE_COLOR, riskColorFor } from '@/app/constants/colors';

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

                const riskColor = riskColorFor(averageRiskRating);
                const selected = location === item;
                const textColor =
                    averageRiskRating > 0.7 ? 'text-risk-high-text' : averageRiskRating > 0.5 ? 'text-risk-medium-text' : 'text-risk-low-text';

                return (
                    <CircleMarker
                        key={item}
                        center={[parseFloat(lat), parseFloat(long)]}
                        radius={selected ? 9 : 6}
                        pathOptions={{ color: selected ? BRAND_COLOR : SURFACE_COLOR, weight: selected ? 3 : 2, fillColor: riskColor, fillOpacity: 1 }}
                        eventHandlers={{
                            click: () => setLocation(selected ? null : item),
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
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
};

export default Map;
