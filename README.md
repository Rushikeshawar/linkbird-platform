// README.md
# LinkBird.ai Platform Clone

A complete LinkedIn automation platform built with Next.js 15, featuring campaign management, lead tracking, and automated outreach capabilities.

## 🚀 Features

- **Authentication System**
  - Email/password login and registration
  - Google OAuth integration
  - Protected routes with middleware
  - Session management

- **Dashboard**
  - Campaign overview
  - Recent activity tracking
  - LinkedIn account management
  - Interactive sidebar navigation

- **Leads Management**
  - Infinite scrolling leads table
  - Advanced filtering and search
  - Lead detail side sheet
  - Status tracking and updates
  - Interaction history

- **Campaigns Management**
  - Campaign creation and editing
  - Status management (Active, Paused, Draft, Completed)
  - Performance metrics and statistics
  - Lead assignment and tracking

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: SQLite with Drizzle ORM
- **Authentication**: Better Auth
- **State Management**: Zustand, TanStack Query
- **Form Handling**: React Hook Form with Zod validation

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── leads/             # Lead management components
│   └── campaigns/         # Campaign management components
├── lib/                   # Utility libraries
├── store/                 # Zustand stores
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd linkbird-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- Generate a secure `BETTER_AUTH_SECRET`
- Set up Google OAuth credentials (optional)

4. **Set up the database**
```bash
# Generate database schema
npm run db:generate

# Apply migrations
npm run db:push
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Database Commands

```bash
# Generate new migration
npm run db:generate

# Push schema to database
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## 🔑 Authentication

The app uses Better Auth for authentication with support for:

- **Email/Password**: Standard authentication flow
- **Google OAuth**: Social login integration
- **Session Management**: Secure session handling
- **Protected Routes**: Middleware-based route protection

### Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Secret to `.env.local`

## 📊 Database Schema

### Core Tables

- **users**: User accounts and profiles
- **sessions**: Active user sessions
- **accounts**: OAuth provider accounts
- **campaigns**: Marketing campaigns
- **leads**: Lead contacts and information
- **leadInteractions**: Lead interaction history

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible components:

- **Navigation**: Collapsible sidebar with active states
- **Tables**: Sortable, filterable data tables
- **Forms**: Validated forms with error handling
- **Modals**: Side sheets and dialogs
- **Feedback**: Toast notifications and loading states

## 🔄 State Management

- **Zustand**: Client-side state (UI, filters, selections)
- **TanStack Query**: Server state (API data, caching, mutations)
- **React Hook Form**: Form state and validation

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Progressive enhancement

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Configure environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

```bash
# One-time Vercel setup
npx vercel

# Deploy to production
npx vercel --prod
```

### Manual Deployment

1. **Build the application**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

## 🧪 Development

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (via ESLint)

### Performance Optimization

- **Next.js App Router**: Optimized routing and rendering
- **TanStack Query**: Efficient data fetching and caching
- **Infinite Scrolling**: Performance-optimized large lists
- **Image Optimization**: Next.js automatic image optimization

## 📄 API Routes

- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-up` - User registration  
- `POST /api/auth/sign-out` - User logout
- `GET /api/leads` - Fetch leads with pagination
- `GET /api/campaigns` - Fetch campaigns
- `PUT /api/leads/[id]` - Update lead status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/your-username/linkbird-platform/issues)
2. Create a new issue with detailed description
3. Contact: your-email@example.com

---

**Built with ❤️ for the Kandid internship assignment**