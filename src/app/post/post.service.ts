import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(BlogPost)
        private readonly repository: Repository<BlogPost>
    ) { }

    async findAll(category?: string) {
        const queryBuilder = this.repository.createQueryBuilder('post');

        if (category) {
            queryBuilder.where('post.category = :category', { category });
        }

        return await queryBuilder.getMany();
    }

    async findOneById(id: number) {
        const post = await this.repository.findOneBy({ id });

        if (!post) {
            throw new NotFoundException('Post with specified id does not exist.');
        }

        return post;
    }

    async create(newPost: CreatePostDto) {
        const post = await this.repository.findOne({
            where: { title: newPost.title },
        });

        if (post) {
            throw new ConflictException('The post title already exists.');
        }

        return await this.repository.save({
            ...newPost,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(id: number, input: UpdatePostDto) {
        const post = await this.repository.findOneBy({ id });

        if (!post) {
            throw new NotFoundException('Post with specified id does not exist.');
        }

        return await this.repository.save({
            ...post,
            ...input,
        });
    }

    async delete(id: number) {
        const post = await this.repository.findOneBy({ id });

        if (!post) {
            throw new NotFoundException('Post with specified id does not exist.');
        }

        return await this.repository.delete(id);
    }
}
