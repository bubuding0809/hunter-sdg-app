import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Center, Image } from "native-base";
import { useFirebaseSession } from "../context/FirebaseAuthContext";

// * Index Page
const Index: React.FC = () => {
  // Get session data from context
  const { data: sessionData, isLoading } = useFirebaseSession();

  // Get router
  const router = useRouter();

  // Redirect to home page if user is already logged in
  useEffect(() => {
    sessionData && router.replace("/(tabs)");
  }, [sessionData]);

  // Display splash screen while loading session data
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          header: () => null,
        }}
      />
      <Center bgColor="black" h="full">
        {/* Display image of logo */}
        <Image source={require("../assets/hunter_logo.png")} alt="logo" />
        <Image
          source={require("../assets/hunter_typeface.png")}
          alt="logo"
          mt="35px"
        />
        <Button
          onPress={() => router.push("/signin")}
          bgColor="white"
          w="60%"
          mt="44px"
          borderRadius="full"
          _text={{
            color: "black",
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
          }}
        >
          Begin.
        </Button>
      </Center>
    </>
  );
};

export default Index;
