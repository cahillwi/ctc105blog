import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';
import { IsAuthenticatedGuard } from '../auth.module/is-authenticated-guard';
import { IsNotEmpty } from 'class-validator';
import { getUserById } from '../auth-module/okta-client';
import { User } from '../user.module/user-controller';

export class BlogPost {
 @ApiModelProperty() // used to generate Swagger documentation that BlogPost model contains id of type number
 id: number;


 @ApiModelProperty()
 authorId: string;


 @ApiModelProperty()
 title: string;


 @ApiModelProperty()
 content: string;
}

export class BlogPostDto {
    @ApiModelProperty()
    @IsNotEmpty()
    title: string;
   
   
    @ApiModelProperty()
    @IsNotEmpty()
    content: string;
}

export const blogPosts = new Array<BlogPost>();


@Controller('blog-posts')
export default class BlogPostController {
 @Get()
 @ApiResponse({ type: BlogPost, status: 200, isArray: true })
 findAll(): Array<BlogPost> {
   return blogPosts;
 }


 @Post()
 @ApiResponse({ type: BlogPost, status: 201 })
 @UseGuards(IsAuthenticatedGuard)
 create(@Body() blogPostDto: BlogPostDto, @Req() req): BlogPost {
   const { content, title } = blogPostDto;
   const id = blogPosts.length + 1;
   const { userId } = req['auth'];


   const newBlogPost: BlogPost = { id, title, content, authorId: userId };
   blogPosts.push(newBlogPost);


   return newBlogPost;
 }


 @Get(':id/author')
 async findAuthor(@Param('id') blogPostId: string): Promise<User> {
   const blogPost = blogPosts.filter(post => post.id.toString() === blogPostId)[0];
   if (!blogPost) {
      throw new NotFoundException('No such blog post');
   }
   return await getUserById(blogPost.authorId);
 }
}