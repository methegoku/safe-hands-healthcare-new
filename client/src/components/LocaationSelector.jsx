import { MapPin, Loader2, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CitySelector from "./CitySelector";
import useDetectLocation from "../hooks/useDetectLocation";

export default function LocationSelector({ onLocationSelect, selectedCityId, className = "" }) {
    const { data: cities = [], isLoading } = useQuery({
        queryKey: ["/api/cities"],
        queryFn: async () => {
            const res = await fetch("/api/cities");
            if (!res.ok) throw new Error("Failed to fetch cities");
            return res.json();
        },
    });

    const { isDetecting, detectedLocation, detectLocation } = useDetectLocation(cities, onLocationSelect);

    const handleCityChange = (cityId) => {
        onLocationSelect?.({ cityId });
    };

    return (
        <div className={`border rounded-lg shadow p-6 bg-white ${className}`}>
            <div className="flex items-center space-x-4 mb-4">
                <MapPin className="text-blue-700 w-6 h-6" />
                <div>
                    <h3 className="font-semibold text-gray-900">Choose Your Location</h3>
                    <p className="text-sm text-gray-600">We'll find care professionals near you</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                        onClick={detectLocation}
                        disabled={isDetecting}
                        className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                        {isDetecting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : detectedLocation ? (
                            <CheckCircle className="w-4 h-4" />
                        ) : (
                            <MapPin className="w-4 h-4" />
                        )}
                        <span>
              {isDetecting ? "Detecting..." : detectedLocation ? "Location Detected" : "Use My Location"}
            </span>
                    </button>

                    <div className="flex-1">
                        <CitySelector
                            value={selectedCityId}
                            onValueChange={handleCityChange}
                            placeholder="Or select city manually"
                            className="w-full border border-gray-300 rounded px-2 py-2"
                        />
                    </div>
                </div>

                {detectedLocation && (
                    <div className="text-sm text-green-600 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Location detected successfully!</span>
                    </div>
                )}
            </div>
        </div>
    );
}
