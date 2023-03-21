import { Stack } from "expo-router";
import { NativeBaseProvider, Button } from "native-base";
import { auth } from "../firebaseConfig";
import { useRouter, usePathname } from "expo-router";
import { FirebaseAuthProvider } from "../context/FirebaseAuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { LocationProvider } from "../context/LocationContext";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

const pathNames = {
  "/": "Feed",
  "/profile": "Profile",
  "/activity": "Activity",
};

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const router = useRouter();
  const pathname = usePathname();
  const queryClient = new QueryClient();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/"); //Redirects to the login page
    } catch (err) {
      console.log(err);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <FirebaseAuthProvider>
            <Stack
              initialRouteName="home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#252525",
                headerBackTitleVisible: false,
                headerTitleStyle: {
                  fontFamily: "Inter_600SemiBold",
                  color: "#000",
                  fontSize: 26,
                },
              }}
            >
              <Stack.Screen
                name="(tabs)"
                options={{
                  // set title to current tab
                  title: pathNames[pathname],
                  headerBackVisible: false,
                  headerRight: () => (
                    <Button
                      onPress={handleLogout}
                      p={1}
                      backgroundColor="transparent"
                      _text={{
                        color: "black",
                        fontFamily: "Inter_600SemiBold",
                      }}
                    >
                      Log Out
                    </Button>
                  ),
                }}
              />
            </Stack>
          </FirebaseAuthProvider>
        </LocationProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
