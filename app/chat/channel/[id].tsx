import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MessageInput, MessageList, useChatContext } from 'stream-chat-expo';
import { Channel as ChannelType } from 'stream-chat';
import { Channel } from 'stream-chat-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ChannelScreen = () => {
    const [channel, setChannel] = useState<ChannelType>();
    const { client } = useChatContext();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const fetchChannel = async () => {
            const _id = typeof id === 'string' ? id : id[0];
            const channels = await client.queryChannels({ id: { $eq: _id } });
            setChannel(channels[0]);
        };

        fetchChannel();
    }, [id]);

    if (!channel) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Channel channel={channel}>
                <MessageList />
                <MessageInput />
            </Channel>
        </GestureHandlerRootView>
    );
};

export default ChannelScreen;
