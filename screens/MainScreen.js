import {Text, View } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { UserType } from '../UserContext';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = () => {
  const navigation = useNavigation();

  // Destructure userId and setUserId from the context object
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",

      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
      ),

      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          <MaterialIcons name="people-outline" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwt_decode(token);
          setUserId(decodedToken.userId);

          axios
            .get(`http://192.168.1.227:8000/users/${userId}`)
            .then((response) => {
              console.log("Users fetched: ", response.data);
              setUsers(response.data);
            })
            .catch((error) => {
              console.log("Error retrieving users", error);
            });
        } else {
          console.log("No auth token found");
        }
      } catch (error) {
        console.log("Error decoding token or fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  console.log("users", users);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text>MainScreen</Text>
      {/* Display the userId */}
      <Text>User ID: {userId}</Text>
    </View>
  );
}

export default MainScreen;