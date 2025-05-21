import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="inicio"
        options={{
          headerShown: false,
          title: "Inicio",
        }}
      />
      <Tabs.Screen
        name="agendar"
        options={{
          headerShown: false,
          title: "Agendar",
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          headerShown: false,
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}
