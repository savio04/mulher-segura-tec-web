import { NextFunction, Request, Response } from "express";

export function errorMiddleware(err: Error & { statusCode?: number }, _request: Request, response: Response, _next: NextFunction) {
  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno no servidor';

  response.status(status).json({ error: message });
}
