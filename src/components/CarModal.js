import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Button,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import Toast from "react-native-root-toast";
const CarModal = ({
  visible,
  onClose,
  initialValues,
  onEdit,
  onCreate,
  editingCar,
}) => {
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [make, setMake] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");

  useEffect(() => {
    if (initialValues) {
      setModel(initialValues.model);
      setColor(initialValues.color);
      setMake(initialValues.make);
      setRegistrationNo(initialValues.registrationNo);
    }
  }, [initialValues]);

  const handleSubmit = () => {
    if (make === "" || model === "" || color === "" || registrationNo === "") {
      console.log("values");
      Alert.alert("Please fill all the fields");
      return;
    }

    if (
      initialValues.model !== model ||
      initialValues.color !== color ||
      initialValues.make !== make ||
      initialValues.registrationNo !== registrationNo
    ) {
      const car = {
        id: initialValues?.id || Date.now(),
        model,
        color,
        make,
        registrationNo,
      };

      if (editingCar) {
        onEdit(car);
      } else {
        console.log("car ", car);
        onCreate(car);
      }
      console.log("here");
      onClose();
    } else {
      Alert.alert("No changes detected");
      return;
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Model"
          value={model}
          onChangeText={setModel}
        />
        <TextInput
          style={styles.input}
          placeholder="Color"
          value={color}
          onChangeText={setColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Make"
          value={make}
          onChangeText={setMake}
        />
        <TextInput
          style={styles.input}
          placeholder="Registration No"
          value={registrationNo}
          onChangeText={setRegistrationNo}
        />
        <Button title="Submit" onPress={handleSubmit} />
        <View style={{ marginTop: "2%" }}>
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    width: "100%",
  },
});

export default CarModal;
