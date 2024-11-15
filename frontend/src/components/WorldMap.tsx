import { useEffect, useRef } from 'react';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';

interface WorldMapProps {
  onSelectCountry: (country: string) => void;
}

export const WorldMap = ({ onSelectCountry }: WorldMapProps) => {
  return (
    <div className="h-[400px] mb-8">
      <VectorMap
        map={worldMill}
        backgroundColor="#ffffff"
        style={{
          width: '100%',
          height: '100%'
        }}
        onRegionClick={(e, code) => {
          onSelectCountry(code);
        }}
        className="map"
        regionStyle={{
          initial: {
            fill: '#e4e4e4',
            stroke: '#ffffff',
            strokeWidth: 0.5,
          },
          hover: {
            fill: '#3B82F6',
          },
          selected: {
            fill: '#2563EB',
          },
        }}
      />
    </div>
  );
};