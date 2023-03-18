import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { usePathname } from "expo-router";

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

export default function TabLayout() {
  const pathName = usePathname();
  const { data: sessionData, isLoading: sessionLoading } = useFirebaseSession();

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
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          // Do not show header for this route
          header: () => null,
          title: "Feed",
          tabBarIcon: () => {
            const color = pathName === "/" ? "#FD7366" : "#252525";
            return <TabBarIcon name="map-o" color={color} size={24} />;
          },
          // style tab bar title
          tabBarLabelStyle: {
            color: pathName === "/" ? "#FD7366" : "#252525",
          },
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
        }}
      />
    </Tabs>
  );
}
