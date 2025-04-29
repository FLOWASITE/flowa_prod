
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Topic } from '@/types';

interface TopicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; description: string }) => void;
  isEditing: boolean;
  defaultValues?: {
    name: string;
    description: string;
  };
  existingTopics?: Topic[];
}

export const TopicDialog: React.FC<TopicDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isEditing,
  defaultValues = { name: '', description: '' },
  existingTopics = [],
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues,
  });

  React.useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const onFormSubmit = (data: { name: string; description: string }) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Chỉnh sửa chủ đề' : 'Thêm chủ đề mới'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Chỉnh sửa thông tin chủ đề'
              : 'Tạo một chủ đề mới để tổ chức nội dung của bạn'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên chủ đề</Label>
            <Input
              id="name"
              placeholder="Nhập tên chủ đề"
              {...register('name', { required: 'Tên chủ đề là bắt buộc' })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Mô tả về chủ đề (tùy chọn)"
              rows={3}
              {...register('description')}
            />
          </div>

          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy bỏ
              </Button>
            </DialogClose>
            <Button type="submit">
              {isEditing ? 'Cập nhật' : 'Tạo chủ đề'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
