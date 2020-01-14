import {HttpService, Injectable, Logger} from '@nestjs/common';
import {Observable} from 'rxjs';
import {setCredentials} from '../../utils/credentials';
import {map} from 'rxjs/operators';
import {AxiosResponse} from 'axios';
import {VerifyingDto} from './dto/evaluation.dto';
// tslint:disable:no-console

@Injectable()
export class EvaluationsService {
    constructor(private readonly httpService: HttpService) {
    }

    private alloyBaseURL = 'https://sandbox.alloy.co/v1/';
    private logger: Logger = new Logger('DocumentsService');

    // POST https://sandbox.alloy.co/v1/evaluations \
    async verify(documentVerificationData: VerifyingDto): Promise<Observable<AxiosResponse>> {
        this.logger.log(documentVerificationData);
        return this.httpService.post(`${this.alloyBaseURL}evaluations`, documentVerificationData,
            {
                headers: {
                    'authorization': `Basic ${setCredentials('wEethIy3GajNFSfCHYC3t6zjuKNiops7', 'LmWQ2UCV7W9RUHiVOz0iVLfkhQjSJxYD')}`,
                    'Content-Type': 'application/json',
                },
            })
            .pipe(
                map(response => {
                    return response.data;
                }),
            );
    }
}
