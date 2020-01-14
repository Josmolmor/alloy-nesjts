import {HttpModule, Module} from '@nestjs/common';
import {DocumentsController} from './documents.controller';
import {DocumentsService} from './documents.service';
import {setCredentials} from '../../utils/credentials';

@Module({
    imports: [HttpModule],
    controllers: [DocumentsController],
    providers: [DocumentsService],
})
export class DocumentsModule {
}
