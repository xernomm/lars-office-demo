import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style';
import 'ol/ol.css';
import { MOCK_VESSELS } from '../data/fleetData';

export const OpenLayersVesselMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Build features for vessels
    const features = MOCK_VESSELS.map((vessel) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([vessel.coordinates.lng, vessel.coordinates.lat])),
        name: vessel.name,
        status: vessel.status,
      });

      let fillColor = '#0ea5e9'; // At Sea
      if (vessel.status === 'In Port') fillColor = '#10b981';
      if (vessel.status === 'Maintenance') fillColor = '#f59e0b';
      if (vessel.status === 'Laid Up') fillColor = '#94a3b8';

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: fillColor }),
            stroke: new Stroke({ color: '#ffffff', width: 2 }),
          }),
          text: new Text({
            text: `${vessel.name} (${vessel.status})`,
            offsetY: -16,
            font: 'bold 10px Inter, sans-serif',
            fill: new Fill({ color: '#0f172a' }),
            stroke: new Stroke({ color: '#ffffff', width: 3 }),
          }),
        })
      );

      return feature;
    });

    const vectorSource = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            url: 'https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([114.0, 3.0]), // Centered around Indonesian / SE Asia waters
        zoom: 4.8,
      }),
      controls: [], // Clean minimalist map without default controls
    });

    mapInstanceRef.current = map;

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};
