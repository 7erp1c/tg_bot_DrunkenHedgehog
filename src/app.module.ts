import { Module } from '@nestjs/common';
import { TelegrafModule, TelegrafModuleOptions } from 'nestjs-telegraf';
import { EchoUpdate } from './scene/echo.update';

import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './common/configuration.module';
import configuration, {
  ConfigurationService,
} from './common/configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

const telegrafFactory = {
  async useFactory(): Promise<TelegrafModuleOptions> {
    return {
      token: ConfigurationService.configuration.bot.token,
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
    UserModule,
    TelegrafModule.forRootAsync(telegrafFactory),
    TypeOrmModule.forRootAsync({ useFactory: ConfigurationService.ormconfig }),
  ],
  controllers: [],
  providers: [EchoUpdate],
})
export class AppModule {}
