import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importuri Features (Asigură-te că extensia .js este prezentă pentru ESM)
import { loginController } from './features/auth/login/login.controller.js';
import { registerController } from './features/auth/register/register.controller.js';

// Importuri Shared (Middlewares)
import { verifyJWT } from './shared/middlewares/auth.middleware.js';
import { globalErrorHandler } from './shared/middlewares/error.middleware.js';
import { asyncHandler } from './shared/middlewares/asyncHandler.js';
import { profileRouter } from './features/profile/profile.routes.js';
import { availabilityRouter } from './features/availability/availability.routes.js';
import { sportsRouter } from './features/sports/sports.routes.js';
import { groupsRouter } from './features/groups/groups.routes.js';
import { eventsRouter } from './features/events/events.routes.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// 1. CORS - Trebuie să fie PRIMUL middleware pentru a gestiona corect cererile OPTIONS
app.use(cors({
  origin: '*', // Pentru hackathon, permiterea tuturor originilor elimină blocajele imediate
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Parser pentru JSON (Necesar pentru a citi req.body)
app.use(express.json()); 

// 3. Logger pentru Debugging (Vei vedea cererile în heroku logs --tail)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 4. Rute Publice de bază
app.get('/', (req: Request, res: Response) => {
  res.send('ShowUp2Move API is running on Heroku!');
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString()
  });
});

// 5. Rutele de Autentificare
// IMPORTANT: Verifică dacă în frontend folosești exact aceste căi
app.post('/api/auth/login', asyncHandler(loginController));
app.post('/api/auth/register', asyncHandler(registerController));

// 6. Rutele Modulelor (Folosind Routere)
app.use('/api/profile', profileRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/sports', sportsRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/events', eventsRouter);

// 7. Verificare Auth (Protected)
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

// 8. Handler pentru rute negăsite (Catch-all 404)
// Ajută la identificarea rutei greșite în loc de eroarea generică Vercel
app.use((req, res) => {
  console.log(`[404 NOT FOUND] ${req.method} ${req.url}`);
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} nu există pe acest server.` });
});

// 9. Middleware Global pentru Erori
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Serverul rulează pe portul ${PORT}`);
});