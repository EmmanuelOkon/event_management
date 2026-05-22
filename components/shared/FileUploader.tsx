"use client";

import { useDropzone } from "@uploadthing/react";
import { ImagePlus, X } from "lucide-react";
import { Dispatch, MouseEvent, SetStateAction, useCallback } from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  routeConfig?: Parameters<typeof generatePermittedFileTypes>[0];
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  routeConfig,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [onFieldChange, setFiles],
  );

  const removeImage = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onFieldChange("");
      setFiles([]);
    },
    [onFieldChange, setFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: routeConfig
      ? generateClientDropzoneAccept(
          generatePermittedFileTypes(routeConfig).fileTypes,
        )
      : generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <div
      {...getRootProps()}
      className=" bg-dark-3 relative overflow-hidden rounded-none bg-grey-50 h-full"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center relative border border-border rounded-none overflow-hidden">
          <img
            src={imageUrl}
            alt="image"
            className="w-full object-cover aspect-[21/9] "
          />
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={removeImage}
            className="absolute right-3 top-3 h-8 w-8 rounded-none cursor-pointer p-0 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex aspect-[21/9] cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-card text-center transition-all duration-300 hover:border-black/50 rounded-none">
          <div className="flex h-12 w-12 items-center justify-center rounded-none bg-muted">
            <ImagePlus className="h-5 w-5 text-muted-foreground" />
          </div>

          <h3 className="mb-2mt-2">Drop an image, or click to upload</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            PNG, JPG up to 4MB
          </p>
        </div>
      )}
    </div>
  );
}
