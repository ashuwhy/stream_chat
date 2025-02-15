import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ChannelList, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { Channel as ChannelType } from 'stream-chat';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/auth';

const ChatScreen = () => {
    const router = useRouter();
    const { user } = useAuth();

    const isPrivate = {
        type: 'messaging',
        members: {
            $in: [user.id.toString()],
        },
    }
    const isPublic = {
        type: 'livestream',
    }
    // const [channel, setChannel] = useState<ChannelType>();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* {channel ? (
                <Channel channel={channel}>
                    <MessageList />
                    <MessageInput />
                </Channel>
            ) : (
                <ChannelList onSelect={(channel) => setChannel(channel)} />
            )} */}

            <ChannelList 
                filters={{
                    $or: [isPrivate, isPublic],
                }}
                onSelect={(channel) => router.push(`/chat/channel/${channel.id}`)} 
            />

        </GestureHandlerRootView>
    );
};

export default ChatScreen;