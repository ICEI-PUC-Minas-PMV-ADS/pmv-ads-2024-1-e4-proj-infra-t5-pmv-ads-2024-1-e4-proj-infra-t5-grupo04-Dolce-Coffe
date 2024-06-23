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
    qtd: Number,
    valor: String
}

type OrderData = {
    produtos: Produtos[]
    valor_total: Number
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



    const sendOrder = async ({ produtos, valor_total }: OrderData) => {

        const token = await AsyncStorage.getItem('@auth_token');

        // Transform the produtos array into an object with numeric keys
        const produtosObj = {};
        produtos.forEach((produto, index) => {
            produtosObj[index] = produto;
        });

        const pedido = { produtos: produtosObj, valor_total };

        console.log(JSON.stringify(pedido));
        console.log(token)

        try {
            const res = await fetch('https://dolce-coffee-api.onrender.com/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(pedido),
            });

            const data = await res.json();
            console.log('Resposta do servidor:', data);

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, sendOrder }}>
            {children}
        </AuthContext.Provider>
    )
}

