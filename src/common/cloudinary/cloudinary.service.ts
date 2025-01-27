import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import * as process from 'node:process';

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    // Метод для загрузки изображения в Cloudinary
    async uploadToCloudinary(fileUrl: string, publicId?: string): Promise<any> {
        try {
            const uploadResult = await cloudinary.uploader.upload(fileUrl, {
                public_id: publicId || undefined,
                folder: 'photos',
            });
            return uploadResult;
        } catch (error) {
            console.error('Ошибка при загрузке в Cloudinary:', error);
            throw error;
        }
    }

    // Метод для получения оптимизированного URL
    getOptimizedUrl(publicId: string): string {
        return cloudinary.url(publicId, {
            fetch_format: 'auto',
            quality: 'auto',
        });
    }

    // Метод для трансформации изображения (обрезка, изменение размера и т.д.)
    getTransformedUrl(publicId: string, options: Record<string, any>): string {
        return cloudinary.url(publicId, options);
    }
}
