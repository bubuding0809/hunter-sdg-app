import { Stack } from "expo-router";
import { NativeBaseProvider, Button } from "native-base";
import { auth } from "../firebaseConfig";
import { useRouter, usePathname } from "expo-router";
import { FirebaseAuthProvider } from "../context/FirebaseAuthContext";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

const pathNames = {
  "/": "Home",
  "/profile": "Profile",
};

export default function Layout() {
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

  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <FirebaseAuthProvider>
          <Stack
            initialRouteName="home"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                color: "#000",
                fontSize: 30,
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
                title: pathNames[pathname],
                // set title to current tab

                headerRight: () => (
                  <Button colorScheme="danger" onPress={handleLogout} p={1}>
                    Log Out
                  </Button>
                ),
              }}
            />
          </Stack>
        </FirebaseAuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
