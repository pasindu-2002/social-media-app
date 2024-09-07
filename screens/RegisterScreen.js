import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import axios from 'axios';

import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {

    const navigation = useNavigation();

    const [secureEntery, setSecureEntery] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [tele, setTele] = useState("");

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            tele: tele,
            password: password,
            image: image
        }

        // Send a POST request to the backend API to register the user 
        axios.post("http://192.168.1.227:8000/register", user).then((response) => {
            console.log(response);
            Alert.alert(
                "Resitration successfull",
                    "You have ben registered Successfully"
            );

            setName("");
            setEmail("");
            setTele("");
            setPassword("");
            setImage("");
        }).catch((error) => {
            Alert.alert(
                "Registration Error",
                "An error occurred while registring;"
            );

            console.log("registration failed", error)
        })
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
                <Ionicons
                    name={"arrow-back-outline"}
                    color={colors.myColor}
                    size={25}
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Let's get</Text>
                <Text style={styles.headingText}>started</Text>
            </View>

            {/* form  */}
            <View style={styles.formContainer}>

                <View style={styles.inputContainer}>
                    <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.textInput}
                        placeholder="Enter your name"
                        placeholderTextColor={colors.secondary}
                    />
                </View>

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

                <View style={styles.inputContainer}>
                    <SimpleLineIcons
                        name={"screen-smartphone"}
                        size={30}
                        color={colors.secondary}
                    />
                    <TextInput
                        value={tele}
                        onChangeText={(text) => setTele(text)}
                        style={styles.textInput}
                        placeholder="Enter your phone no"
                        placeholderTextColor={colors.secondary}
                        secureTextEntry={secureEntery}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <SimpleLineIcons
                        name={"user"}
                        size={30}
                        color={colors.secondary}
                    />
                    <TextInput
                        value={image}
                        onChangeText={(text) => setImage(text)}
                        style={styles.textInput}
                        placeholder="Upload your image"
                        placeholderTextColor={colors.secondary}
                        
                    />
                </View>

                <TouchableOpacity onPress={handleRegister} style={styles.loginButtonWrapper}>
                    <Text style={styles.loginText}>Sign up</Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.accountText}>Already have an account!</Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.signupText}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default RegisterScreen

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
        padding: 5,
        marginVertical: 10,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 15,
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