
import { Router } from 'express';
import { supabase } from '../server';

const router = Router();

// Get all topics
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('content_topics')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching topics:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Get topic by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('content_topics')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Topic not found'
        });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching topic by ID:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Create new topic
router.post('/', async (req, res) => {
  try {
    // Set the default status to 'draft' if not specified
    const topicData = {
      ...req.body,
      status: req.body.status || 'draft'
    };
    
    const { data, error } = await supabase
      .from('content_topics')
      .insert(topicData)
      .select();
    
    if (error) throw error;
    
    return res.status(201).json(data[0]);
  } catch (error: any) {
    console.error('Error creating topic:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Update topic
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate status if it's being updated
    if (req.body.status && !['draft', 'approved', 'rejected'].includes(req.body.status)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Status must be one of: draft, approved, rejected'
      });
    }
    
    const { data, error } = await supabase
      .from('content_topics')
      .update(req.body)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Topic not found'
      });
    }
    
    return res.status(200).json(data[0]);
  } catch (error: any) {
    console.error('Error updating topic:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Delete topic
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('content_topics')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting topic:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Approve topic
router.post('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('content_topics')
      .update({
        status: 'approved',
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Topic not found'
      });
    }
    
    return res.status(200).json(data[0]);
  } catch (error: any) {
    console.error('Error approving topic:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Reject topic
router.post('/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const { data, error } = await supabase
      .from('content_topics')
      .update({
        status: 'rejected'
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Topic not found'
      });
    }
    
    // TODO: Save rejection reason to history if needed
    
    return res.status(200).json(data[0]);
  } catch (error: any) {
    console.error('Error rejecting topic:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

export default router;
