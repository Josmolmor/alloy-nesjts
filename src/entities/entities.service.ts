import {HttpService, Injectable, Logger} from '@nestjs/common';
import {DocumentDto} from '../documents/dto/document.dto';
import {setCredentials} from '../../utils/credentials';
import {map} from 'rxjs/operators';

// tslint:disable:no-console

@Injectable()
export class EntitiesService {
    constructor(private readonly httpService: HttpService) {
    }

    private alloyBaseURL = 'https://sandbox.alloy.co/v1/';
    private logger: Logger = new Logger('EntitiesService');

    async describe(entityToken: string, documentDto: DocumentDto) {
        return this.httpService.post(`${this.alloyBaseURL}entities/${entityToken}/documents`, documentDto,
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

    async upload(imageToUpload: File, entityToken: string, documentToken: string) {
        return this.httpService.put(`${this.alloyBaseURL}entities/${entityToken}/documents/${documentToken}`, imageToUpload,
            {
                headers: {
                    'authorization': `Basic ${setCredentials('wEethIy3GajNFSfCHYC3t6zjuKNiops7', 'LmWQ2UCV7W9RUHiVOz0iVLfkhQjSJxYD')}`,
                    'Content-Type': 'application/octet-stream',
                },
            })
            .pipe(
                map(response => {
                    return response.data;
                }),
            );
    }
}
