import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const HomeIcon = (props) => (
  <Ionicons name="home" size={24} color="black" {...props} />
);

export const LoginIcon = (props) => (
  <Ionicons name="enter" size={24} color="black" {...props} />
);

export const RegisterIcon = (props) => (
  <Ionicons name="person-add" size={24} color="black" {...props} />
);

export const SettingsIcon = (props) => (
  <Ionicons name="settings" size={24} color="black" {...props} />
);

export const ProfileIcon = (props) => (
  <Ionicons name="person" size={24} color="black" {...props} />
);

export const AccountIcon = (props) => (
  <MaterialIcons name="account-balance" size={24} color="black" {...props} />
);

export const InfoIcon = (props) => (
  <Ionicons name="information-circle" size={24} color="black" {...props} />
);

export const CategoryIcon = (props) => (
  <Ionicons name="grid" size={24} color="black" {...props} />
);

export const TransactionIcon = (props) => (
  <FontAwesome6 name="money-bill-transfer" size={24} color="black" {...props} />
);
