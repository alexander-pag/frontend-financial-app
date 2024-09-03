import { Tabs } from "expo-router";
import {
  AccountIcon,
  CategoryIcon,
  InfoIcon,
  ProfileIcon,
  TransactionIcon,
} from "../../../components/Icons";
import Header from "../../../components/Header";

export default function TabsLayout() {
  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#FF7D29" },
          tabBarActiveTintColor: "#FEFFD2",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="category"
          options={{
            title: "Categorias",
            tabBarIcon: ({ color }) => <CategoryIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Cuentas",
            tabBarIcon: ({ color }) => <AccountIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="transaction"
          options={{
            title: "Transacciones",
            tabBarIcon: ({ color }) => <TransactionIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "Info",
            tabBarIcon: ({ color }) => <InfoIcon color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
