import { useState } from "react";
import { MapPin, Loader2, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CitySelector from "./CitySelector";

export default function LocationSelector({
                                             onLocationSelect,
                                             selectedCityId,
                                             className = ""
                                         }) {
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectedLocation, setDetectedLocation] = useState(null);

    const { data: cities = [], isLoading } = useQuery({
        queryKey: ["/api/cities"],
        queryFn: async () => {
            const res = await fetch("/api/cities");
            if (!res.ok) throw new Error("Failed to fetch cities");
            return res.json();
        },
    });

    const handleLocationDetection = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by this browser.");
            return;
        }

        setIsDetecting(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setDetectedLocation({ lat: latitude, lng: longitude });

                if (cities.length > 0) {
                    let nearestCity = cities[0];
                    let minDistance = Number.MAX_VALUE;

                    cities.forEach((city) => {
                        if (city.latitude && city.longitude) {
                            const distance = Math.sqrt(
                                Math.pow(parseFloat(city.latitude) - latitude, 2) +
                                Math.pow(parseFloat(city.longitude) - longitude, 2)
                            );
                            if (distance < minDistance) {
                                minDistance = distance;
                                nearestCity = city;
                            }
                        }
                    });

                    onLocationSelect?.({
                        cityId: nearestCity.id.toString(),
                        coordinates: { lat: latitude, lng: longitude }
                    });
                }

                setIsDetecting(false);
            },
            (error) => {
                console.error("Location error:", error);
                let message = "Unable to detect location. Please select manually.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = "Location access denied. Please select manually.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = "Location unavailable. Please select manually.";
                        break;
                    case error.TIMEOUT:
                        message = "Location request timed out.";
                        break;
                }
                alert(message);
                setIsDetecting(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    };

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
                        onClick={handleLocationDetection}
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
