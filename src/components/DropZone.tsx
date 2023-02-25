import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '.';

const DropZone = () => {
   const [error, setError] = useState({
      message: '',
   });
   const [uploadedImage, setUploadedImage] = useState<
      string | ArrayBuffer | null
   >(null);
   useEffect(() => {
      const timerId = setTimeout(() => {
         setError(() => ({
            message: '',
         }));
      }, 5000);

      return () => {
         clearTimeout(timerId);
      };
   }, [error.message]);
   const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxFileSize = 1 * 1024 * 102422; // 1MB in bytes

      if (
         file &&
         allowedTypes.includes(file.type) &&
         file.size <= maxFileSize
      ) {
         const reader = new FileReader();
         reader.onload = () => {
            setUploadedImage(reader.result);
         };
         reader.readAsDataURL(file);
      } else if (
         file &&
         allowedTypes.includes(file.type) &&
         file.size > maxFileSize
      ) {
         setError(() => ({ message: 'File above 1mb' }));
      } else {
         const message = file
            ? `Invalid file type. Only JPEG and PNG are supported.`
            : 'No file selected.';
         setError(() => ({ message }));
      }
   }, []);
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
   });

   return (
      <>
         {uploadedImage ? (
            <div className="border shadow-md min-h-[280px] overflow-hidden rounded-2xl max-w-[526px] relative max-h-80">
               <img
                  src={`${uploadedImage}`}
                  alt="uploaded"
                  className="mx-auto object-contain image-height"
               />
               <div className="bg-white w-full px-4 py-3 absolute bottom-0 left-0 border-t">
                  <span
                     className="flex items-center w-fit cursor-pointer"
                     onClick={() => {
                        setUploadedImage('');
                     }}
                  >
                     <img src="/delete.svg" alt="" className="scale-75" />
                     <span className="font-semibold text-sm ml-2 text-[#A80000]">
                        Delete & re-upload
                     </span>
                  </span>
               </div>
            </div>
         ) : (
            <Card heading="Upload cover image">
               <div
                  className="border text-center border-black border-dashed my-4 rounded-md w-[400px] pt-10 h-[170px] pb-12"
                  {...getRootProps()}
                  style={{
                     borderColor: error.message === '' ? '#000000' : '#A80000',
                  }}
               >
                  <input {...getInputProps()} accept="image/jpeg, image/png" />
                  <>
                     {error.message === '' ? (
                        <>
                           <img
                              src="/image 308.svg"
                              alt="upload"
                              className="mx-auto scale-[0.8]"
                           />
                           {isDragActive ? (
                              <p className="text-xs font-bold leading-loose">
                                 Drop the files here ...
                              </p>
                           ) : (
                              <>
                                 <p className="text-xs font-bold leading-loose">
                                    Upload cover image
                                 </p>
                                 <p className="text-xs font-[#979797] leading-loose opacity-60">
                                    16:9 ratio is recommended. Max image size
                                    1mb
                                 </p>
                              </>
                           )}
                        </>
                     ) : (
                        <p className="text-xs text-red-500 font-semibold leading-loose mt-8">
                           {error.message}
                        </p>
                     )}
                  </>
               </div>
            </Card>
         )}
      </>
   );
};

export default DropZone;
