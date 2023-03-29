import { Dimensions, StyleSheet, Image } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  MapCircle,
  Polyline,
  Circle,
  Heatmap,
} from "react-native-maps";
import { useLocation } from "../../context/LocationContext";
import { Box, Button, Center, Fab, Flex, Icon, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import { faker } from "@faker-js/faker";

// Initialize map settings
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 1.353075102394308,
  longitude: 103.75781245624543,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

interface BountyMapProps {
  bountyData: BountyQueryType;
  hunterLocations: {
    [key: string]: {
      heading?: number;
      lat: number;
      long: number;
    };
  };
  children?: React.ReactNode;
}
const BountyMap: React.FC<BountyMapProps> = ({
  children,
  hunterLocations,
  bountyData,
}) => {
  // session data
  const { data: sessionData } = useFirebaseSession();
  // Ref to map to access methods
  const mapRef = useRef<MapView>(null);

  // state to track user location
  const {
    location: currLocation,
    locationLoading: currLocationLoading,
    heading: currHeading,
  } = useLocation();

  // Move to current location on load
  useEffect(
    () =>
      currLocation &&
      void moveTo({
        latitude: currLocation.coords.latitude,
        longitude: currLocation.coords.longitude,
      }),
    []
  );

  // Callback to move map to a location
  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      camera.zoom = 18;
      mapRef.current?.animateCamera(camera, { duration: 500 });
    }
  };

  const heatMapPoints = useMemo(() => {
    return Array.from({ length: 5 })
      .map(() => {
        const [latitude, longitude] = faker.address.nearbyGPSCoordinate(
          [bountyData.location.latitude, bountyData.location.longitude],
          0.5,
          true
        );
        return Array.from({
          length: faker.datatype.number({
            min: 1000,
            max: 5000,
          }),
        }).map(() => {
          const point = faker.address.nearbyGPSCoordinate(
            [parseFloat(latitude), parseFloat(longitude)],
            0.1,
            true
          );

          return {
            latitude: parseFloat(point[0]),
            longitude: parseFloat(point[1]),
          };
        });
      })
      .flat();
  }, [bountyData]);

  return (
    <Box display="relative">
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {/* Display current location if able to get from user */}
        {currLocation && (
          <Marker
            coordinate={{
              latitude: currLocation.coords.latitude,
              longitude: currLocation.coords.longitude,
            }}
          >
            <Image
              source={require("../../assets/map_hunter.png")}
              style={{
                backgroundColor: "white",
                borderRadius: 100,
                height: 35,
                width: 35,
                // rotate image based on heading
                transform: [
                  {
                    rotate: `${currHeading?.magHeading ?? 0}deg`,
                  },
                ],
              }}
            />
          </Marker>
        )}

        {/* Display bounty location */}
        {bountyData.location && (
          <>
            <Marker
              coordinate={{
                latitude: bountyData.location.latitude,
                longitude: bountyData.location.longitude,
              }}
            >
              <Center>
                <Image
                  source={{
                    uri: bountyData.images[0],
                  }}
                  style={{
                    // center the image on the marker
                    backgroundColor: "white",
                    borderRadius: 100,
                    height: 40,
                    width: 40,
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                />
                <Text fontFamily="Inter_500Medium">{bountyData.name}</Text>
              </Center>
            </Marker>
            <Circle
              center={{
                latitude: bountyData.location.latitude,
                longitude: bountyData.location.longitude,
              }}
              radius={bountyData.radius}
              fillColor="rgba(0, 0, 255, 0.1)"
              strokeColor="rgba(0, 0, 255, 0.5)"
            />
          </>
        )}

        {/* Display hunter locations */}
        {hunterLocations &&
          Object.entries(hunterLocations)
            .filter(([hunterId, _]) => hunterId !== sessionData?.uid)
            .map(([hunterId, hunterInfo]) => (
              <Marker
                key={hunterId}
                coordinate={{
                  latitude: hunterInfo.lat,
                  longitude: hunterInfo.long,
                }}
                onPress={() => {
                  alert("Hunter location pressed");
                }}
              >
                <Image
                  source={require("../../assets/map_other_hunter.png")}
                  style={{
                    backgroundColor: "white",
                    height: 35,
                    width: 35,
                    borderRadius: 100,
                    borderWidth: 2,
                    // rotate image based on heading
                    transform: [
                      {
                        rotate: `${hunterInfo?.heading ?? 0}deg`,
                      },
                    ],
                  }}
                />
              </Marker>
            ))}

        {/* Display a heatmap */}
        <Heatmap
          points={heatMapPoints}
          opacity={1}
          radius={50}
          gradient={{
            colorMapSize: 100,
            colors: ["#0000ff", "#00ffff", "#00ff00", "#ffff00", "#ff0000"],
            startPoints: [0.2, 0.4, 0.6, 0.8, 1],
          }}
        />
      </MapView>
      {children}

      {/* Move to current location floating action button */}
      <Fab
        renderInPortal={false}
        shadow={2}
        bgColor="black"
        size={12}
        icon={
          <Icon
            color="white"
            as={MaterialCommunityIcons}
            name="crosshairs-gps"
            size="md"
          />
        }
        onPress={() => {
          currLocation &&
            void moveTo({
              latitude: currLocation.coords.latitude,
              longitude: currLocation.coords.longitude,
            });
        }}
      />
    </Box>
  );
};

export default BountyMap;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    // height should be dimensions of window minus height of expo tap bar
    height: Dimensions.get("window").height - 170,
  },
});
