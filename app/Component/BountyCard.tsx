import React, { useState, FunctionComponent, Fragment } from "react";
import { Center, Pressable, VStack, Container, Row } from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import {
  StyleSheet,
  FlatList,
  Modal,
  View,
  Text,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import ToggleSwitch from "./ToggleSwitch";
import moment from "moment";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";
import * as Location from "expo-location";
import { GeoPoint } from "firebase/firestore";
import { LatLng } from "react-native-maps";



const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CarouselRenderItems = ({
  SingularPicture,
}: {
  SingularPicture: string;
}) => {
  return (
    <TouchableOpacity onPress={() => console.log(SingularPicture)}>
      <Image style={styles.carousel_photos} source={{ uri: SingularPicture }} />
    </TouchableOpacity>
  );
};

function Carousel({ data }: { data: BountyQueryType }) {
  // let flatListRef = useRef<FlatList | null>();
  return (
    <Container style={styles.carousel_box}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        data={data.images} //list of strings
        renderItem={({ item: image }) => {
          return <CarouselRenderItems SingularPicture={image} />;
        }}
      />
    </Container>
  );
}
type BountyCardProp = {
  changeModalVisible: (bool: boolean) => void;
  bountyData: BountyQueryType;
};

function BountyCard({ changeModalVisible, bountyData }: BountyCardProp) {
  const [IsDesc, setIsDesc] = useState(true);

  const switchfunction = (val) => {
    {
      val == 1 ? setIsDesc(true) : setIsDesc(false);
    }
  };

  const getAddress = async (location: LatLng) => {
    const info = await Location.reverseGeocodeAsync(location);
    return info[0].name;
  };

  const [reverseAddress, setReverseAddress] = useState("");

  React.useEffect(() => {
    const reverseGeocodeBountyLocation = async () => {
      if (bountyData) {
        const geoLocation = {
          latitude: bountyData.location.latitude,
          longitude: bountyData.location.longitude,
        };

        const address = await getAddress(geoLocation);
        setReverseAddress(address);
      }
    };

    reverseGeocodeBountyLocation();
  }, [bountyData]);

  return (
    <SafeAreaView style={styles.topbox} edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      <Container style={styles.picturebox}>
        <View style={{ position: "absolute", left: 10, top: 40 }}>
          <Button
            title="BACK"
            color="white"
            onPress={() => changeModalVisible(false)}
          ></Button>
        </View>
        <View
          style={{
            backgroundColor: "#E5E5E5",
            height: "40%",
            width: "100%",
            top: "60%",
            position: "absolute",
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 30 }}>
              {" "}
              {bountyData.name}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                margin: 5,
              }}
            >
              {" "}
              Posted{" "}
              {moment(bountyData.createdAt.toDate(), "MMDDYYYY").fromNow()}{" "}
            </Text>
          </View>
        </View>
        <Container style={styles.imagebox}>
          <Image
            style={styles.profilePhoto}
            source={{ uri: bountyData.images[0] }}
          />
        </Container>
      </Container>
      <Container style={styles.togglebox}>
        <ToggleSwitch
          selectionMode={1}
          option1="DESCRIPTION"
          option2={"PHOTOS"}
          onSelectSwitch={switchfunction}
          selectionColor={"#000000"}
        />
      </Container>
      <Container style={styles.bottombox}>
        {IsDesc ? (
          <Container style={styles.description_box}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                backgroundColor: "white",
                paddingHorizontal: 5,
                marginTop: 20,
                paddingRight: 100,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontWeight: "bold" }}> Age: </Text>
                <Text> {bountyData.age}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ fontWeight: "bold" }}> Gender: </Text>
                <Text>{bountyData.gender}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  backgroundColor: "white",
                  paddingLeft: 5,
                }}
              >
                <Text style={{ fontFamily:"Inter_700Bold" }}> Last Seen Time: </Text>
                <Text style={{ fontFamily:"Inter_400Regular" }}> {bountyData.lastSeen.toDate().toDateString()} </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  backgroundColor: "white",
                  paddingLeft: 5,
                }}
              >
                <Text style={{ fontFamily:"Inter_700Bold" }}>
                  {" "}
                  Last Seen Location:{" "}
                </Text>
                <Text style={{ fontFamily:"Inter_400Regular" }}>{reverseAddress}</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  paddingLeft: 5,
                }}
              >
                <Text style={{ fontFamily:"Inter_700Bold" }}> Appearance:</Text>
                <Text
                  style={{
                    paddingLeft: 5,
                    textAlign: "justify",
                    paddingRight: 10,
                    fontFamily:"Inter_400Regular"
                  }}
                >
                  {bountyData.appearance}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  paddingLeft: 5,
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontFamily:"Inter_700Bold" }}>
                  {" "}
                  Additional Information
                </Text>
                <Text
                  style={{
                    paddingLeft: 5,
                    textAlign: "justify",
                    paddingRight: 10,
                    fontFamily:"Inter_400Regular"
                  }}
                >
                  {bountyData.additionalInfo}
                </Text>
              </View>
              </View>
            </Container>
          ) : (
            //add carousell function here
            <Carousel data={bountyData} />
          )}
        </Container>
        <Container style={styles.buttonbox}>
          <View>
            <Button
              title="HUNT"
              color="black"
              onPress={() => changeModalVisible(false)}
            ></Button>
          </View>
        </Container>
      </SafeAreaView>
    )
  
}

const styles = StyleSheet.create({
  topbox: {
    paddingVertical: 0,
    maxHeight: "100%",
    flex: 1,
    display: "flex",
    maxWidth: WIDTH,
  },
  picturebox: {
    maxWidth: "100%",
    flex: 4,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  imagebox: {
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 100,
    //paddingTop:70,
    marginTop: 30,
  },
  profilePhoto: {
    height: 150,
    aspectRatio: 1,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "white",
    paddingTop: 30,
  },
  togglebox: {
    maxWidth: "100%",
    flex: 1,
    width: WIDTH,
    position: "relative",
    backgroundColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottombox: {
    maxWidth: "100%",
    width: "100%",
    flex: 5,
    position: "relative",
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    // borderColor:"red",
    // borderWidth:1,
  },
  description_box: {
    backgroundColor: "white",
    height: "95%",
    width: "100%",
    borderRadius: 20,
    justifyContent: "space-between",
    paddingHorizontal: 3,
    // borderColor:"red",
    // borderWidth:1
  },
  buttonbox: {
    maxWidth: "100%",
    flex: 1.5,
    position: "relative",
    backgroundColor: "#E5E5E5",
    borderColor: "red",
    flexDirection: "row",
    justifyContent: "center",
  },
  carousel_box: {
    height: "85%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  carousel_photos: {
    height: "100%",
    aspectRatio: 1,
    //marginRight:30
  },
});

export default BountyCard;
