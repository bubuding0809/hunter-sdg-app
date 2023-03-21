import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  MapCircle,
  Polyline,
} from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import InputAutocomplete from "./InputAutocomplete";
import { Box, Button, Heading, HStack, Icon, Fab, Spinner } from "native-base";
import * as Location from "expo-location";
import { useLocation } from "../../context/LocationContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
}

// Initialize map settings
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 1.353075102394308, // Some US location
  longitude: 103.75781245624543,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const MapSelect: React.FC<MapSelectProps> = ({
  setOpen,
  setLocation,
  setRadius,
}) => {
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const mapRef = useRef<MapView>(null);

  const [onChangeValue, setOnChangeValue] = useState(200);
  const [decodedAddress, setDecodedAddress] = useState<string | null>(null);
  const { location, locationLoading, heading } = useLocation();

  console.log("heading", heading);

  // Move to current location on load
  useEffect(
    () =>
      location &&
      void moveTo({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }),
    []
  );

  // Callback to move map to a location
  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      camera.zoom = 15;
      mapRef.current?.animateCamera(camera, { duration: 500 });
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
    <Box style={styles.container}>
      {/* Mapview */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        onLongPress={({ nativeEvent }) => {
          // Set origin location and move to it
          setLocation(nativeEvent.coordinate);
          handlePlaceSelected(nativeEvent.coordinate);

          // Reverse geocode to get address
          let geoDecodedAddress: undefined | Location.LocationGeocodedAddress;
          reverseGeocode(nativeEvent.coordinate)
            .then(address => {
              // Set Decoded address
              geoDecodedAddress = address[0];

              // if decoding is successful, set decoded address
              geoDecodedAddress && setDecodedAddress(geoDecodedAddress.name);
            })
            .catch(err => {
              console.log(err);
            });
        }}
      >
        {/* Display target location if selected */}
        {origin && (
          <>
            <Marker coordinate={origin} pinColor="green" />
            <MapCircle
              center={{
                latitude: origin?.latitude ?? 0,
                longitude: origin?.longitude ?? 0,
              }}
              radius={onChangeValue}
              fillColor="rgba(255, 0, 0, 0.2)"
              strokeColor="rgba(255, 0, 0, 0.5)"
            />
          </>
        )}

        {/* Display current location if able to get from user */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}

        {/* Display heading if able to get from user */}
        {heading && (
          <Polyline
            coordinates={[
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              {
                latitude:
                  location.coords.latitude +
                  Math.cos((heading.trueHeading * Math.PI) / 180) * 0.0005,
                longitude:
                  location.coords.longitude +
                  Math.sin((heading.trueHeading * Math.PI) / 180) * 0.0005,
              },
            ]}
            strokeColor="red"
            strokeWidth={2}
          />
        )}
        {/* Display heading if able to get from user */}
        {heading && (
          <Polyline
            coordinates={[
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              {
                latitude:
                  location.coords.latitude +
                  Math.cos((heading.trueHeading * Math.PI) / 180 + 20) * 0.0004,
                longitude:
                  location.coords.longitude +
                  Math.sin((heading.trueHeading * Math.PI) / 180 + 20) * 0.0004,
              },
            ]}
            strokeColor="red"
            strokeWidth={2}
          />
        )}
      </MapView>

      {/* Location search container */}
      <Box style={styles.searchContainer}>
        {/* Google Maps Search Autocomplete input */}
        <InputAutocomplete
          label="Location"
          placeholder="Search for a location"
          onPlaceSelected={details => {
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
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            width="70%"
            onPress={() => {
              setOpen(false);
            }}
          >
            Select Location
          </Button>
          <Button
            width="28%"
            opacity={0.8}
            colorScheme="secondary"
            onPress={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </Box>

        {/* Loading indicator */}
        {locationLoading && (
          <HStack space={2} justifyContent="center" p={2}>
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Loading current location
            </Heading>
          </HStack>
        )}
      </Box>

      {/* Move to current location floating action button */}
      <Fab
        renderInPortal={false}
        shadow={2}
        bgColor="black"
        icon={
          <Icon
            color="white"
            as={MaterialCommunityIcons}
            name="crosshairs-gps"
            size="md"
          />
        }
        onPress={() => {
          location &&
            void moveTo({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
        }}
      />
    </Box>
  );
};

export default MapSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
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
    top: 0,
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
