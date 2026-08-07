import React, { useState, useEffect, useRef } from 'react';
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
import { Vessel } from '../types';
import {
  Ship, Radio, Layers, Maximize2, ExternalLink, RefreshCw,
  Search, MapPin, Compass, Navigation, Database, ShieldCheck,
  Globe, Info, Filter, ArrowUpRight, Zap
} from 'lucide-react';

interface MarineTrafficMapProps {
  initialVesselId?: string;
  heightClass?: string;
  showApiPanel?: boolean;
}

interface RegionPreset {
  id: string;
  name: string;
  lat: number;
  lng: number;
  zoom: number;
}

const REGION_PRESETS: RegionPreset[] = [
  { id: 'all', name: 'Nusantara / SE Asia', lat: -2.5, lng: 118.0, zoom: 5 },
  { id: 'malacca', name: 'Selat Malaka', lat: 2.5, lng: 101.5, zoom: 7 },
  { id: 'singapore', name: 'Batam & Singapore Strait', lat: 1.26, lng: 103.84, zoom: 9 },
  { id: 'jawa', name: 'Laut Jawa', lat: -5.8, lng: 110.4, zoom: 7 },
  { id: 'sunda', name: 'Selat Sunda', lat: -5.9, lng: 105.8, zoom: 8 },
  { id: 'makassar', name: 'Selat Makassar', lat: -1.2, lng: 118.5, zoom: 7 },
];

