import { Stack } from "expo-router";
import "./global.css";
export default function RootLayout() {
  return <Stack>
      <Stack.Screen
          name="(TABS)"
          options={{
            headerShown: false,
          }}
      />

      <Stack.Screen 
          name="./Movies/[id]"
          options={{
            headerShown:false,
          }}
        />
      
  </Stack>;
}
