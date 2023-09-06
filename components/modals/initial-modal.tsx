'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import ClientOnly from '@/components/client-only';
import FileUpload from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

const formSchema = z.object({
  name: z.string().min(1, {
    message: '서버 이름을 입력해주세요.',
  }),
  imageUrl: z.string().min(1, {
    message: '서버 이미지 URL을 입력해주세요.',
  }),
});

export function InitialModal() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const isDisabledSubmitButton = !form.formState.isValid || isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values);

      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error(`[InitialModal] ${error}`);
    }
  };

  return (
    <ClientOnly>
      <Dialog open>
        <DialogContent className="p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-2xl">서버를 만들어보세요</DialogTitle>
            <DialogDescription>
              서버를 만들면 친구들과 함께 어울리는 공간이 만들어져요
              <br />내 서버를 만들고 대화를 시작해보세요
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="px-6 space-y-8">
                <div className="flex items-center justify-center text-center">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            endpoint="serverImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">서버 이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동의 서버" disabled={isSubmitting} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="px-6 py-4">
                <Button disabled={isDisabledSubmitButton}>서버 만들기</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
}
