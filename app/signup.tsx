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
import { auth, db } from "../firebaseConfig";
import { Link, Stack, useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

const Signup: React.FC = () => {
  const router = useRouter();
  const [signUpform, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleSignUp = async () => {
    // Check that all fields are filled
    if (
      signUpform.email === "" ||
      signUpform.password === "" ||
      signUpform.confirmPassword === "" ||
      signUpform.firstName === "" ||
      signUpform.lastName === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (!signUpform.newsletter) {
      alert("Please agree to the newsletter");
      return;
    }

    if (signUpform.password !== signUpform.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsCreating(true);
    // call firebase to create a new user
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        signUpform.email,
        signUpform.password
      );

      // If successful, redirect to home page
      if (userCredentials) {
        // update user profile
        alert("Account created successfully");

        // Create a new user in firestore
        const userDocRef = doc(db, "User", userCredentials.user.uid);
        await setDoc(userDocRef, {
          email: signUpform.email,
          firstName: signUpform.firstName,
          lastName: signUpform.lastName,
          createdAt: new Date(),
        });

        // Redirect to home page
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
    } finally {
      setIsCreating(false);
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
              fontFamily="Inter_600SemiBold"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Hello there 👋
            </Heading>
            <Heading
              mt="1"
              fontFamily="Inter_400Regular"
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Make an account now to be a hunter.
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                {/* <FormControl.Label>Email</FormControl.Label> */}
                <Input
                  isRequired
                  onChangeText={text =>
                    setSignUpForm(prev => ({
                      ...prev,
                      firstName: text,
                    }))
                  }
                  value={signUpform.firstName}
                  height={10}
                  placeholder="First name"
                  fontFamily={"Inter_400Regular"}
                  borderRadius={8}
                  fontSize={16}
                  bgColor="#F5F5F5"
                />
              </FormControl>
              <FormControl>
                {/* <FormControl.Label>Email</FormControl.Label> */}
                <Input
                  isRequired
                  onChangeText={text =>
                    setSignUpForm(prev => ({
                      ...prev,
                      lastName: text,
                    }))
                  }
                  value={signUpform.lastName}
                  height={10}
                  placeholder="Last name"
                  fontFamily={"Inter_400Regular"}
                  borderRadius={8}
                  fontSize={16}
                  bgColor="#F5F5F5"
                />
              </FormControl>
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
                  placeholder="Email"
                  fontFamily={"Inter_400Regular"}
                  borderRadius={8}
                  fontSize={16}
                  bgColor="#F5F5F5"
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
                  placeholder="Password"
                  fontFamily={"Inter_400Regular"}
                  borderRadius={8}
                  fontSize={16}
                  bgColor="#F5F5F5"
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
                  placeholder="Confirm Password"
                  fontFamily={"Inter_400Regular"}
                  borderRadius={8}
                  fontSize={16}
                  bgColor="#F5F5F5"
                />
              </FormControl>

              {/* Check box to opt in newsletter */}
              <FormControl
                display="flex"
                flexDirection="row"
                alignItems="flex-start"
                justifyContent="space-between"
                mt={2}
              >
                <Checkbox
                  value="newsletter"
                  id="newsletter-checkbox"
                  aria-label="I would like to receive your newsletter and other promotional information"
                  mr={2}
                  colorScheme="gray"
                  onChange={check =>
                    setSignUpForm(prev => ({ ...prev, newsletter: check }))
                  }
                />
                <FormControl.Label
                  _text={{
                    fontSize: "xs",
                    color: "muted.700",
                    fontWeight: 400,
                  }}
                  htmlFor="newsletter-checkbox"
                  margin={0}
                  // Make text wrap
                  flexShrink={1}
                >
                  I would like to receive your newsletter and other promotional
                  information.
                </FormControl.Label>
              </FormControl>

              {/* Sign up button */}
              <Button
                isDisabled={isCreating}
                mt={10}
                colorScheme="indigo"
                onPress={handleSignUp}
                bgColor="black"
                borderRadius="full"
                _text={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                }}
              >
                {isCreating ? "Creating account..." : "Sign Up"}
              </Button>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </>
  );
};

export default Signup;
