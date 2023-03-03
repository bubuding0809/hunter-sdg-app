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
} from "native-base";
import { useState } from "react";
import { Platform } from "react-native";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";

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
    <KeyboardAvoidingView
      w="full"
      h={{
        base: "400px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={text =>
                  setSignUpForm(prev => ({
                    ...prev,
                    email: text,
                  }))
                }
                value={signUpform.email}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={text =>
                  setSignUpForm(prev => ({
                    ...prev,
                    password: text,
                  }))
                }
                value={signUpform.password}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={text =>
                  setSignUpForm(prev => ({
                    ...prev,
                    confirmPassword: text,
                  }))
                }
                value={signUpform.confirmPassword}
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={handleSignUp}>
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default Signup;
