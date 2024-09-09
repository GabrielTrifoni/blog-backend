import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { BlogPost } from '../entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
