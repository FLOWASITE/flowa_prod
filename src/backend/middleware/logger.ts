
import { Request, Response, NextFunction } from 'express';
import { supabase } from '../server';

// Logger middleware
const loggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Create a copy of the original methods
  const originalSend = res.send;
  const originalJson = res.json;
  let responseBody: any = {};

  // Override res.send
  res.send = function (body: any): any {
    responseBody = body;
    return originalSend.call(this, body);
  };

  // Override res.json
  res.json = function (body: any): any {
    responseBody = body;
    return originalJson.call(this, body);
  };

  // Continue processing the request
  next();

  // After response is sent
  res.on('finish', async () => {
    const duration = Date.now() - start;
    
    try {
      // Log to the database
      await supabase.from('api_logs').insert({
        endpoint: req.originalUrl,
        method: req.method,
        status_code: res.statusCode,
        request_body: req.body ? JSON.parse(JSON.stringify(req.body)) : null,
        response_body: typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody,
        client_ip: req.ip,
        // If we have user authentication, we could add user_id here
      });
    } catch (error) {
      console.error('Error logging API request:', error);
    }

    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
};

export default loggerMiddleware;
