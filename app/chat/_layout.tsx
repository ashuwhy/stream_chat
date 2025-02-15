import { Stack } from "expo-router";
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import Constants from "expo-constants";

// Use Constants.expoConfig.extra to get your key.
const API_KEY = Constants.expoConfig?.extra?.streamApiKey;
console.log("Using Stream API Key:", API_KEY);
const client = StreamChat.getInstance(API_KEY);

export default function ChatLayout() {

    useEffect(() => {

        // Connect user
        const connectUser = async () => {
            await client.connectUser(
              {
                id: 'as',
                name: 'Ashu',
                image: 'https://i.imgur.com/YbPN6Cj.jpeg',
              },
              client.devToken('as')
            );

            // Create channel
            const channel = client.channel('messaging', 'public', {
                name: 'Test',
                image: 'https://i.imgur.com/fR9Jz14.png',
            });
            await channel.create();
        };

        connectUser();

        // Disconnect user
        return () => {
            client.disconnectUser();
        };
    }, []);

    return (
        <OverlayProvider>
            <Chat client={client}>
                <Stack>
                    <Stack.Screen name="index" options={{ title: "Messages" }} />
                </Stack>
            </Chat>
        </OverlayProvider>
    )
}