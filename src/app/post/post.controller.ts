import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get('')
    findAll() {
        return
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return
    }

    @Post()
    async create(@Body() input: CreatePostDto) {
        const post = await this.postService.create(input);

        return post;
    }

    @Patch(':id')
    update(@Param('id') id, @Body() input: UpdatePostDto) {
        return
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
    }
}
