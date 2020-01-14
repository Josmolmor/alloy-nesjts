import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsController } from './documents/documents.controller';
import { DocumentsService } from './documents/documents.service';
import { DocumentsModule } from './documents/documents.module';
import { AppGateway } from './app.gateway';
import { EntitiesModule } from './entities/entities.module';
import {EntitiesController} from './entities/entities.controller';
import {EntitiesService} from './entities/entities.service';
import { EvaluationsModule } from './evaluations/evaluations.module';

@Module({
  imports: [DocumentsModule, EntitiesModule, HttpModule, EvaluationsModule],
  controllers: [AppController, DocumentsController, EntitiesController],
  providers: [AppService, DocumentsService, EntitiesService, AppGateway],
})
export class AppModule {}
