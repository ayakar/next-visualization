'use client';
import { useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { Risk } from '../types/RiskRating';
import LocationMarker from '../components/LocationMarker';

const Map = () => {
    const [locationData, setLocationData] = useState<Risk[] | null>();

    const position: LatLngExpression = [43.6532, -79.3832]; // default location
    const zoom: number = 10;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/api');
            const data = await res.json();
            setLocationData(data);
        };

        fetchData();
    }, []);

    const icon: L.DivIcon = L.divIcon({
        className: 'icon',
        iconSize: [20, 20],
        // iconAnchor: [0, 0],
        // popupAnchor: [15, 0],
    });

    return (
        <MapContainer
            // className={styles['leaflet-container']}
            center={position}
            zoom={zoom}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locationData?.map((item, index) => (
                <Marker
                    icon={icon}
                    key={index}
                    position={[item.Lat, item.Long]}
                    title={`${item['Asset Name']}`}
                >
                    <Popup>
                        <p>Risk data here</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
