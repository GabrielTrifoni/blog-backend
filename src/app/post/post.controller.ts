import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get('')
    async findAll(@Query('category') category?: string) {
        return await this.postService.findAll(category);
    }

    @Get(':id')
    async findOneById(@Param('id', ParseIntPipe) id: number) {
        return await this.postService.findOneById(id);
    }

    @Post()
    async create(@Body() input: CreatePostDto) {
        return await this.postService.create(input);
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdatePostDto) {
        return await this.postService.update(id, input);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        return await this.postService.delete(id);
    }
}
