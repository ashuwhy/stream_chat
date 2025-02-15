# Chat App

A Stream Chat app built with React Native and Expo, just for fun.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ashuwhy/stream_chat.git
cd stream_chat
```

2. Install dependencies:

```bash
npm install
```
## Running the App

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

## Project Structure
```
├── app/                      # Main application directory
│   └── chat/                # Chat module directory
│       ├── channel/         # Channel-related components
│       │   └── [id].tsx    # Dynamic channel page
│       ├── index.tsx       # Chat home page
│       └── _layout.tsx     # Layout component for chat module
├── App.tsx                  # Root application component
├── babel.config.js         # Babel configuration
├── tsconfig.json           # TypeScript configuration
├── app.json                # Expo configuration
└── package.json            # Project dependencies and scripts
```

## Development

This project is built with:
- React Native
- TypeScript
- Babel

## License

This project is licensed under the terms found in the LICENSE file.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request