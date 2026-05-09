import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Imports Features
import { loginController } from './features/auth/login/login.controller.js';
import { registerController } from './features/auth/register/register.controller.js';

// Import Shared (Middlewares)
import { verifyJWT } from './shared/middlewares/auth.middleware.js';
import { globalErrorHandler } from './shared/middlewares/error.middleware.js';
import { asyncHandler } from './shared/middlewares/asyncHandler.js';
import { getProfileController,updateProfileController,updateAvatarController } from './features/profile/profile.controller.js';
import { profileRouter } from './features/profile/profile.routes.js';
import { availabilityRouter } from './features/availability/availability.routes.js';
import { sportsRouter } from './features/sports/sports.routes.js';
import { groupsRouter } from './features/groups/groups.routes.js';
import { eventsRouter } from './features/events/events.routes.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  console.log('Body:', req.body); 
  next();
});

//Public Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Keter API is running!');
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Profile Routes
app.use('/api/profile', profileRouter);
// Availability Routes
app.use('/api/availability', availabilityRouter);
// Sports Routes
app.use('/api/sports', sportsRouter);
// Groups Routes
app.use('/api/groups', groupsRouter);
// Events Routes
app.use('/api/events', eventsRouter);
// Authentication
app.post('/api/auth/login', asyncHandler(loginController));
app.post('/api/auth/register', asyncHandler(registerController));

// Protected Routes
app.get('/api/auth/me', verifyJWT, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({
    message: 'Authenticated successfully',
    user: {
      id: user.id,
      email: user.email,
      metadata: user.user_metadata
    }
  });
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});