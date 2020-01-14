import {HttpModule, Module} from '@nestjs/common';
import {EntitiesController} from './entities.controller';
import {EntitiesService} from './entities.service';

@Module({
    imports: [HttpModule],
    controllers: [EntitiesController],
    providers: [EntitiesService],
})
export class EntitiesModule {
}
