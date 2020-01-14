import {HttpService, Injectable, Logger} from '@nestjs/common';
import {DocumentDto} from './dto/document.dto';
import {map} from 'rxjs/operators';
import {setCredentials} from '../../utils/credentials';
import {Observable} from 'rxjs';
import {AxiosResponse} from 'axios';
// tslint:disable:no-console

@Injectable()
export class DocumentsService {
    constructor(private readonly httpService: HttpService) {
    }

    private alloyBaseURL = 'https://sandbox.alloy.co/v1/';
    private logger: Logger = new Logger('DocumentsService');

    async describe(documentDto: DocumentDto): Promise<Observable<AxiosResponse>> {
        return this.httpService.post(`${this.alloyBaseURL}documents`, documentDto,
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

    async upload(imageToUpload: File, documentToken: string): Promise<Observable<AxiosResponse>> {
        return this.httpService.put(`${this.alloyBaseURL}documents/${documentToken}`, imageToUpload,
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

    sms(): boolean {
        const validValues = ['true', 'false'];
        const rand = validValues[Math.floor(Math.random() * validValues.length)];
        return rand === 'true';
    }
}
