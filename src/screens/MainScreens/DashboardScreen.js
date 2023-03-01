import React, { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import carData from "../../../dummy_car.json";
import CarModal from "../../components/CarModal";
import { logout } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const DashboardScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load dummy data from JSON file
    setCars(carData);
  }, []);

  useEffect(() => {}, [cars]);

  const handleCreateCar = (car) => {
    setCars([...cars, car]);
    setModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("login");
  };

  const handleEditCar = (car) => {
    const updatedCars = cars.map((c) => {
      if (c.id === car.id) {
        return car;
      }
      return c;
    });
    setCars(updatedCars);
    setEditingCar(null);
    setModalVisible(false);
    Toast.show("Car Updated");
  };

  const deleteCar = (car) => {
    const deletedCars = cars?.filter((c) => c.id !== car.id);
    console.log("deleted Cars ", deletedCars);
    Toast.show("car deleted");
    setCars(deletedCars);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{
          uri: "https://media.istockphoto.com/id/946455734/photo/3d-illustration-of-silver-generic-car-on-white.jpg?s=612x612&w=0&k=20&c=3m6JYme_uDSvNTXEWHge0gcCSeoW00A1N2EspNUxDdE=",
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.model}>{item.model}</Text>
        <Text style={styles.color}>{item.color}</Text>
        <Text style={styles.make}>{item.make}</Text>
        <Text style={styles.registrationNo}>{item.registrationNo}</Text>
        <View style={styles.actions}>
          <Button
            title="Edit"
            onPress={() => {
              setEditingCar(item);
              setModalVisible(true);
            }}
          />
          <Button title="Delete" onPress={() => deleteCar(item)} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView stytle={styles.container}>
      <View style={{ marginTop: HEIGHT / 10 }}>
        <Text style={styles.headingText}>DashBoard Car Portal</Text>
        <View style={styles.subHeadingView}>
          <Text style={{ ...styles.headingText, color: "#000" }}>
            Total Cars: <Text style={styles.headingText}>{cars?.length}</Text>
          </Text>
          <Pressable onPress={handleLogout}>
            <Text style={styles.logout}>logout</Text>
          </Pressable>
        </View>
        <View style={{ height: HEIGHT * 0.65 }}>
          <FlatList
            data={cars}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <CarModal
          visible={modalVisible}
          onClose={() => {
            setEditingCar(null);
            setModalVisible(false);
          }}
          onCreate={handleCreateCar}
          onEdit={handleEditCar}
          editingCar={editingCar}
          initialValues={editingCar || {}}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.button}
        >
          <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold" }}>
            Add Car
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    resizeMode: "contain",
  },
  details: {
    flex: 1,
  },
  model: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  color: {
    fontSize: 14,
    marginBottom: 4,
  },
  make: {
    fontSize: 14,
    marginBottom: 4,
  },
  registrationNo: {
    fontSize: 14,
  },
  headingText: {
    textAlign: "center",
    fontSize: 20,
    color: "#c54f00",
    fontWeight: "bold",
  },
  actions: {
    width: WIDTH / 2.5,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    justifyContent: "space-between",
  },
  button: {
    width: "80%",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#c54f00",
    padding: 14,
    marginTop: "10%",
    alignItems: "center",
    alignSelf: "center",
  },
  logout: {
    color: "#000",
    fontSize: 18,
  },
  subHeadingView: {
    width: WIDTH,
    flexDirection: "row",

    justifyContent: "space-evenly",
  },
});

export default DashboardScreen;
