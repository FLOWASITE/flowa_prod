
import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon, Save } from 'lucide-react';
import { Content } from '@/types/content';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

type PostFormValues = {
  text: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'threads' | 'linkedin';
  scheduledDate: Date;
  scheduledTime: string;
};

type SchedulePostDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (post: Partial<Content>) => void;
  initialData?: Content;
  selectedDate?: Date;
  selectedTime?: string;
};

export const SchedulePostDialog: React.FC<SchedulePostDialogProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  initialData,
  selectedDate,
  selectedTime,
}) => {
  const isEditing = !!initialData;
  
  let defaultDate: Date | undefined;
  let defaultTime: string | undefined;
  
  if (initialData?.scheduledAt) {
    const date = new Date(initialData.scheduledAt);
    defaultDate = date;
    defaultTime = format(date, 'HH:mm');
  } else if (selectedDate) {
    defaultDate = selectedDate;
    defaultTime = selectedTime || '09:00';
  }

  const form = useForm<PostFormValues>({
    defaultValues: {
      text: initialData?.text || '',
      platform: initialData?.platform || 'facebook',
      scheduledDate: defaultDate,
      scheduledTime: defaultTime || '09:00',
    },
  });

  const handleSubmit = (values: PostFormValues) => {
    // Combine date and time
    const [hours, minutes] = values.scheduledTime.split(':').map(Number);
    const scheduledAt = values.scheduledDate ? new Date(values.scheduledDate) : new Date();
    scheduledAt.setHours(hours, minutes, 0, 0);

    const updatedPost: Partial<Content> = {
      ...initialData,
      text: values.text,
      platform: values.platform,
      scheduledAt,
      status: 'scheduled',
    };

    onSave(updatedPost);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nền tảng</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="threads">Threads</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập nội dung bài viết..."
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: vi })
                            ) : (
                              <span>Chọn ngày</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={vi}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduledTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời gian</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Hủy
                </Button>
              </DialogClose>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Lưu
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
