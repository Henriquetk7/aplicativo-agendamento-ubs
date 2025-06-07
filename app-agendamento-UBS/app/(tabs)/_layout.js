import { Tabs, useRouter } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 54,
          marginHorizontal: 60,
          borderTopWidth: 0,
          borderRadius: 32,
          elevation: 0,
          borderTopWidth: 0,
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
        },
        tabBarLabelStyle: {
          fontSize: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          headerShown: false,
          title: "Início",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/home-icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#007bff" : "#999",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="agendar"
        options={{
          headerShown: false,
          title: "Agendar",
          tabBarIcon: () => (
            <TouchableOpacity
              onPress={() => router.push("/agendar")}
              activeOpacity={1}
            >
              <Image
                source={require("../assets/agendar-icon.png")}
                style={{
                  width: 64,
                  height: 64,
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          ),
          tabBarLabelStyle: {
            fontSize: 10,
            color: "#007bff",
          },
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          headerShown: false,
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/person-icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#007bff" : "#999",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
