'use client';

import { OurFileRouter } from '@/app/api/uploadthing/core';
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
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
