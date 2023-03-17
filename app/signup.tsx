import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Center,
  FormControl,
  Heading,
  VStack,
  Input,
  Button,
  KeyboardAvoidingView,
  Checkbox,
} from "native-base";
import { useState } from "react";
import { Platform } from "react-native";
import { auth } from "../firebaseConfig";
import { Link, Stack, useRouter } from "expo-router";

const Signup: React.FC = () => {
  const router = useRouter();
  const [signUpform, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    // Check that all fields are filled
    if (
      signUpform.email === "" ||
      signUpform.password === "" ||
      signUpform.confirmPassword === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (signUpform.password !== signUpform.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // call firebase to create a new user
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        signUpform.email,
        signUpform.password
      );

      // If successful, redirect to home page
      if (userCredentials) {
        alert("Account created successfully");
        router.replace("(tabs)");
      }
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email address");
          break;
        case "auth/weak-password":
          alert("Password is too weak");
          break;
        case "auth/email-already-in-use":
          alert("That email address is already in use!");
          break;
        default:
          alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Sign Up",
          headerRight: () => (
            // Sign up link
            <Link href="/signin" asChild>
              <Button
                backgroundColor="transparent"
                _text={{
                  color: "#FD7366",
                  fontWeight: "medium",
                  fontSize: "md",
                  textDecoration: "none",
                }}
              >
                Login
              </Button>
            </Link>
          ),
        }}
      />
      <KeyboardAvoidingView
        w="full"
        h="full"
        bgColor="#fff"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Hello there 👋
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
              Make an account now to be a hunter.
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                {/* <FormControl.Label>Email</FormControl.Label> */}
                <Input
                  onChangeText={text =>
                    setSignUpForm(prev => ({
                      ...prev,
                      email: text,
                    }))
                  }
                  value={signUpform.email}
                  height={10}
                  borderLeftRadius="8px"
                  fontSize={14}
                  placeholder="Email"
                />
              </FormControl>
              <FormControl>
                {/* <FormControl.Label>Password</FormControl.Label> */}
                <Input
                  type="password"
                  onChangeText={text =>
                    setSignUpForm(prev => ({
                      ...prev,
                      password: text,
                    }))
                  }
                  value={signUpform.password}
                  height={10}
                  borderLeftRadius="8px"
                  fontSize={14}
                  placeholder="Password"
                />
              </FormControl>
              <FormControl>
                {/* <FormControl.Label>Confirm Password</FormControl.Label> */}
                <Input
                  type="password"
                  onChangeText={text =>
                    setSignUpForm(prev => ({
                      ...prev,
                      confirmPassword: text,
                    }))
                  }
                  value={signUpform.confirmPassword}
                  height={10}
                  borderLeftRadius="8px"
                  fontSize={14}
                  placeholder="Confirm Password"
                />
              </FormControl>
              {/* Check box to opt in newsletter */}
              <FormControl
                display="flex"
                flexDirection="row"
                alignItems="start"
                justifyContent="space-between"
              >
                <Checkbox
                  value="newsletter"
                  id="newsletter-checkbox"
                  aria-label="
                  I would like to receive your newsletter and other promotional information
                "
                />
                <FormControl.Label
                  _text={{
                    fontSize: "xs",
                    color: "muted.700",
                    fontWeight: 500,
                  }}
                  htmlFor="newsletter-checkbox"
                  margin={0}
                >
                  I would like to receive your newsletter and other promotional
                  information.
                </FormControl.Label>
              </FormControl>

              <Button
                mt="20"
                colorScheme="indigo"
                onPress={handleSignUp}
                bgColor="black"
                borderRadius="full"
                _text={{
                  fontWeight: "semibold",
                }}
              >
                Sign up
              </Button>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </>
  );
};

export default Signup;
