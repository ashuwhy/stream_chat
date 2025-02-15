import express from 'express';
import { PrismaClient } from '@prisma/client';
import { StreamChat } from 'stream-chat';

const { STREAM_API_KEY, STREAM_API_SECRET } = process.env;
const serverClient = StreamChat.getInstance(STREAM_API_KEY!, STREAM_API_SECRET!);

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'username is missing' });
  }

  try {
    const user = await prisma.user.upsert({
      where: { username },
      create: {
        username,
        name: username,
      },
      update: {
        username,
      },
    });

    // Create or update the user in Stream Chat
    await serverClient.upsertUser({
      id: user.id.toString(),
      name: user.name,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZO18s7-uKv2T9D3_RxTHMZUlnlPStGYpn7A&s',
    });

    // Create or update the public channel
    const channel = serverClient.channel('messaging', 'public', {
      name: 'Public Chat',
      members: [user.id.toString()],
      created_by_id: user.id.toString(),
    });

    try {
      await channel.create();
      console.log('Channel created or already exists');
    } catch (error) {
      console.log('Channel might already exist:', error);
    }

    // Add the user as a member of the channel
    try {
      await channel.addMembers([user.id.toString()]);
      console.log('User added to channel');
    } catch (error) {
      console.log('Error adding user to channel:', error);
    }

    return res.json({
      ...user,
      streamToken: serverClient.createToken(user.id.toString()),
    });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

app.listen(3000, () => {
  console.log(`Server ready at: http://localhost:3000`);
});
