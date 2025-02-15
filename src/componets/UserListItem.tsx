import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAuth, User } from "../context/auth";
import { useChatContext } from "stream-chat-expo";
import { useRouter } from "expo-router";
const UserListItem = ({ user }: { user: User }) => {
    const { client } = useChatContext();
    const { user: me } = useAuth();
    const router = useRouter();

    const startChannel = async () => {
        const channel = client.channel('messaging', {
            members: [me.id.toString(), user.id.toString()],
        });
        await channel.watch();
        router.push(`/chat/channel/${channel.id}`);
    }
    
    return (
        <Pressable style={styles.container} 
            onPress={startChannel}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.name[0]}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>{user.name}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4a5568',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    avatarText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default UserListItem;