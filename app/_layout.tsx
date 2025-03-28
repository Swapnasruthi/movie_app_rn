import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";
export default function RootLayout() {
  return (
  <>
      <StatusBar hidden={true}/>

      <Stack>
      <Stack.Screen
          name="(TABS)"
          options={{
            headerShown: false,
          }}
      />

      <Stack.Screen 
          name="Movies/[id]"
          options={{
            headerShown:false,
          }}
        />
      
  </Stack>;
  </>
  )
}
