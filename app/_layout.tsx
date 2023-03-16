import { Stack } from "expo-router";
import { NativeBaseProvider, Button } from "native-base";
import { auth } from "../firebaseConfig";
import { Link, useNavigation } from "expo-router";
import { useRouter } from "expo-router";
import { FirebaseAuthProvider } from "../context/FirebaseAuthContext";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function Layout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/"); //Redirects to the login page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NativeBaseProvider>
      <FirebaseAuthProvider>
        <Stack
          initialRouteName="home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#4338ca",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "BiteBuddies",
              headerRight: () => (
                <Button
                  colorScheme="danger"
                  onPress={handleLogout}
                  marginRight="10px"
                >
                  Log Out
                </Button>
              ),
            }}
          />
          <Stack.Screen
            name="MapSelectModal"
            options={{
              // Set the presentation mode to modal for our modal route.
              presentation: "modal",
            }}
          />
        </Stack>
      </FirebaseAuthProvider>
    </NativeBaseProvider>
  );
}
