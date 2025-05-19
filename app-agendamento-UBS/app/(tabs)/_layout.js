import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Inicio",
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          headerShown: false,
          title: "Perfil",
        }}
      />

      <Tabs.Screen
        name="configuracao"
        options={{
          headerShown: false,
          title: "Configuração",
        }}
      />
    </Tabs>
  );
}
