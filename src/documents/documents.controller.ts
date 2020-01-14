import {Body, Controller, Logger, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {DocumentsService} from './documents.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {DocumentDto} from './dto/document.dto';

// tslint:disable:no-console

@Controller('documents')
export class DocumentsController {
    private logger: Logger = new Logger('DocumentsController');

    constructor(private readonly documentsService: DocumentsService) {
    }

    // POST https://sandbox.alloy.co/v1/documents
    @Post()
    describe(@Body() documentDto: DocumentDto) {
        return this.documentsService.describe(documentDto);
    }

    // PUT https://sandbox.alloy.co/v1/documents/<document_token>
    @Post('/:documentToken')
    @UseInterceptors(FileInterceptor('blob'))
    upload(@UploadedFile() file, @Param('documentToken') documentToken: string) {
        return this.documentsService.upload(file, documentToken);
    }

    @Post('/sms/:phoneNumber')
    sms(@Param('phoneNumber') phoneNumber: string) {
        return this.documentsService.sms();
    }
}
