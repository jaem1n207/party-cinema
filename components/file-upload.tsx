'use client';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

import { X } from 'lucide-react';
import Image from 'next/image';

import { useToast } from '@/components/ui/use-toast';
import { UploadDropzone } from '@/lib/uploadthing';

import '@uploadthing/react/styles.css';

type FileUploadProps = {
  /**
   * @link api/uploadthing/core.ts
   */
  endpoint: keyof OurFileRouter;
  value: string;
  onChange: (url?: string) => void;
};

export default function FileUpload({ endpoint, value, onChange }: FileUploadProps) {
  const { toast } = useToast();

  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative w-20 h-20">
        <Image fill sizes="80px" src={value} alt="Upload" className="object-cover rounded-full" />
        <button
          onClick={() => onChange('')}
          className="absolute top-0 right-0 p-1 rounded-full shadow-sm text-primary-foreground bg-primary"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
        let description = error.message;

        switch (error.code) {
          case 'BAD_REQUEST':
            description = '파일은 1개만 업로드할 수 있어요.';
            break;
          case 'TOO_LARGE':
            description = '4MB 이하의 파일을 업로드해주세요.';
            break;
        }

        toast({
          title: '업로드에 실패했어요.',
          description,
        });
      }}
      content={{
        button({ ready }) {
          if (ready) return '올리기';

          return '준비 중...';
        },
        allowedContent({ ready, fileTypes, isUploading }) {
          if (!ready) return '허용 가능한 파일 형식을 확인 중이예요';
          if (isUploading) return '파일을 업로드하는 중이예요...';
          return <div className="text-basic">업로드 가능한 항목: {fileTypes.join(', ')}</div>;
        },
        label: (
          <div className="font-semibold text-basic">파일을 여기에 끌어다 놓거나 클릭해보세요.</div>
        ),
      }}
      className="cursor-pointer border-secondary-foreground ut-button:ut-uploading:after:bg-primary ut-button:bg-primary ut-button:ut-readying:bg-primary/50 text-primary-foreground ut-button:ut-uploading:bg-primary/30 ut-button:ut-uploading:text-gray-900 ut-button:ut-uploading:cursor-not-allowed ut-label:ut-uploading:cursor-not-allowed"
    />
  );
}
