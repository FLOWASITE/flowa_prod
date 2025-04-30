
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Badge } from "lucide-react";

const formSchema = z.object({
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
});

export function Register() {
  const { currentLanguage } = useLanguage();
  const isVietnamese = currentLanguage.code === 'vi';
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the registration data to your backend
    // After successful registration, navigate to the account type selection page
    navigate("/account-type");
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2">
            {isVietnamese ? 'Đăng ký sử dụng Flowa' : 'Register to use Flowa'}
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            {isVietnamese 
              ? 'Điền thông tin của bạn để bắt đầu sử dụng nền tảng Flowa.' 
              : 'Fill in your information to start using the Flowa platform.'}
          </p>
          
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isVietnamese ? 'Tên công ty' : 'Company Name'}</FormLabel>
                      <FormControl>
                        <Input placeholder={isVietnamese ? 'Nhập tên công ty' : 'Enter company name'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isVietnamese ? 'Họ và tên' : 'Full Name'}</FormLabel>
                      <FormControl>
                        <Input placeholder={isVietnamese ? 'Nhập họ và tên' : 'Enter full name'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isVietnamese ? 'Số điện thoại' : 'Phone Number'}</FormLabel>
                      <FormControl>
                        <Input placeholder={isVietnamese ? 'Nhập số điện thoại' : 'Enter phone number'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  <Badge className="mr-2 h-5 w-5" />
                  {isVietnamese ? 'Đăng ký và chọn gói' : 'Register and select plan'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
