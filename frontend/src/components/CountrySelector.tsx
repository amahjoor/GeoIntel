'use client';
import { useState, useEffect, useRef } from 'react';
import { countries } from '@/data/countries';

interface CountrySelectorProps {
  value: string;
  onChange: (country: string) => void;
  onSelect: () => void;
  disabled?: boolean;
}

export const CountrySelector = ({ value, onChange, onSelect, disabled }: CountrySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = async (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
    setTimeout(() => {
      onSelect();
    }, 0);
  };

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Enter country name..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />
      
      {isOpen && filteredCountries.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              onClick={() => handleCountrySelect(country.name)}
            >
              {country.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
