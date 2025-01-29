import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [TagService, DatabaseService],
  controllers: [TagController],
})
export class TagModule {}
