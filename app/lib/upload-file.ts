export const uploadFile = (
  signedUrl: string,
  file: File,
  onProgress: (percentage: number) => void,
) => {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('PUT', signedUrl)
    xhr.setRequestHeader('Content-Type', file.type)

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100
        onProgress(percentage)
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve()
      } else {
        reject(new Error('Upload failed'))
      }
    }

    xhr.onerror = () => {
      reject(new Error('Upload failed'))
    }

    xhr.send(file)
  })
}
