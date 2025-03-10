import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Button } from "react-native";
import api from '../axios/axios'

export default function Login({navigation}){
    const [user, setUser] = useState ({ 
        email: "",
        password: "",
    });

    async function handleLogin(){
        console.log(user)
        await api.postLogin(user).then( //solicitação
            (response)=>{
                Alert.alert('OK', response.data.message)
            },(error)=>{
                Alert.alert('Erro', error.response.data.error)
            }
        )
    }
        
    
    return(
        <View style={styles.container}>
        <Text style={styles.title}> Faça Login</Text>
        <TextInput 
        style={styles.input}
        placeholder="EMAIL"
        value={user.email}
        onChangeText={(value)=> {
            setUser({...user, email: value});
        }}
        />
        <TextInput
        style={styles.input}
        placeholder="Senha"
        value={user.password}
        onChangeText={(value)=> {
            setUser({...user, password: value});
        }}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text>Entrar</Text>
        </TouchableOpacity>
        <Button title="Cadastro" onPress={()=> navigation.navigate("Cadastro")}/>
        </View>
    );
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        title:{
            fontSize:28,
            fontWeight:'bold'
    },
    input:{
        width: '100%',
        height:40,
        borderBottomWidth:1,
        marginBottom:20,
        paddingHorizontal:10
    },
    button:{
        backgroundColor: 'pink',
        padding:10,
        borderRadius:5
    }
});


    
