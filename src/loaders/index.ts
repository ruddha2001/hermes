import express, { Request, Response } from "express";
import { configuration } from "../config";
import routes from "../api";
import { join } from "path";

export const app = express();

// Parse JSON
app.use(express.json());

// Parse urlencoded data
app.use(express.urlencoded({ extended: true }));

// Serve the client
app.use(express.static(join(__dirname, "..", "..", "build", "client")));
app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "..", "..", "build", "client", "index.html"));
});

// Use API endpoints
app.use(`${configuration.API_PREFIX}${configuration.VERSION}`, routes());
