'use client';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

interface WorldMapProps {
  onSelectCountry: (country: string) => void;
}

interface GeoData {
  properties: {
    name: string;
  };
  rsmKey: string;
}

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export const WorldMap = ({ onSelectCountry }: WorldMapProps) => {
  return (
    <div className="h-[400px] w-full">
      <ComposableMap>
        <ZoomableGroup center={[0, 20]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo: GeoData) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    onSelectCountry(geo.properties.name);
                  }}
                  style={{
                    default: {
                      fill: "#e4e4e4",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: "#3B82F6",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#2563EB",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};