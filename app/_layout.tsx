import { Stack } from "expo-router";
import { NativeBaseProvider, Button } from "native-base";
import { auth } from "../firebaseConfig";
import { useRouter, usePathname } from "expo-router";
import { FirebaseAuthProvider } from "../context/FirebaseAuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { LocationProvider } from "../context/LocationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useEffect, useRef, useState } from "react";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const pathNames = {
  "/": "Feed",
  "/profile": "Profile",
  "/activity": "Activity",
};

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token: string | undefined;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
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

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  console.log("notification", notification);
  console.log("expoPushToken", expoPushToken);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <LocationProvider>
            <FirebaseAuthProvider>
              <Stack
                initialRouteName="home"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: "#fff",
                  },
                  headerBackTitleVisible: false,
                  headerTintColor: "#252525",
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
                    headerTitleStyle: {
                      fontFamily: "Inter_600SemiBold",
                      color: pathname === "/profile" ? "#fff" : "#000",
                      fontSize: 26,
                    },
                    headerStyle: {
                      backgroundColor:
                        pathname === "/profile" ? "black" : "#fff",
                    },
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
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}
