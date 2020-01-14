import {Body, Controller, Logger, Post} from '@nestjs/common';
import {EvaluationsService} from './evaluations.service';
import {VerifyingDto} from './dto/evaluation.dto';
// tslint:disable:no-console

@Controller('evaluations')
export class EvaluationsController {
    private logger: Logger = new Logger('DocumentsController');

    constructor(private readonly evaluationsService: EvaluationsService) {
    }

    @Post()
    verify(@Body() documentVerificationData: VerifyingDto) {
        return this.evaluationsService.verify(documentVerificationData);
    }
}
