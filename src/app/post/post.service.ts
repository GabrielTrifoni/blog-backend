import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(BlogPost)
        private readonly repository: Repository<BlogPost>
    ) { }

    async create(newPost: CreatePostDto) {
        const post = await this.repository.findOne({
            where: { title: newPost.title },
        });

        if (post) {
            throw new ConflictException('The post title already exists.');
        }

        await this.repository.save({
            ...post,
        });
    }
}
