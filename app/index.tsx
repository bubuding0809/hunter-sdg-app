import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Link, useNavigation } from "expo-router";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Link as NativeLink,
  KeyboardAvoidingView,
} from "native-base";
import { Platform } from "react-native";
import { Image } from "react-native";
import { auth, db } from "../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// * Login Page
const Login: React.FC = () => {
  const [isReady, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get data from firestore
    const users = collection(db, "testcollection");
    getDocs(users).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
      });
    });
  }, []);

  useEffect(() => {
    // Perform some sort of async data or asset fetching.
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      {!isReady && <SplashScreen />}
      <KeyboardAvoidingView
        w="full"
        h={{
          base: "400px",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center>
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" />
                <NativeLink
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </NativeLink>
              </FormControl>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => router.push("/(tabs)")}
              >
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Link href="/signup" asChild>
                  <NativeLink
                    _text={{
                      color: "indigo.500",
                      fontWeight: "medium",
                      fontSize: "sm",
                    }}
                  >
                    Sign Up
                  </NativeLink>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
