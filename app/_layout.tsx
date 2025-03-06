import { Stack } from "expo-router";
import '../global.css'
import { useFonts } from "expo-font";
import { NunitoSans_400Regular, NunitoSans_700Bold } from "@expo-google-fonts/nunito-sans";
import { Feather } from "@expo/vector-icons";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{
    headerShown:false,
    title:''
  }}/>;
}
