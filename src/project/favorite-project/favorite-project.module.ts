import { Module } from '@nestjs/common';
import { FavoriteProjectService } from './favorite-project.service';
import { FavoriteProjectController } from './favorite-project.controller';
import { DatabaseService } from '@database/database.service';

@Module({
  providers: [FavoriteProjectService, DatabaseService],
  controllers: [FavoriteProjectController],
  exports: [FavoriteProjectService],
})
export class FavoriteProjectModule {}
