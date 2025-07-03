import { useState } from "react";

export default function useDetectLocation(cities, onLocationSelect) {
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectedLocation, setDetectedLocation] = useState(null);

    const detectLocation = () => {
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
                let message = "Unable to detect location.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = "Location access denied.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = "Location unavailable.";
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

    return { isDetecting, detectedLocation, detectLocation };
}
