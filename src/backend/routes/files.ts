
import { Router } from 'express';
import { supabase } from '../server';

const router = Router();

// Get all files with optional filtering by platform
router.get('/', async (req, res) => {
  try {
    const { platform_id, search } = req.query;
    
    let query = supabase.from('files').select('*');
    
    if (platform_id) {
      query = query.eq('platform_id', platform_id);
    }
    
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching files:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Get file by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'File not found'
        });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching file by ID:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Create new file
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('files')
      .insert(req.body)
      .select();
    
    if (error) throw error;
    
    return res.status(201).json(data[0]);
  } catch (error: any) {
    console.error('Error creating file:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Update file
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('files')
      .update(req.body)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'File not found'
      });
    }
    
    return res.status(200).json(data[0]);
  } catch (error: any) {
    console.error('Error updating file:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Delete file
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // First get the file to check if it has a file path
    const { data: fileData, error: fetchError } = await supabase
      .from('files')
      .select('file_path')
      .eq('id', id)
      .single();
      
    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'File not found'
        });
      }
      throw fetchError;
    }
    
    // If the file has a file path, delete it from storage
    if (fileData.file_path) {
      const filePathParts = fileData.file_path.split('/');
      const fileName = filePathParts[filePathParts.length - 1];
      
      // Delete from storage if it's a Supabase storage URL
      if (fileData.file_path.includes('storage/v1')) {
        const { error: storageError } = await supabase.storage
          .from('file_assets')
          .remove([`uploads/${fileName}`]);
          
        if (storageError) {
          console.error('Error deleting file from storage:', storageError);
        }
      }
    }
    
    // Delete the file record from the database
    const { error } = await supabase
      .from('files')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting file:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Search files by tags
router.get('/search/tags', async (req, res) => {
  try {
    const { tag } = req.query;
    
    if (!tag) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Tag parameter is required'
      });
    }
    
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .contains('tags', [String(tag)])
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error searching files by tags:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

export default router;
