import React from "react";
import { Button, Actionsheet, useDisclose, Text, Box, Center, NativeBaseProvider } from "native-base";

function Example() {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  return <Center>
      <Button onPress={onOpen}>Actionsheet</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="16" color="gray.500" _dark={{
            color: "gray.300"
          }}>
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>

        </Actionsheet.Content>
      </Actionsheet>
    </Center>;
}

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };
    