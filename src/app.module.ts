import { Module } from '@nestjs/common';
import { PostModule } from './app/post/post.module';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
