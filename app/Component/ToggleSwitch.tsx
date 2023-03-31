import { Box } from "native-base";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "native-base";

interface Props {
  options: string[];
  onSelectSwitch: any;
  selectionColor: string;
}

const ToggleSwitch: React.FC<Props> = ({
  options,
  onSelectSwitch,
  selectionColor,
}) => {
  const [selectionMode, setSelectionMode] = useState(1);

  const updatedSwitchData = val => {
    {
      setSelectionMode(val);
      onSelectSwitch(val);
    }
  };

  return (
    <Box
      style={{
        height: 50,
        width: "85%",
        flexDirection: "row",
        justifyContent: "center",
        padding: 2,
      }}
      bgColor="gray.100"
      borderWidth={1}
      borderRadius="full"
      borderColor="gray.200"
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          activeOpacity={1}
          onPress={() => updatedSwitchData(index + 1)}
          style={{
            flex: 1,
            backgroundColor:
              selectionMode == index + 1 ? "white" : "transparent",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            color={selectionMode == index + 1 ? "black" : "gray.500"}
            fontFamily="Inter_500Medium"
            fontSize="16px"
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </Box>
  );
};

export default ToggleSwitch;
