import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import StackNavigation from "../StackNavigator";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



const LoginScreen = () => {

    const navigation = useNavigation();

    const [secureEntery, setSecureEntery] = useState(true);

    const handleSignup = () => {
        navigation.navigate("Register");
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const checkLoginScreen = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Main");
                }
                else {
                    //token not found, sow the login screen itself

                }
            } catch (error) {
                console.log("error", error)
            }
        };

        checkLoginScreen();

    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }

        axios.post("http://192.168.1.227:8000/login", user).then((response) => {
            console.log(response);
            const token = response.data.token;
            AsyncStorage.setItem("authToken", token);
            navigation.navigate("Main");
        }).catch((error) => {
            Alert.alert("Login Error", "Invalid email or password");
            console.log("Login Error", error);
        })
    };


    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
                <Ionicons
                    name={"arrow-back-outline"}
                    color={colors.primary}
                    size={25}
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Hey,</Text>
                <Text style={styles.headingText}>Welcome</Text>
                <Text style={styles.headingText}>Back</Text>
            </View>

            <View style={styles.formContainer}>

                <View style={styles.inputContainer}>
                    <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.textInput}
                        placeholder="Enter your email"
                        placeholderTextColor={colors.secondary}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.textInput}
                        placeholder="Enter your password"
                        placeholderTextColor={colors.secondary}
                        secureTextEntry={secureEntery}

                    />

                    <TouchableOpacity
                        onPress={() => {
                            setSecureEntery((prev) => !prev);
                        }}
                    >
                        <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin} style={styles.loginButtonWrapper}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.continueText}>or continue with</Text>

                <TouchableOpacity style={styles.googleButtonContainer}>
                    <Image
                        source={require("../assets/google.png")}
                        style={styles.googleImage}
                    />
                    <Text style={styles.googleText}>Google</Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.accountText}>Don’t have an account?</Text>
                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={styles.signupText}>Sign up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
        justifyContent: "center",
    },
    backButtonWrapper: {
        height: 40,
        width: 40,
        backgroundColor: colors.gray,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        marginVertical: 20,
    },
    headingText: {
        fontSize: 32,
        color: colors.myColor,
        fontFamily: fonts.SemiBold,
        fontWeight: "600"
    },
    formContainer: {
        marginTop: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 100,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        marginVertical: 10,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: fonts.Light,
    },
    forgotPasswordText: {
        textAlign: "right",
        color: colors.myColor,
        fontFamily: fonts.SemiBold,
        marginVertical: 10,
    },
    loginButtonWrapper: {
        backgroundColor: colors.myColor,
        borderRadius: 100,
        marginTop: 20,
    },
    loginText: {
        color: colors.white,
        fontSize: 20,
        fontFamily: fonts.SemiBold,
        textAlign: "center",
        padding: 10,
    },
    continueText: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: colors.myColor,
    },
    googleButtonContainer: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: colors.myColor,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 10,
    },
    googleImage: {
        height: 20,
        width: 20,
    },
    googleText: {
        fontSize: 20,
        fontFamily: fonts.SemiBold,
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        gap: 5,
    },
    accountText: {
        color: colors.myColor,
        fontFamily: fonts.Regular,
    },
    signupText: {
        color: colors.myColor,
        fontFamily: fonts.Bold,
    }
})