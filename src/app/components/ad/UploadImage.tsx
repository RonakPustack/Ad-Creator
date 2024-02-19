import { useState } from 'react';

export default function UploadImage({ onChange: onImageUpdate }: any) {
    const [imageUrl, setImageUrl] = useState('');
    const [base64String, setBase64String] = useState('');

    const onImageSelect = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            const imageUrl = e.target.result
            setImageUrl(imageUrl);
            setBase64String(imageUrl.split(",")[1]);
            console.log(imageUrl.substring(0, 10))
            onImageUpdate(imageUrl.split(",")[1]);
        };

        reader.readAsDataURL(file);
    }

    return (
        <div className="flex flex-col p-6 rounded-lg bg-white mb-4">
            <div className="flex place-items-center mb-4">
                <p className="mr-2 text-white bg-green-800 rounded-full text-1xl h-5 w-5"><center>✔︎</center></p>
                <p className="text-black font-bold text-2xl">Upload image</p>
            </div>
            <input type="file" className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-green-50 file:text-green-700
      hover:file:bg-green-100
    " onChange={onImageSelect} />
            <center>
                <div className='mt-5'>
                    {imageUrl && <img src={imageUrl} className='rounded-lg' alt="Uploaded" style={{ maxWidth: '100%' }} />}
                </div>
            </center>
        </div>
    );
}