import { createContext, useState } from 'react';

import * as Location from 'expo-location';

export const CurrentLocationContext = createContext();

export const CurrentLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Los Angeles, CA');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let city = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      // setLocation(city);
      setLocation(`${city[0].city}, ${city[0].region}`);
    })();
  }, []);

  return (
    <CurrentLocationContext.Provider value={{ location }}>
      {children}
    </CurrentLocationContext.Provider>
  );
};
