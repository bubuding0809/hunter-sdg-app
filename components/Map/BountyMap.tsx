import { Dimensions, StyleSheet } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MapView, {
  PROVIDER_GOOGLE,
  LatLng,
  Marker,
  Circle,
  Heatmap,
} from "react-native-maps";
import { useLocation } from "../../context/LocationContext";
import {
  Box,
  Button,
  Center,
  Fab,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  Image,
  Pressable,
} from "native-base";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import { Faker, faker } from "@faker-js/faker";
import BottomSheet from "@gorhom/bottom-sheet";
import { formatDate, getDistance } from "../../utils/scripts/helpers";
import { useRouter, Link } from "expo-router";

const PROFILE_IMAGE =
  "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80";

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
  const router = useRouter();
  // session data
  const { data: sessionData } = useFirebaseSession();

  // Ref to map to access methods
  const mapRef = useRef<MapView>(null);

  // Ref to bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ["6%", "30%", "60%"], []);

  // State to hold address of bounty location
  const [bountyAddress, setBountyAddress] = useState("");

  // state to track user location
  const {
    location: currLocation,
    locationLoading: currLocationLoading,
    heading: currHeading,
  } = useLocation();

  // Effect to get geo decoded address of bounty location
  useEffect(() => {
    if (bountyData) {
      (async () => {
        const { latitude, longitude } = bountyData.location;
        const address = await Location.reverseGeocodeAsync({
          latitude: latitude,
          longitude: longitude,
        });
        setBountyAddress(address[0].name);
      })();
    }
  }, [bountyData]);

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

  // // Mock heat map data
  // const heatMapPoints = useMemo(() => {
  //   return Array.from({ length: 5 })
  //     .map(() => {
  //       const [latitude, longitude] = faker.address.nearbyGPSCoordinate(
  //         [bountyData.location.latitude, bountyData.location.longitude],
  //         0.5,
  //         true
  //       );
  //       return Array.from({
  //         length: faker.datatype.number({
  //           min: 1000,
  //           max: 5000,
  //         }),
  //       }).map(() => {
  //         const point = faker.address.nearbyGPSCoordinate(
  //           [parseFloat(latitude), parseFloat(longitude)],
  //           0.1,
  //           true
  //         );

  //         return {
  //           latitude: parseFloat(point[0]),
  //           longitude: parseFloat(point[1]),
  //         };
  //       });
  //     })
  //     .flat();
  // }, [bountyData]);

  // Format distance to bounty
  const distanceToBountyKm = useMemo(() => {
    if (currLocation && bountyData.location) {
      const pointOrigin: LatLng = {
        latitude: currLocation.coords.latitude,
        longitude: currLocation.coords.longitude,
      };

      const pointDestination: LatLng = {
        latitude: bountyData.location.latitude,
        longitude: bountyData.location.longitude,
      };

      return (getDistance(pointOrigin, pointDestination) / 1000).toFixed(2);
    }
  }, []);

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
              alt="hunter"
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
                alt="Bounty image"
              />
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
                  alt={"Other hunter"}
                />
              </Marker>
            ))}

        {/* Display a heatmap */}
        {/* <Heatmap
          points={heatMapPoints}
          opacity={1}
          radius={50}
          gradient={{
            colorMapSize: 100,
            colors: ["#0000ff", "#00ffff", "#00ff00", "#ffff00", "#ff0000"],
            startPoints: [0.2, 0.4, 0.6, 0.8, 1],
          }}
        /> */}
      </MapView>

      {children}

      {/* Bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        bottomInset={30}
        detached={true}
        style={{
          marginHorizontal: 10,
        }}
        backgroundStyle={{
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
        }}
      >
        <VStack flex={1} flexDirection={"column"} borderRadius={30}>
          {/* Bounty information */}
          <VStack pb={2} px={8}>
            <Text
              fontFamily={"Inter_600SemiBold"}
              fontSize="20px"
              lineHeight={"19.36px"}
              mt={2}
              pb={4}
            >
              {bountyData.name}
            </Text>

            {/* Section 1 */}
            <HStack alignItems="flex-start" justifyContent="space-between">
              <HStack>
                <Icon
                  as={MaterialCommunityIcons}
                  name="clock-outline"
                  size={"xl"}
                  color="black"
                />
                <VStack ml={4} mt={1.5}>
                  <Text
                    fontFamily={"Inter_200ExtraLight"}
                    fontSize={"12px"}
                    lineHeight={"14.52px"}
                  >
                    Last seen time
                  </Text>
                  <Text
                    fontFamily={"Inter_500Medium"}
                    fontSize="16px"
                    lineHeight={"19.36px"}
                    mt={2}
                  >
                    {formatDate(bountyData.lastSeen.toDate())}
                  </Text>
                  {/* Find distance between currlocation and bountyLocation */}
                  {currLocation && (
                    <Text
                      fontFamily={"Inter_200ExtraLight"}
                      fontSize={"12px"}
                      lineHeight={"14.52px"}
                      mt={2}
                    >
                      {distanceToBountyKm}
                      km away
                    </Text>
                  )}
                </VStack>
              </HStack>

              {/* Pressable bounty image that moves center to location when pressed */}
              <Pressable
                onPress={() => {
                  bountyData.location &&
                    moveTo({
                      latitude: bountyData.location.latitude,
                      longitude: bountyData.location.longitude,
                    });
                }}
                _pressed={{
                  opacity: 0.5,
                }}
              >
                <Image
                  source={{
                    uri: bountyData.images[0],
                  }}
                  alt={bountyData.name}
                  borderRadius="full"
                  width="81px"
                  height="81px"
                />
              </Pressable>
            </HStack>

            {/* Section 2 */}
            <HStack alignItems="flex-start" mt={2}>
              <HStack>
                <Icon
                  as={MaterialCommunityIcons}
                  name="crosshairs"
                  size={"xl"}
                  color="black"
                />
                <VStack ml={4} mt={1.5}>
                  <Text
                    fontFamily={"Inter_200ExtraLight"}
                    fontSize={"12px"}
                    lineHeight={"14.52px"}
                  >
                    Last seen address
                  </Text>
                  <Text
                    fontFamily={"Inter_500Medium"}
                    fontSize="16px"
                    lineHeight={"19.36px"}
                    mt={2}
                  >
                    {bountyAddress}
                  </Text>
                </VStack>
              </HStack>
            </HStack>

            <VStack position="absolute" top={"72px"} left={"44px"} space={1}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Box
                  key={i}
                  height={2}
                  width={1}
                  bgColor="#FFCB40"
                  borderRadius={10}
                />
              ))}
            </VStack>
          </VStack>

          {/* Meta information */}
          <HStack py={6} px={8} justifyContent="space-between">
            <HStack>
              <Image
                source={{
                  uri: PROFILE_IMAGE,
                }}
                width="55px"
                height="55px"
                borderRadius="xl"
                alt={bountyData.name}
              />
              <VStack ml={4} justifyContent="center">
                <Text
                  fontFamily={"Inter_500Medium"}
                  fontSize="16px"
                  lineHeight={"19.36px"}
                >
                  Xueting
                </Text>
                <Text
                  fontFamily={"Inter_200ExtraLight"}
                  fontSize={"12px"}
                  lineHeight={"14.52px"}
                  mt={2}
                >
                  Daughter
                </Text>
              </VStack>
            </HStack>
            <Button
              bgColor="black"
              borderRadius="2xl"
              width="55px"
              height="55px"
              _pressed={{
                bgColor: "gray.800",
              }}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="phone"
                size={"xl"}
                color="white"
              />
            </Button>
          </HStack>

          {/* Live updates button */}
          <Button
            flex={1}
            bgColor="black"
            borderTopRadius={0}
            borderBottomRadius={30}
            _text={{
              fontFamily: "Inter_500Medium",
              fontSize: "xl",
              color: "white",
            }}
            _pressed={{
              bgColor: "gray.800",
            }}
            onPress={() => {
              router.push({
                pathname: `/bountyForum/${bountyData.id}`,
                params: {
                  bountyName: bountyData.name,
                },
              });
            }}
          >
            Live Updates
          </Button>
        </VStack>
        {/* Move to current location floating action button */}
        <Fab
          isLoading={currLocationLoading}
          renderInPortal={false}
          shadow={2}
          bgColor="black"
          size={12}
          position="absolute"
          top={-80}
          right={0}
          icon={
            <Icon
              color="white"
              as={MaterialCommunityIcons}
              name="crosshairs-gps"
              size="md"
            />
          }
          _pressed={{
            bgColor: "gray.800",
          }}
          onPress={() => {
            currLocation &&
              void moveTo({
                latitude: currLocation.coords.latitude,
                longitude: currLocation.coords.longitude,
              });
          }}
        />
      </BottomSheet>
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
