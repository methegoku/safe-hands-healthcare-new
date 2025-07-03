import { useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function CitySelector({
                                         value,
                                         onValueChange,
                                         placeholder = "Select City",
                                         className = ""
                                     }) {
    const [isDetecting, setIsDetecting] = useState(false);

    const { data: cities = [], isLoading } = useQuery({
        queryKey: ["/api/cities"],
        queryFn: async () => {
            const res = await fetch("/api/cities");
            if (!res.ok) {
                throw new Error("Failed to fetch cities");
            }
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

                // Placeholder logic – select first city if available
                if (cities.length > 0 && onValueChange) {
                    onValueChange(cities[0].id.toString());
                }

                setIsDetecting(false);
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Unable to detect your location. Please select your city manually.");
                setIsDetecting(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        );
    };

    if (isLoading) {
        return (
            <div className={`flex items-center space-x-2 ${className}`}>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-600">Loading cities...</span>
            </div>
        );
    }

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <select
                value={value}
                onChange={(e) => onValueChange && onValueChange(e.target.value)}
                className="min-w-[150px] p-2 border rounded text-sm"
            >
                <option value="">{placeholder}</option>
                {cities.map((city) => (
                    <option key={city.id} value={city.id.toString()}>
                        {city.name}, {city.state}
                    </option>
                ))}
            </select>

            <button
                onClick={handleLocationDetection}
                disabled={isDetecting}
                className="flex items-center gap-1 px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
            >
                {isDetecting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <MapPin className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
          {isDetecting ? "Detecting..." : "Use Location"}
        </span>
            </button>
        </div>
    );
}
