import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
    providers: [ConfigurationService, CloudinaryService],
    exports: [ConfigurationService, CloudinaryService],
})
export class ConfigurationModule {}
