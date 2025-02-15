import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import Constants from "expo-constants";
import { useAuth } from "../../src/context/auth";

// Use Constants.expoConfig.extra to get your key.
const API_KEY = Constants.expoConfig?.extra?.streamApiKey;
console.log("[Chat Layout] Stream API Key:", API_KEY);

export default function ChatLayout() {
    const { user } = useAuth();
    const clientRef = useRef<StreamChat | null>(null);
    
    useEffect(() => {
        if (!API_KEY || !user?.streamToken) {
            console.log("[Chat Layout] Missing API key or stream token");
            return;
        }

        const setupClient = async () => {
            try {
                // Initialize new client instance
                const streamClient = StreamChat.getInstance(API_KEY);
                clientRef.current = streamClient;

                const userInfo = {
                    id: user.id.toString(),
                    name: user.name,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZO18s7-uKv2T9D3_RxTHMZUlnlPStGYpn7A&s',
                };

                console.log("[Chat Layout] Connecting user:", userInfo.id);
                await streamClient.connectUser(userInfo, user.streamToken);
                console.log("[Chat Layout] User connected successfully");

            } catch (error) {
                console.error("[Chat Layout] Error in chat setup:", error);
                if (error instanceof Error) {
                    console.error("[Chat Layout] Error details:", {
                        message: error.message,
                        stack: error.stack,
                    });
                }
            }
        };

        setupClient();

        return () => {
            const cleanup = async () => {
                if (clientRef.current) {
                    console.log("[Chat Layout] Disconnecting user");
                    await clientRef.current.disconnectUser();
                    clientRef.current = null;
                }
            };
            cleanup();
        };
    }, [user]);

    if (!clientRef.current || !user?.streamToken) {
        console.log("[Chat Layout] Waiting for client initialization");
        return null;
    }

    return (
        <OverlayProvider>
            <Chat client={clientRef.current}>
                <Stack>
                    <Stack.Screen name="index" options={{ title: "Messages" }} />
                </Stack>
            </Chat>
        </OverlayProvider>
    );
}