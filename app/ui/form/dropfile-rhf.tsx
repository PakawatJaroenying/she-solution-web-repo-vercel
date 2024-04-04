import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DropFile, { DropFileProps } from "./dropfile";
import DropFilePreview from "./dropfile-preview";
import { useLazyQuery } from "@apollo/client";
import { UploadSignUrlGQL } from "@/app/api/module/register-payment";
import { uploadFile } from "@/app/lib/upload-file";
import { useSession } from "../context/session-provider";

interface UploadResponse {
  key: string;
  signedUrl: string;
}

type DropFileRHFProps = Omit<DropFileProps, "onChange"> & {
  onUploading: () => void;
  onSuccess: (items: UploadResponse[]) => void;
  name: string;
  pairName?: string;
};

function DropFileRHF({
  name,
  pairName,
  onUploading,
  onSuccess,
  ...defaultProps
}: DropFileRHFProps) {
  const [loading, setLoading] = React.useState(false);

  const { control, watch, getValues, setValue } = useFormContext();

  const ownerId = useSession()?.user.id;

  const [getSignURLLazyQuery] = useLazyQuery(UploadSignUrlGQL, {
    fetchPolicy: "network-only",
  });
  async function getKeyAndSignedURLAsync(
    keyUpload: string,
  ): Promise<UploadResponse> {
    const resUploadSign = await getSignURLLazyQuery({
      variables: { key: keyUpload },
    });

    return {
      key: resUploadSign.data?.uploadSignUrl.key || "",
      signedUrl: resUploadSign.data?.uploadSignUrl.signedUrl || "",
    };
  }

  useEffect(() => {
    if (loading) {
      onUploading && onUploading();
    }
  }, [loading, onUploading]);

  const [downLoadProgress, setDownloadProgress] = React.useState<
    Map<string, number>
  >(new Map(getValues(name).map((file: File) => [file.name, 100])));

  // useEffect(() => {
  //   if (watch(name).length !== downLoadProgress.size) {
  //     setDownloadProgress((prev) => {
  //       const newMap = new Map(prev);
  //       watch(name).forEach((file: File) => {
  //         if (!newMap.has(file.name)) {
  //           newMap.set(file.name, 100);
  //         }
  //       });
  //       return newMap;
  //     });
  //   }
  // }, [watch, downLoadProgress, setDownloadProgress, name]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <DropFile
            {...defaultProps}
            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
              const fileList = event.target.files;

              if (fileList) {
                const oldFileLookup = new Map<string, File>(
                  field.value.map((file: File) => [file.name, file]),
                );
                const newFiles = Array.from(fileList).filter(
                  (file) => !oldFileLookup.has(file.name),
                );

                const oldFileAndNewFile = field.value.concat(newFiles);

                field.onChange(oldFileAndNewFile);

                const keyUploads = newFiles.map((file) => {
                  return `${ownerId}/payment-images/${file.name}`;
                });

                const promisesGetPresigned = keyUploads.map((keyUpload) =>
                  getKeyAndSignedURLAsync(keyUpload),
                );

                setLoading(true);
                const resGetPresigned = await Promise.all(promisesGetPresigned);

                const promisesUpload = resGetPresigned.map(
                  ({ key, signedUrl }, idx) =>
                    uploadFile(signedUrl, newFiles[idx], (percentage) => {
                      setDownloadProgress((prev) => {
                        const newMap = new Map(prev);
                        newMap.set(newFiles[idx].name, percentage);
                        return newMap;
                      });
                    }),
                );

                await Promise.all(promisesUpload);
                setLoading(false);
                onSuccess(structuredClone(resGetPresigned));
              }
            }}
          />
          {field.value.length > 0 && (
            <div className="relative -top-1 flex max-h-[300px] flex-col  gap-3 overflow-auto border-2 border-t-0 border-whitegreen">
              {field.value.map((file: File, idx: number) => (
                <DropFilePreview
                  key={idx}
                  file={file}
                  onRemove={() => {
                    const newFiles = field.value.filter(
                      (_: any, i: number) => i !== idx,
                    );
                    field.onChange(newFiles);
                    if (pairName) {
                      setValue(
                        pairName,
                        getValues(pairName).filter(
                          (_: any, i: number) => i !== idx,
                        ),
                      );
                    }
                  }}
                  downloadProgress={downLoadProgress.get(file.name) || 0}
                  downloadStatus={
                    downLoadProgress.get(file.name) === 100
                      ? "Success"
                      : "Pending"
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    />
  );
}

export default DropFileRHF;
