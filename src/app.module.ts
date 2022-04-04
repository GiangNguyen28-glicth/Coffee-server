import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CoffeeModule } from './coffee/coffee.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [UserModule, PostsModule, CoffeeModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
