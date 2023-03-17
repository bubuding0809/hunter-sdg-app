import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { StyleSheet, Text } from "react-native";
import { useEffect, useRef } from "react";
import { Platform, NativeModules } from "react-native";

const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

interface InputAutocompleteProps {
  label: string;
  placeholder?: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
  decodedAddress?: string | null;
}
const InputAutocomplete: React.FC<InputAutocompleteProps> = ({
  label,
  placeholder,
  onPlaceSelected,
  decodedAddress = "",
}) => {
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    decodedAddress && ref.current?.setAddressText(decodedAddress);
  }, [decodedAddress]);

  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        ref={ref}
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: process.env.GOOGLE_MAPS_API_KEY!,
          components: 'country:sg',
          language: deviceLanguage,
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
