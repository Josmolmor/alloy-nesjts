import {Body, Controller, Logger, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {EntitiesService} from './entities.service';
import {FileInterceptor} from '@nestjs/platform-express';

// tslint:disable:no-console

@Controller('entities')
export class EntitiesController {
    private logger: Logger = new Logger('DocumentsController');

    constructor(private readonly entitiesService: EntitiesService) {
    }

    // POST https://sandbox.alloy.co/v1/entities/<entity_token>/documents
    @Post('/:entityToken/documents')
    describeWithToken(@Body() documentDto: any, @Param('entityToken') entityToken: string) {
        return this.entitiesService.describe(entityToken, documentDto);
    }

    // PUT https://sandbox.alloy.co/v1/entities/<entity_token>/documents/<document_token>
    @Post('/:entityToken/documents/:documentToken')
    @UseInterceptors(FileInterceptor('blob'))
    upload(@UploadedFile() file, @Param('entityToken') entityToken: string, @Param('documentToken') documentToken: string) {
        return this.entitiesService.upload(file, entityToken, documentToken);
    }
}
