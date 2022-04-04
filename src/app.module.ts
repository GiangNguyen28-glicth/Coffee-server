import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CoffeeModule } from './coffee/coffee.module';
import { CommentModule } from './comment/comment.module';
import { LoggerModule } from './logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [UserModule, PostsModule, CoffeeModule, CommentModule, LoggerModule,
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.DATABASE_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
