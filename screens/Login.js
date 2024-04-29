import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native'
import { Input } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    const openRegisterScreen = () => {
        navigation.navigate('Register');
    };

    const signin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.uid)
                navigation.navigate('MyTab', { user_id: userCredential.user.uid });
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/bird.png')} style={styles.backgroundImage} />

            <View style={styles.smallScreen}>
                <Input
                    placeholder='Enter your email'
                    label='Email'
                    leftIcon={{ type: 'material', name: 'email' }}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Enter your password'
                    label='Password'
                    leftIcon={{ type: 'material', name: 'lock' }}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <TouchableOpacity
                    onPress={signin}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openRegisterScreen}
                    style={[styles.button, { backgroundColor: '#4E50F7' }]}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4E50F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    smallScreen: {
        width: 0.9 * Dimensions.get('window').width,
        flex: 0.5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add opacity to make the background slightly transparent
        paddingTop: 40,
        padding: 20,
        alignItems: 'center',
        borderRadius: 4,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    button: {
        marginTop: 30,
        width: '70%',
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: '#414242',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default Login;
