import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { usePathname } from "expo-router";
import { Button, Flex } from "native-base";
import useCreateBounty from "../../utils/scripts/hooks/mutations/useCreateBounty";
import { generateBounty } from "../../utils/scripts/generateFakeData";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

const TabLayout = () => {
  const pathName = usePathname();
  const { data: sessionData, isLoading: sessionLoading } = useFirebaseSession();
  const { mutate: createBounty } = useCreateBounty();

  // * Call back to add a test bounty
  const handleAddTestBounty = () => {
    // First generate a random bounty
    const randomBounty = generateBounty({
      clientId: sessionData.uid,
    });

    // Then call the createBounty mutation to add it to the database
    createBounty({
      client: sessionData.uid,
      name: randomBounty.name,
      age: randomBounty.age,
      gender: randomBounty.gender,
      category: randomBounty.category,
      breed: randomBounty.breed,
      lastSeen: randomBounty.lastSeen,
      location: randomBounty.location,
      appearance: randomBounty.appearance,
      additionalInfo: randomBounty.additionalInfo,
      images: randomBounty.images,
    });
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          // Do not show header for this route
          header: () => null,
          title: "Profile",
          tabBarIcon: () => {
            // q: gives me shades of light blacks
            const color = pathName === "/profile" ? "#FD7366" : "#252525";
            return <TabBarIcon name="user" color={color} size={24} />;
          },
          tabBarLabelStyle: {
            color: pathName === "/profile" ? "#FD7366" : "#252525",
          },
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          // Do not show header for this route
          headerLeft: () => (
            <Button ml={2} height={10} onPress={handleAddTestBounty}>
              Add
            </Button>
          ),
          title: "Temporary utility bar",
          tabBarIcon: () => {
            const color = pathName === "/" ? "#FD7366" : "#252525";
            return <TabBarIcon name="map" color={color} size={24} />;
          },
          // style tab bar title
          tabBarLabelStyle: {
            color: pathName === "/" ? "#FD7366" : "#252525",
          },
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          // Do not show header for this route
          header: () => null,
          title: "Activity",
          tabBarIcon: () => {
            const color = pathName === "/activity" ? "#FD7366" : "#252525";
            return <TabBarIcon name="delicious" color={color} size={24} />;
          },
          tabBarLabelStyle: {
            color: pathName === "/activity" ? "#FD7366" : "#252525",
          },
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
