import express, { json, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config.json';
import process from 'process';

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

// ====================================================================
// ========================= API ROUTES ===============================
// ====================================================================

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'ROUTE_NOT_FOUND' });
});

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
