# EventHorizon Frontend - React Event Management App - Change 9 Nov #5

A modern, responsive React application for event management built with TypeScript, Tailwind CSS, and Vite. Features a clean, intuitive interface for browsing, creating, and managing events.

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- EventHorizon API running (see backend repository)

### Installation & Setup

```bash
# Clone the repository
git clone <your-frontend-repo-url>
cd eventapp-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

### With Docker

```bash
# Build and run with Docker
docker build -t eventhorizon-frontend .
docker run -p 3000:80 eventhorizon-frontend
```

## Project Structure

```
eventapp-frontend/
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── ui/                       # Shadcn/ui components
│   │   │   ├── button.tsx            # Button variants
│   │   │   ├── card.tsx              # Card layouts
│   │   │   ├── input.tsx             # Form inputs
│   │   │   ├── badge.tsx             # Category badges
│   │   │   └── ...                   # More UI components
│   │   ├── CategoryBadge.tsx         # Event category display
│   │   ├── EventCard.tsx             # Event display card
│   │   ├── Header.tsx                # Navigation header
│   │   └── examples/                 # Component examples
│   ├── pages/                        # Page components
│   │   ├── Events.tsx                # Events listing page
│   │   ├── CreateEvent.tsx           # Event creation form
│   │   ├── Login.tsx                 # User authentication
│   │   └── not-found.tsx             # 404 page
│   ├── lib/                          # Utilities & API
│   │   ├── api.ts                    # API client functions
│   │   ├── queryClient.ts            # React Query setup
│   │   └── utils.ts                  # Helper utilities
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-mobile.tsx            # Mobile detection
│   │   └── use-toast.ts              # Toast notifications
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # App entry point
│   └── index.css                     # Global styles
├── shared/
│   └── schema.ts                     # Shared TypeScript schemas
├── attached_assets/
│   └── stock_images/                 # Event images
├── public/                           # Static assets
├── components.json                   # Shadcn/ui configuration
├── tailwind.config.ts                # Tailwind CSS config
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies & scripts
├── Dockerfile                        # Container definition
├── nginx.conf                        # Nginx configuration
└── README.md                         # This file
```

## 🛠️ Technology Stack

### Core Framework

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

### State Management & Data

- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Routing & Navigation

- **Wouter** - Lightweight React router

### Development Tools

- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **ESLint** - Code linting

## 🎨 Features

### ✅ Current Features

- **Event Browsing** - View all events with filtering by category
- **Event Creation** - Create new events with form validation
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - Theme switching support
- **User Authentication** - Login and registration
- **Category Filtering** - Filter events by category (Technology, Music, Sports, etc.)
- **Modern UI** - Clean, accessible interface with animations
- **Image Support** - Event images with fallback handling
- **Toast Notifications** - User feedback system

### 🔄 Planned Features

- Event editing and deletion
- Image upload functionality
- Event search and advanced filtering
- User profiles and preferences
- Event favorites/bookmarks
- Calendar integration
- Social sharing

## 🚀 Development

### Available Scripts

```bash
# Development server
npm run dev              # Start dev server at http://localhost:5173

# Production build
npm run build           # Build for production
npm run preview         # Preview production build

# Type checking
npm run check           # TypeScript type checking
```

### Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit files in `src/`
3. **View Changes**: Hot reload at http://localhost:5173
4. **Build**: `npm run build` for production

### Adding New Components

```bash
# Add a new shadcn/ui component
npx shadcn-ui@latest add [component-name]

# Example: Add a dialog component
npx shadcn-ui@latest add dialog
```

### Environment Variables

Create `.env.local` for local development:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=EventHorizon
```

## 🔌 API Integration

The frontend connects to the EventHorizon API backend. Configure the API base URL in:

### Development

- Default: `http://localhost:4001/api` (local API)
- Vite proxy: Configured in `vite.config.ts`

### Production

- Docker: `/api` (proxied through nginx)
- Update `src/lib/api.ts` for your production API URL

### API Endpoints Used

- `GET /api/events` - Fetch events
- `POST /api/events` - Create event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event
- `GET /api/events/category/{category}` - Filter by category
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

## 🐳 Docker Deployment

### Development

```bash
# Build image
docker build -t eventhorizon-frontend .

# Run container
docker run -p 3000:80 eventhorizon-frontend
```

