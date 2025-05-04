
import { Router } from 'express';
import { supabase } from '../server';

const router = Router();

// Get all content with optional filtering
router.get('/', async (req, res) => {
  try {
    const { platform, page = 1, limit = 10 } = req.query;
    
    let query = supabase.from('content').select('*');
    
    // Apply filters
    if (platform) {
      query = query.eq('platform', platform);
    }
    
    // Apply pagination
    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;
    query = query.range(from, to);
    
    // Execute query
    const { data, error, count } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return res.status(200).json({
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count || 0
      }
    });
  } catch (error: any) {
    console.error('Error fetching content:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Get content by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Content not found'
        });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching content by ID:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Create new content
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('content')
      .insert(req.body)
      .select();
    
    if (error) throw error;
    
    return res.status(201).json(data[0]);
  } catch (error: any) {
    console.error('Error creating content:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Update content
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('content')
      .update(req.body)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Content not found'
      });
    }
    
    return res.status(200).json(data[0]);
  } catch (error: any) {
    console.error('Error updating content:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Delete content
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting content:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Approve content
router.post('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const approvalDate = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('content')
      .update({
        status: 'approved',
        approved_at: approvalDate
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Content not found'
      });
    }
    
    return res.status(200).json(data[0]);
  } catch (error: any) {
    console.error('Error approving content:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Reject content 
router.post('/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const { data, error } = await supabase
      .from('content')
      .update({
        status: 'rejected'
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Content not found'
      });
    }
    
    // TODO: Lưu reason vào bảng lịch sử nếu cần
    
    return res.status(200).json(data[0]);
  } catch (error: any) {
    console.error('Error rejecting content:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Schedule content
router.post('/:id/schedule', async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduledAt } = req.body;
    
    if (!scheduledAt) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Scheduled date is required'
      });
    }
    
    const { data, error } = await supabase
      .from('content')
      .update({
        status: 'scheduled',
        scheduled_at: scheduledAt
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Content not found'
      });
    }
    
    return res.status(200).json(data[0]);
  } catch (error: any) {
    console.error('Error scheduling content:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// Mark content as published
router.post('/:id/publish', async (req, res) => {
  try {
    const { id } = req.params;
    const publishDate = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('content')
      .update({
        status: 'published',
        published_at: publishDate
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Content not found'
      });
    }
    
    return res.status(200).json(data[0]);
  } catch (error: any) {
    console.error('Error publishing content:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

export default router;
