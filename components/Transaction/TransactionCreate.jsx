import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { getAllCategories } from "../../services/category.service";
import { createTransaction } from "../../services/transaction.service";

const schema = yup.object().shape({
  amount: yup.string().required("La cantidad es requerida"),
  type: yup.string().required("El tipo es requerido"),
  category_ids: yup.string().required("El tipo es requerido"),
  description: yup.string(),
});

export default function TransactionCreate() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState(null);
  const [types, setTypes] = useState([
    { label: "Ingreso", value: "INCOME" },
    { label: "Gastos", value: "EXPENSE" },
  ]);
  const [openCategories, setOpenCategories] = useState(false);
  const [valueCategories, setValueCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      const category_ids = res.map((category) => ({
        label: category.name,
        value: category.id,
      }));
      setCategories(category_ids);
    };

    fetchCategories();
  }, []);

  const formatBalance = (value) => {
    const cleanValue = value.replace(/\./g, "");
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      amount: data.amount.replace(/\./g, ""),
    };
    alert(JSON.stringify(data));
    console.log(data);
    await createTransaction(formattedData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cantidad</Text>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(text) => onChange(formatBalance(text))}
            value={value}
            placeholder="15000"
            keyboardType="numeric"
          />
        )}
      />
      {errors.amount && (
        <Text style={styles.error}>{"La cantidad es requerida"}</Text>
      )}

      <Text style={styles.label}>Descripción</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Mercado"
          />
        )}
      />
      {errors.description && (
        <Text style={styles.error}>{"La descripción es requerida"}</Text>
      )}

      <Text style={styles.label}>Tipo</Text>
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <DropDownPicker
            open={openType}
            value={valueType} // Debe ser 'value' para que se refleje el valor actual del formulario
            items={types}
            setOpen={setOpenType}
            setValue={(val) => {
              setValueType(val); // Establece el valor seleccionado en el estado local
              onChange(val); // Establece el valor seleccionado en react-hook-form
            }}
            onChangeValue={(val) => onChange(val)} // Asegura que react-hook-form recibe el valor correcto
            placeholder="Selecciona una opción"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdownInner}
            placeholderStyle={styles.dropdownPlaceholder}
          />
        )}
      />
      {errors.type && (
        <Text style={styles.error}>{"El tipo es requerido"}</Text>
      )}

      <Text style={styles.label}>Categorías</Text>
      <Controller
        control={control}
        name="category_ids"
        render={({ field: { onChange, value } }) => (
          <DropDownPicker
            open={openCategories}
            value={valueCategories}
            items={categories}
            setOpen={setOpenCategories}
            setValue={(val) => {
              setValueCategories(val); // Establece el valor seleccionado en el estado local
              onChange(val); // Establece el valor seleccionado en react-hook-form
            }}
            onChangeValue={(val) => onChange(val)} // Asegura que react-hook-form recibe el valor correcto
            placeholder="Selecciona una opción"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdownInner}
            placeholderStyle={styles.dropdownPlaceholder}
          />
        )}
      />
      {errors.category_ids && (
        <Text style={styles.error}>{"La categoría es requerida"}</Text>
      )}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full w-full py-3 mx-auto mt-10"
      >
        <Text className="text-center text-white text-sm font-semibold">
          Crear Cuenta
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 12,
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderColor: "gray",
    borderWidth: 1,
  },
  dropdownInner: {
    backgroundColor: "#fafafa",
  },
  dropdownPlaceholder: {
    color: "gray",
  },
});
