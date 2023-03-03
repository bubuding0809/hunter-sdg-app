import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function Layout() {
  return (
    <NativeBaseProvider>
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
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            // Set the presentation mode to modal for our modal route.
            presentation: "modal",
          }}
        />
      </Stack>
    </NativeBaseProvider>
  );
}