### Production

```bash
# Build production image
docker build --target production -t eventhorizon-frontend:prod .

# Run with custom nginx config
docker run -p 80:80 -v ./nginx.conf:/etc/nginx/nginx.conf eventhorizon-frontend:prod
```

### Docker Compose (with backend)

```yaml
services:
  frontend:
    build: .
    ports:
      - "3000:80"
    depends_on:
      - api
    environment:
      - API_URL=http://api:8080
```

## 🎨 Customization

### Theme Configuration

Edit `tailwind.config.ts` to customize:

- Colors and design tokens
- Typography scales
- Spacing and sizing
- Animation timings

### UI Components

- Components in `src/components/ui/` are from shadcn/ui
- Customize in `components.json`
- Override styles in component files

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`

## 📱 Responsive Design

The app is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Key responsive features:

- Mobile-first design approach
- Touch-friendly interactions
- Collapsible navigation
- Responsive grid layouts
- Optimized images

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests once (CI mode)
npm run test:run

# Run with coverage
npm run test:coverage

# Run specific test files
npm test -- CategoryBadge.test.tsx
npm test -- src/components/
```

### Test Structure

- **Unit Tests**: Components, utilities, and API functions
- **Integration Tests**: Page components with mocked APIs
- **Mocking**: MSW (Mock Service Worker) for API calls
- **Framework**: Vitest + React Testing Library

### Test Coverage

Current test coverage includes:

- ✅ **Components**: CategoryBadge, EventCard (partial)
- ✅ **Utilities**: className utility functions
- ✅ **API Functions**: Authentication and events (partial)
- 🔄 **Pages**: Events, CreateEvent (in progress)
- 🔄 **Navigation**: Header component (in progress)

### Manual Testing Checklist

- [ ] Event listing loads correctly
- [ ] Create event form validates properly
- [ ] Category filtering works
- [ ] Mobile navigation functions
- [ ] Theme switching works
- [ ] Images load with fallbacks
- [ ] Toast notifications appear

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment Options

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
```

### Static Hosting

```bash
# Build the app
npm run build

# Upload dist/ folder to any static host
# (AWS S3, GitHub Pages, etc.)
```

### CDN Configuration

For production, configure your CDN/hosting:

- Set `dist/` as root directory
- Configure SPA fallback to `index.html`
- Enable gzip compression
- Set cache headers for static assets

## 🛡️ Security Considerations

### Production Checklist

- [ ] Remove debug code and console logs
- [ ] Validate all user inputs
- [ ] Sanitize data from API
- [ ] Use HTTPS only
- [ ] Set proper CSP headers
- [ ] Implement rate limiting
- [ ] Audit dependencies regularly

### Environment Security

- Never commit API keys or secrets
- Use environment variables for configuration
- Validate environment variables at build time

## 🐛 Troubleshooting

### Common Issues

**Build Errors**

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

**API Connection Issues**

- Check API is running at correct URL
- Verify CORS settings in backend
- Check browser network tab for errors

**TypeScript Errors**

```bash
# Check types
npm run check

# Update type definitions
npm update @types/*
```

**Styling Issues**

- Ensure Tailwind classes are spelled correctly
- Check if custom CSS conflicts with Tailwind
- Verify component imports

## 📚 Resources

### Documentation

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)

### Component Libraries

- [Radix UI](https://www.radix-ui.com/) - Headless components
- [Lucide Icons](https://lucide.dev/) - Icon library
- [React Hook Form](https://react-hook-form.com/) - Form handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow the existing code style
4. Test your changes thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style Guidelines

- Use TypeScript for all new files
- Follow existing naming conventions
- Add proper type annotations
- Keep components small and focused
- Use Tailwind classes for styling

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🎯 Performance

### Optimization Features

- **Tree Shaking** - Dead code elimination
- **Code Splitting** - Lazy loading of routes
- **Image Optimization** - WebP support with fallbacks
- **CSS Purging** - Unused styles removed
- **Bundle Analysis** - Optimized chunk sizes

### Performance Metrics

- Lighthouse Score: 95+ (Performance, Accessibility, SEO)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Bundle Size: < 500KB gzipped

---

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Node Version**: 18+  
**React Version**: 18.3+
