import dotenv from "dotenv";
import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from '../config.json';
import process from 'process';
import { generateRecipe } from './ai';

// Loads API key from .env
dotenv.config();

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || '127.0.0.1';

// Set up web app
const app = express();

// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware that allows for access from other domains
app.use(cors());
// for logging errors (print to terminal)
app.use(morgan('dev'));

const __dirname = new URL('.', import.meta.url).pathname;

// ====================================================================
// ========================= API ROUTES ===============================
// ====================================================================

app.post('/api/recipes', async (req: Request, res: Response) => {
  // FIXME Discuss exactly the data types that is passed and through what methods
  console.log(req.body);
  try {
    const recipe = await generateRecipe(req.body);
    res.json(recipe);
  } catch (err) {
    if (err instanceof Error && err.message === 'API key is missing') { 
      res.status(500).json({ error: err.message }); 
    } else if (err instanceof Error && err.message === 'Empty or missing ingredients array') {
    res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'ROUTE_NOT_FOUND' });
});

// Serve the built frontend
// app.use(express.static(path.join(__dirname, "../../frontend/budget-fridge/dist")));

// SPA fallback
// If the route exists in the frontend and not in the backend,
// it will use that
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../frontend/budget-fridge/dist/index.html"));
// });

// start server
const server = app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server.');
    process.exit();
  });
});