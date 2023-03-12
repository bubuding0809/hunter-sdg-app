import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { StyleSheet, Text } from "react-native";

interface InputAutocompleteProps {
  label: string;
  placeholder?: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
}

const InputAutocomplete: React.FC<InputAutocompleteProps> = ({
  label,
  placeholder,
  onPlaceSelected,
}) => {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: process.env.GOOGLE_MAPS_API_KEY!,
          language: "pt-BR",
        }}
      />
    </>
  );
};

export default InputAutocomplete;

const styles = StyleSheet.create({
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});
