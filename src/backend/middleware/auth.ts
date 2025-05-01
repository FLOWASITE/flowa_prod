
import { Request, Response, NextFunction } from 'express';
import { supabase } from '../server';

// Define custom interface to extend Express Request
interface AuthenticatedRequest extends Request {
  apiKey?: string;
  permissions?: string[];
}

// Authentication middleware
const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Get API key from header
    const apiKey = req.headers.authorization?.split('Bearer ')[1];

    if (!apiKey) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'API key is required'
      });
    }

    // Verify API key against database
    const { data: apiKeyData, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .eq('active', true)
      .single();

    if (error || !apiKeyData) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid API key'
      });
    }

    // Check if API key is expired
    if (apiKeyData.expires_at && new Date(apiKeyData.expires_at) < new Date()) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'API key has expired'
      });
    }

    // Add API key info to request
    req.apiKey = apiKeyData.key;
    req.permissions = apiKeyData.permissions;

    // Check for specific permissions if needed
    const endpoint = req.path.split('/')[1] || '';
    const method = req.method.toLowerCase();
    const requiredPermission = `${endpoint}:${method === 'get' ? 'read' : 'write'}`;
    
    if (!apiKeyData.permissions.includes(requiredPermission) && !apiKeyData.permissions.includes('admin')) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Missing required permission: ${requiredPermission}`
      });
    }
    
    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during authentication'
    });
  }
};

export default authMiddleware;