export const MarineTrafficMap: React.FC<MarineTrafficMapProps> = ({
  initialVesselId,
  heightClass = 'h-[460px]',
  showApiPanel = true
}) => {
  const [viewMode, setViewMode] = useState<'embed' | 'radar' | 'api'>('embed');
  const [selectedRegion, setSelectedRegion] = useState<RegionPreset>(REGION_PRESETS[0]);
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(
    initialVesselId ? MOCK_VESSELS.find(v => v.id === initialVesselId) || null : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiFormat, setApiFormat] = useState<'json' | 'openapi' | 'legacy'>('json');

  // OpenLayers ref
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  // Filter vessels
  const filteredVessels = MOCK_VESSELS.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.mmsi.includes(searchQuery) ||
    v.imo.includes(searchQuery) ||
    v.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // MarineTraffic Iframe Embed URL construction
  const getMarineTrafficEmbedUrl = () => {
    const centerLat = selectedVessel ? selectedVessel.coordinates.lat : selectedRegion.lat;
    const centerLng = selectedVessel ? selectedVessel.coordinates.lng : selectedRegion.lng;
    const zoom = selectedVessel ? 10 : selectedRegion.zoom;
    const mmsi = selectedVessel ? selectedVessel.mmsi : '0';

    return `https://www.marinetraffic.com/en/ais/embed/zoom:${zoom}/centerv:${centerLat}/centerx:${centerLng}/maptype:1/shownames:true/mmsi:${mmsi}/shipid:0/fleet:0/fleet_id:0/remember:false`;
  };

  // OpenLayers Radar Map Effect
  useEffect(() => {
    if (viewMode !== 'radar' || !mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setTarget(undefined);
      mapInstanceRef.current = null;
    }

    const features = MOCK_VESSELS.map((vessel) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([vessel.coordinates.lng, vessel.coordinates.lat])),
        name: vessel.name,
        vessel: vessel,
      });

      let statusColor = '#0ea5e9'; // At Sea - Blue
      if (vessel.status === 'In Port') statusColor = '#10b981'; // Green
      if (vessel.status === 'Maintenance') statusColor = '#f59e0b'; // Amber
      if (vessel.status === 'Laid Up') statusColor = '#64748b'; // Slate

      const isSelected = selectedVessel?.id === vessel.id;

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: isSelected ? 10 : 7,
            fill: new Fill({ color: statusColor }),
            stroke: new Stroke({ color: '#ffffff', width: isSelected ? 3 : 2 }),
          }),
          text: new Text({
            text: `🚢 ${vessel.name} [${vessel.speed} kn]`,
            offsetY: -18,
            font: 'bold 11px Inter, sans-serif',
            fill: new Fill({ color: '#0f172a' }),
            stroke: new Stroke({ color: '#ffffff', width: 3 }),
          }),
        })
      );

      return feature;
    });

    const vectorSource = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const centerCoords = selectedVessel 
      ? [selectedVessel.coordinates.lng, selectedVessel.coordinates.lat]
      : [selectedRegion.lng, selectedRegion.lat];

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
        center: fromLonLat(centerCoords),
        zoom: selectedVessel ? 10 : selectedRegion.zoom,
      }),
      controls: [],
    });

    map.on('click', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (ft) => ft);
      if (feature) {
        const vesselData = feature.get('vessel') as Vessel;
        setSelectedVessel(vesselData);
      }
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
      }
    };
  }, [viewMode, selectedRegion, selectedVessel]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleRegionChange = (region: RegionPreset) => {
    setSelectedRegion(region);
    setSelectedVessel(null);
    if (mapInstanceRef.current && viewMode === 'radar') {
      mapInstanceRef.current.getView().animate({
        center: fromLonLat([region.lng, region.lat]),
        zoom: region.zoom,
        duration: 500,
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-slate-100 flex flex-col">
      {/* Top MarineTraffic Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-sm tracking-wide text-white flex items-center gap-1.5">
                MARINETRAFFIC <span className="text-cyan-400 font-extrabold text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800">AIS LIVE MAP</span>
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                API LIVE FEED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Real-time Global Vessel Positions & Telemetry API Integration
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Switcher */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('embed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'embed'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>MarineTraffic Live</span>
            </button>
            <button
              onClick={() => setViewMode('radar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'radar'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>AIS Radar Vektor</span>
            </button>
            {showApiPanel && (
              <button
                onClick={() => setViewMode('api')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'api'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>API Telemetry</span>
              </button>
            )}
          </div>

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            title="Refresh AIS Data"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          {/* External MarineTraffic button */}
          <a
            href={selectedVessel ? `https://www.marinetraffic.com/en/ais/details/ships/mmsi:${selectedVessel.mmsi}` : "https://www.marinetraffic.com/en/ais/home"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800 transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">MarineTraffic.com</span>
          </a>
        </div>
      </div>

      {/* Regional Presets & Vessel Quick Filter Bar */}
      <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 mr-1 flex items-center gap-1 shrink-0">
            <Compass className="w-3 h-3 text-cyan-400" /> Region:
          </span>
          {REGION_PRESETS.map((reg) => (
            <button
              key={reg.id}
              onClick={() => handleRegionChange(reg)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all ${
                selectedRegion.id === reg.id && !selectedVessel
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {reg.name}
            </button>
          ))}
        </div>

        {/* Vessel Search / Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari MMSI / IMO / Kapal..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          {selectedVessel && (
            <button
              onClick={() => setSelectedVessel(null)}
              className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-1 rounded-lg font-bold hover:bg-rose-900"
            >
              Reset Kapal
            </button>
          )}
        </div>
      </div>

      {/* Main Map / View Area */}
      <div className={`relative w-full ${heightClass} bg-slate-950 flex flex-col`}>
        {/* MODE 1: Embedded MarineTraffic Live Map */}
        {viewMode === 'embed' && (
          <div className="w-full h-full relative group">
            <iframe
              title="MarineTraffic Live AIS Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={getMarineTrafficEmbedUrl()}
              className="w-full h-full border-0 rounded-b-2xl"
              allowFullScreen
            />
            {/* Overlay banner when vessel is selected */}
            {selectedVessel && (
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 p-3 rounded-xl shadow-2xl max-w-sm z-10 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-cyan-400 flex items-center gap-1">
                    <Ship className="w-4 h-4 text-cyan-400" /> {selectedVessel.name}
                  </span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded font-bold">
                    MMSI: {selectedVessel.mmsi}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                  <div>Status: <span className="font-bold text-emerald-400">{selectedVessel.status}</span></div>
                  <div>Kecepatan: <span className="font-bold text-cyan-300">{selectedVessel.speed} kn</span></div>
                  <div>Haluan: <span className="font-bold text-amber-300">{selectedVessel.heading}°</span></div>
                  <div>DWT: <span className="font-bold text-slate-200">{selectedVessel.dwt.toLocaleString()} MT</span></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: OpenLayers AIS Radar Mode */}
        {viewMode === 'radar' && (
          <div className="w-full h-full relative">
            <div ref={mapRef} className="w-full h-full rounded-b-2xl" />
            {/* Selected Vessel Popup Card */}
            {selectedVessel && (
              <div className="absolute bottom-4 left-4 bg-slate-900/95 border border-cyan-500/40 backdrop-blur-md p-4 rounded-2xl shadow-2xl max-w-md z-20 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-400">
                      <Ship className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{selectedVessel.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {selectedVessel.type} • {selectedVessel.flagEmoji} {selectedVessel.flag}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVessel(null)}
                    className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5 bg-slate-800 rounded-md"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">MMSI</span>
                    <span className="font-mono font-bold text-cyan-300">{selectedVessel.mmsi}</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">IMO</span>
                    <span className="font-mono font-bold text-slate-200">{selectedVessel.imo}</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Speed / Head</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedVessel.speed} kn / {selectedVessel.heading}°</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Posisi: {selectedVessel.coordinates.lat.toFixed(4)}°, {selectedVessel.coordinates.lng.toFixed(4)}°</span>
                  <a
                    href={`https://www.marinetraffic.com/en/ais/details/ships/mmsi:${selectedVessel.mmsi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 font-bold hover:underline flex items-center gap-0.5"
                  >
                    Buka Detail MT <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 3: MarineTraffic AIS API Explorer */}
        {viewMode === 'api' && (
          <div className="w-full h-full p-4 overflow-y-auto space-y-4 text-xs font-mono bg-slate-950 text-slate-200">
            <div className="flex flex-wrap items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-xl gap-2 font-sans">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span className="font-extrabold text-white text-xs">MarineTraffic Legacy API v8 & OpenAPI Telemetry Spec</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setApiFormat('json')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${apiFormat === 'json' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  Live Positions (JSON)
                </button>
                <button
                  onClick={() => setApiFormat('openapi')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${apiFormat === 'openapi' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  apis.yml Spec
                </button>
                <button
                  onClick={() => setApiFormat('legacy')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold ${apiFormat === 'legacy' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  Vessel Positions Spec
                </button>
              </div>
            </div>

            {apiFormat === 'json' && (
              <div className="space-y-3 font-mono">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px]">
                  <div className="text-cyan-400 font-bold">GET https://services.marinetraffic.com/api/exportvessels/v:8/YOUR_API_KEY/protocol:json/timespan:10</div>
                  <div className="text-slate-400 text-[10px] mt-1">Status: 200 OK | Response Time: 42ms | Format: JSON | Active Vessels: {filteredVessels.length}</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  <pre className="text-emerald-400 text-[11px] leading-relaxed">
{JSON.stringify(
  filteredVessels.map(v => ({
    MMSI: v.mmsi,
    IMO: v.imo,
    SHIPNAME: v.name,
    SHIPTYPE: v.type,
    LAT: v.coordinates.lat,
    LON: v.coordinates.lng,
    SPEED: Math.round(v.speed * 10),
    HEADING: v.heading,
    COURSE: v.course || v.heading,
    STATUS: v.status === 'At Sea' ? 0 : v.status === 'In Port' ? 5 : 1,
    FLAG: v.flag,
    DRAUGHT: v.draught || 7.5,
    DESTINATION: v.destination || v.location,
    ETA: v.eta || '2024-06-05 14:00:00',
    TIMESTAMP: new Date().toISOString()
  })),
  null,
  2
)}
                  </pre>
                </div>
              </div>
            )}

            {apiFormat === 'openapi' && (
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto text-[11px] text-cyan-300 font-mono">
<pre>{`aid: marine-traffic
url: https://raw.githubusercontent.com/api-evangelist/marine-traffic/refs/heads/main/apis.yml
apis:
  - aid: marine-traffic:marine-traffic-ais-api-api
    name: MarineTraffic AIS API API
    description: Official MarineTraffic Vessel Positions & AIS API Spec
    humanURL: https://servicedocs.marinetraffic.com/
    properties:
      - type: Documentation
        url: https://servicedocs.marinetraffic.com/tag/Vessel-Positions-(Legacy-API)
      - type: OpenAPI
        url: openapi/marine-traffic-ais-api-api-openapi.yml
      - type: JSONSchema
        url: json-schema/marine-traffic-vessel-position-schema.json`}</pre>
              </div>
            )}

            {apiFormat === 'legacy' && (
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto text-[11px] text-amber-300 font-mono space-y-2">
                <div className="text-white font-bold">MarineTraffic Legacy API Parameter Documentation:</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-300 font-sans text-xs">
                  <li><strong className="text-cyan-400 font-mono">MMSI</strong>: Maritime Mobile Service Identity (unique vessel id)</li>
                  <li><strong className="text-cyan-400 font-mono">IMO</strong>: International Maritime Organization Number</li>
                  <li><strong className="text-cyan-400 font-mono">LAT / LON</strong>: Geographical coordinates (Decimal Degrees WGS84)</li>
                  <li><strong className="text-cyan-400 font-mono">SPEED</strong>: Speed over ground in tenths of knots (e.g. 125 = 12.5 knots)</li>
                  <li><strong className="text-cyan-400 font-mono">HEADING</strong>: Vessel compass heading (0 - 359 degrees)</li>
                  <li><strong className="text-cyan-400 font-mono">STATUS</strong>: AIS Navigation Status Code (0=Under Way, 1=At Anchor, 5=Moored)</li>
                  <li><strong className="text-cyan-400 font-mono">DRAUGHT</strong>: Current vessel draught in meters</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MarineTraffic Quick Fleet Bar Footer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-slate-300">
            <Ship className="w-3.5 h-3.5 text-cyan-400" />
            Total Fleet Monitored: <span className="text-cyan-300 font-mono font-black">{MOCK_VESSELS.length} Vessels</span>
          </span>
          <span className="hidden md:inline-block text-slate-600">|</span>
          <span className="hidden md:inline font-medium text-slate-400">
            Active AIS Signals: <span className="text-emerald-400 font-bold">100% Online</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500">Coverage: Global Coastal & Satellite AIS</span>
          <a
            href="https://servicedocs.marinetraffic.com/tag/Vessel-Positions-(Legacy-API)"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-cyan-400 font-bold hover:underline flex items-center gap-1"
          >
            Docs API MarineTraffic <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
