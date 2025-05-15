# TravelPlanner App

A collaborative trip planning application that allows multiple users to create, edit, and share comprehensive travel itineraries. Built with React Native and Expo.

## Features

- Create and manage trips with detailed information
- Collaborate with friends and family on planning
- Track accommodations, activities, and transportation
- Different trip states (creation, waiting to start, in progress, completed)
- iOS-native design with colorful, minimal aesthetic

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: AWS Serverless with Python
- **Authentication**: Amazon Cognito
- **Database**: Amazon DynamoDB
- **Storage**: Amazon S3 (for images)

## Project Structure

```
src/
├── components/      # Reusable UI components
├── context/         # React context for state management
├── hooks/           # Custom React hooks
├── navigation/      # Navigation configuration
├── screens/         # Screen components
│   ├── auth/        # Authentication screens
│   ├── profile/     # User profile screens
│   └── trips/       # Trip management screens
├── services/        # API and service integrations
├── theme/           # Styling and theming
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/travelPlanner.git
cd travelPlanner
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Follow the instructions in the terminal to open the app on your device or simulator

## Development Roadmap

### Phase 1 (MVP)
- ✅ Core authentication system
- ✅ Basic trip creation and management
- ⬜ Essential sharing functionality
- ⬜ Day-by-day planning with accommodation and activity tracking
- ✅ List-based visualization

### Phase 2
- ⬜ Map-based and calendar visualization
- ⬜ Enhanced collaboration features (voting, comments)
- ⬜ Improved UI/UX based on initial user feedback
- ⬜ Web version launch

### Phase 3
- ⬜ Advanced features for future monetization
- ⬜ Analytics and reporting
- ⬜ Integration with third-party services
- ⬜ Performance optimizations

## AWS Setup

To configure the AWS backend:

1. Install the AWS CLI and configure it with your credentials
2. Set up Amazon Cognito for authentication
3. Create DynamoDB tables for trips, users, activities, etc.
4. Configure S3 buckets for image storage
5. Deploy Lambda functions for serverless backend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
