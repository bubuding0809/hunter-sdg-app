import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  MapCircle,
} from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import InputAutocomplete from "./InputAutocomplete";
import { Button, Heading, HStack, Slider, Spinner } from "native-base";

import * as Location from "expo-location";

// https://docs.expo.dev/versions/latest/sdk/map-view/
// https://www.npmjs.com/package/react-native-google-places-autocomplete
// https://www.npmjs.com/package/react-native-maps-directions

interface MapSelectProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  externalStyles?: ViewStyle;
  decodedAddress?: string;
  setDecodedAddress: React.Dispatch<React.SetStateAction<string>>;
}

// Initialize map settings
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 40.76711, // Some US location
  longitude: -73.979704, // Some US location
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const MapSelect: React.FC<MapSelectProps> = ({
  setOpen,
  setLocation,
  setRadius,
  externalStyles,
  decodedAddress,
  setDecodedAddress,
}) => {
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const mapRef = useRef<MapView>(null);

  const [onChangeValue, setOnChangeValue] = useState(200);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);

  // Effect to get user location
  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Show loading indicator for user location
      setLoadingUserLocation(true);

      // Get user location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Hide loading indicator for user location
      setLoadingUserLocation(false);

      // If location is found, move to it
      location &&
        moveTo({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocationPermission();
  }, []);

  // Callback to move map to a location
  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  // Callback to handle place selected action from map or autocomplete
  const handlePlaceSelected = (position: LatLng | null) => {
    // setOrigin location and move to it
    setOrigin(position);
    position && moveTo(position);
  };

  // Reverse geocode to get address
  const reverseGeocode = async (position: LatLng) => {
    return await Location.reverseGeocodeAsync(position);
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
        }}
      >
        {/* Mapview */}
        <MapView
          ref={mapRef}
          style={{
            ...styles.map,
            zIndex: 100,
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_POSITION}
          onLongPress={({ nativeEvent }) => {
            // Set origin location and move to it
            setLocation(nativeEvent.coordinate);
            handlePlaceSelected(nativeEvent.coordinate);

            // Reverse geocode to get address;
            reverseGeocode(nativeEvent.coordinate)
              .then((address) => {
                // Set Decoded address
                const geoDecodedAddress = address[0];

                // if decoding is successful, set decoded address
                geoDecodedAddress && setDecodedAddress(geoDecodedAddress.name);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          {/* Display target location if selected */}
          {origin && <Marker coordinate={origin} pinColor="green" />}

          {/* Display current location if able to get from user */}
          {userLocation && <Marker coordinate={userLocation} />}

          {/* Display radius circle */}
        </MapView>

        {/* Location search container */}
        <View
          style={{
            position: "absolute",
            width: "90%",
            backgroundColor: "white",
            shadowColor: "black",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 4,
            padding: 8,
            borderRadius: 8,
            left: "50%",
            transform: [{ translateX: -width * 0.45 }],
            top: 20,
            zIndex: 200,
          }}
        >
          {/* Google Maps Search Autocomplete input */}
          <InputAutocomplete
            label="" // It needs a label. But we don't want to show it
            placeholder="Search for a location"
            onPlaceSelected={(details) => {
              setLocation({
                latitude: details?.geometry.location.lat ?? 0,
                longitude: details?.geometry.location.lng ?? 0,
              });
              handlePlaceSelected({
                latitude: details?.geometry.location.lat ?? 0,
                longitude: details?.geometry.location.lng ?? 0,
              });
            }}
            decodedAddress={decodedAddress}
          />
          {/* Action buttons */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              marginTop={2}
              padding={3}
              width="70%"
              fontFamily={"Inter_500Medium"}
              fontSize={16}
              onPress={() => {
                setLocation(origin || { latitude: 0, longitude: 0 });
                setOpen(false);
              }}
              style={{ backgroundColor: "black", borderRadius: 20 }}
              _text={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
              }}
            >
              Select Location
            </Button>

            <Button
              marginTop={2}
              width="28%"
              opacity={0.8}
              colorScheme="red"
              variant="ghost"
              onPress={() => {
                setOpen(false);
              }}
              _text={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
              }}
            >
              Cancel
            </Button>
          </View>

          {/* Loading indicator */}
          {loadingUserLocation && (
            <HStack space={2} justifyContent="center" p={2}>
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color="primary.500" fontSize="md">
                Loading current location
              </Heading>
            </HStack>
          )}
          {/* Error message */}
          {errorMsg && (
            <Text style={{ color: "red" }}>
              Error getting current location: {errorMsg}
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default MapSelect;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
  },
});
