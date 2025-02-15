import { useEffect } from "react";
import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getUser } from "../../src/services/userService";
import { User } from "../../src/context/auth";
import UserListItem from "../../src/componets/UserListItem";

const NewChannel = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUser().then(setUsers);
    }, []);

    return (
        <FlatList
            data={users}
            renderItem={({ item }) => <UserListItem user={item} />}
        />
    );
}

export default NewChannel;
