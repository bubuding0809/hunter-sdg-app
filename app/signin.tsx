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
import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseSession } from "../context/FirebaseAuthContext";

// * Login Page
const Login: React.FC = () => {
  // Get session data from context
  const { data: sessionData, isLoading } = useFirebaseSession();

  // Get router
  const router = useRouter();

  // State variables for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to home page if user is already logged in
  useEffect(() => {
    sessionData && router.replace("/(tabs)");
  }, [sessionData]);

  if (isLoading) {
    return <SplashScreen />;
  }

  // Handle signin using firebase authentication
  const handleSignin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Log In",
          headerRight: () => (
            // Sign up link
            <Link href="/signup" asChild>
              <Button
                backgroundColor="transparent"
                _text={{
                  color: "#FD7366",
                  fontWeight: "medium",
                  fontSize: "md",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </Button>
            </Link>
          ),
        }}
      />
      <KeyboardAvoidingView
        w="full"
        h="full"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        backgroundColor="#fff"
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
              Welcome back 🐺
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
              Sign in to continue.
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                {/* <FormControl.Label>Email ID</FormControl.Label> */}
                <Input
                  onChangeText={text => setEmail(text)}
                  height={10}
                  borderLeftRadius="8px"
                  fontSize={14}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl>
                {/* <FormControl.Label>Password</FormControl.Label> */}
                <Input
                  type="password"
                  onChangeText={text => setPassword(text)}
                  height={10}
                  borderLeftRadius="8px"
                  fontSize={14}
                  placeholder="Enter your password"
                />
              </FormControl>
              <Button
                mt="20"
                onPress={handleSignin}
                bgColor="black"
                borderRadius="full"
                _text={{
                  fontWeight: "semibold",
                }}
              >
                Log In
              </Button>
            </VStack>

            <Link href="/signin" asChild>
              <Button
                backgroundColor="transparent"
                _text={{
                  color: "black",
                  fontWeight: "medium",
                  fontSize: "sm",
                  textDecoration: "none",
                }}
              >
                Forgot you password?
              </Button>
            </Link>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
