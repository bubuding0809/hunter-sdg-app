import * as Location from "expo-location";
import { createContext, useContext, useEffect, useState } from "react";

type LocationContextState = {
  location: Location.LocationObject | null | undefined;
  heading: Location.LocationHeadingObject | null | undefined;
};

const LocationContext = createContext<LocationContextState>({
  location: undefined,
  heading: undefined,
});

const LocationProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [location, setLocation] = useState<
    Location.LocationObject | null | undefined
  >(undefined);

  const [heading, setHeading] = useState<
    Location.LocationHeadingObject | null | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const { status, granted } =
        await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        console.log("Permission to access location: ", status);
        return;
      }

      console.log("Permission to access location: ", status);
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        location => {
          setLocation(location);
        }
      );

      await Location.watchHeadingAsync(heading => {
        setHeading(heading);
      });
    })();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        heading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return {
    location: context.location,
    locationLoading: context.location === undefined,
    heading: context.heading,
    headingLoading: context.heading === undefined,
  };
};

export { LocationProvider, useLocation };
