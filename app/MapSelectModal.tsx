import { View } from "react-native";
import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MapSelect from "../components/Map/MapSelect";

interface MapSelectModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
}

const MapSelectModal: React.FC<MapSelectModalProps> = ({
  setOpen,
  setLocation,
  setRadius,
}) => {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  return (
    <>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}

      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
      <MapSelect
        setOpen={setOpen}
        setLocation={setLocation}
        setRadius={setRadius}
      />
    </>
  );
};

export default MapSelectModal;
