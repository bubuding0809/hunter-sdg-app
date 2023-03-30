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
import ToggleSwitch from "../Component/ToggleSwitch";
import type { StatusBarStyle } from "react-native";
import useJoinBounty from "../../utils/scripts/hooks/mutations/useJoinBounty";
import useGetUser, {
  UserQueryType,
} from "../../utils/scripts/hooks/queries/useGetUser";
import { LatLng } from "react-native-maps";
import * as Location from "expo-location";

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
  const router = useRouter();
  const [IsDesc, setIsDesc] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { mutate: joinBounty } = useJoinBounty();
  const { data: sessionData, isLoading } = useFirebaseSession();
  const { data: userData, refetch } = useGetUser({ userId: sessionData.uid });
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
      <StatusBar barStyle="dark-content" />

      <Container style={styles.picturebox}>
        <View
          style={{
            backgroundColor: "#E5E5E5",
            height: "50%",
            width: "100%",
            top: "50%",
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
              Ng Jun Long
            </Text>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                margin: 5,
              }}
            >
              {" "}
              Family: Ng{" "}
            </Text>
          </View>
        </View>
        <Container style={styles.imagebox}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: "/Users/junlongng/Desktop/ReactNative Learning/bitebuddies-react-app/assets/JL_photo.png",
            }}
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
                <Text> 25 </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ fontWeight: "bold" }}> Gender: </Text>
                <Text>Male</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: "white",
                paddingLeft: 5,
              }}
            >
              <Text style={{ fontWeight: "bold" }}> Posted Date Time: </Text>
              <Text> 28 Mar 23: 21:58 </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: "white",
                paddingLeft: 5,
              }}
            >
              <Text style={{ fontWeight: "bold" }}> Last Seen Location: </Text>
              <Text> 48 Hillview Ave</Text>
            </View>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                paddingLeft: 5,
              }}
            >
              <Text style={{ fontWeight: "bold" }}> Bounty Appearance:</Text>
              <Text
                style={{
                  paddingLeft: 5,
                  textAlign: "justify",
                  paddingRight: 10,
                }}
              >
                Old Asian Man
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
              <Text style={{ fontWeight: "bold" }}>
                {" "}
                Additional Information
              </Text>
              <Text
                style={{
                  paddingLeft: 5,
                  textAlign: "justify",
                  paddingRight: 10,
                }}
              >
                My grandfather might be
              </Text>
            </View>
          </Container>
        ) : (
          //add carousell function here
          <Text> Hello There </Text>
        )}
      </Container>
      <Container style={styles.buttonbox}>
        <Pressable>
          <View
            style={{
              borderRadius: 40,
              backgroundColor: "black",
              alignItems: "center",
              width: WIDTH * 0.8,
              padding: 18,
              top: "10%",
            }}
          >
            <Link
              href="bountyForm"
              style={{
                color: "white",
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                alignItems: "center",
                //backgroundColor:"black"
              }}
            >
              NEW BOUNTY
            </Link>
          </View>
        </Pressable>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topbox: {
    paddingVertical: 0,
    maxHeight: "100%",
    flex: 1,
    display: "flex",
    maxWidth: WIDTH,
    backgroundColor: "red",
  },
  picturebox: {
    maxWidth: "100%",
    flex: 4,
    backgroundColor: "black",
    alignItems: "center",
    // paddingTop: -40
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
