
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { FileTopic } from '@/types';

interface PlatformDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { topicId: string; platformType: string; name: string; description: string }) => void;
  isEditing: boolean;
  topics: FileTopic[];
  defaultValues?: {
    topicId: string;
    platformType: string;
    name: string;
    description: string;
  };
}

export const PlatformDialog: React.FC<PlatformDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isEditing,
  topics,
  defaultValues = { topicId: '', platformType: 'facebook', name: '', description: '' },
}) => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues,
  });

  React.useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const onFormSubmit = (data: { topicId: string; platformType: string; name: string; description: string }) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Chỉnh sửa nền tảng' : 'Thêm nền tảng mới'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Chỉnh sửa thông tin nền tảng'
              : 'Tạo một nền tảng mới để tổ chức nội dung theo từng kênh xã hội'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topicId">Chủ đề</Label>
            <Controller
              name="topicId"
              control={control}
              rules={{ required: 'Vui lòng chọn một chủ đề' }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chủ đề" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.topicId && (
              <p className="text-sm text-red-500">{errors.topicId.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="platformType">Loại nền tảng</Label>
            <Controller
              name="platformType"
              control={control}
              rules={{ required: 'Vui lòng chọn một loại nền tảng' }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại nền tảng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="threads">Threads</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.platformType && (
              <p className="text-sm text-red-500">{errors.platformType.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Tên nền tảng</Label>
            <Input
              id="name"
              placeholder="Nhập tên nền tảng"
              {...register('name', { required: 'Tên nền tảng là bắt buộc' })}
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
              placeholder="Mô tả về nền tảng (tùy chọn)"
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
              {isEditing ? 'Cập nhật' : 'Tạo nền tảng'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
