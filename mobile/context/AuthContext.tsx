import { createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";



type SignInData = {
    email: string,
    senha: string
}

type Produtos = {
    nome: String,
    quantidade: Number,
    valor: String
}

type OrderData = {
    pedido: Produtos[];
}

type AuthContextType = {
    isAuthenticated: boolean,
    signIn: (data: SignInData) => Promise<void>
    sendOrder: (data: OrderData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)


export function AuthProvider({ children }) {

    // const router = useRouter()

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigation = useNavigation();



    async function signIn({ email, senha }: SignInData) {

        const res = await fetch('https://dolce-coffee-api.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const { token } = await res.json();


        AsyncStorage.setItem('@auth_token', token)

        navigation.navigate('index')


    }

    async function sendOrder(pedido : OrderData) {

        console.log('SEU PEDIDO =>>',pedido)

        const token = await AsyncStorage.getItem('@auth_token')


        const res = await fetch('http://localhost:5000/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ pedido }),
        });

        const data = await res.json();
        console.log('Resposta do servidor:', data);
    }



    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, sendOrder }}>
            {children}
        </AuthContext.Provider>
    )
}

