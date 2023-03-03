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

const Signup: React.FC = () => {
  const [signUpform, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = () => {
    console.log(signUpform);
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
            <Button mt="2" colorScheme="indigo">
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default Signup;
