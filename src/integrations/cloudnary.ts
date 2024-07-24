import { v2 as cloudinary } from 'cloudinary'

export default function Upload(file: any, folder: string) {
    return new Promise((resolve, reject) => {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        })

        // Converta os dados do arquivo em uma string base64
        const fileData = file.data.toString('base64')

        // Faça o upload dos dados para o Cloudinary
        cloudinary.uploader.upload(`data:${file.mimetype};base64,${fileData}`, { folder: folder }, (error: any, result: any) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}


export interface CloudinaryUploadResult {
    asset_id: string
    public_id: string
    version: number
    version_id: string
    signature: string
    width: number
    height: number
    format: string
    resource_type: string
    created_at: string
    tags: string[]
    bytes: number
    type: string
    etag: string
    placeholder: boolean
    url: string
    secure_url: string
    folder: string
    api_key: string
}