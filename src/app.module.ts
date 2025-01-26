import { Module } from '@nestjs/common';
import { TelegrafModule, TelegrafModuleOptions } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './common/configuration.module';
import configuration, { ConfigurationService } from './common/configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot_module';
import { session } from 'telegraf';
import { ResumeModule } from './resume/resume.module';

const telegrafFactory = {
    async useFactory(): Promise<TelegrafModuleOptions> {
        return {
            token: ConfigurationService.configuration.bot.token,
            middlewares: [
                session(),
                async (ctx, next) => {
                    console.log('Middleware: update type:', ctx.updateType);
                    await next();
                },
            ],
        };
    },
};

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        ConfigurationModule,
        TelegrafModule.forRootAsync(telegrafFactory),
        TypeOrmModule.forRootAsync({ useFactory: ConfigurationService.ormconfig }),
        UserModule,
        AuthModule,
        BotModule,
        ResumeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
