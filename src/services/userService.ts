import { Alert } from "react-native";
import { API_URL } from "../config";
import { User } from "../context/auth";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const login = async (username: string): Promise<User | null> => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (response.status !== 200) {
        const error = await response.json();
        Alert.alert('Error', error.error);
        return null;
    }
    else {
        const user = await response.json();
        Alert.alert('Success', 'Logged in successfully');
        return user;
    }
};

export const getUser = async (): Promise<User[]> => {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    return users;
};