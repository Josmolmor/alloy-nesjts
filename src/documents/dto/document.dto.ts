import {Note} from './note.dto';

type DocumentType = 'contract' | 'license' | 'passport' | 'utility';

export class DocumentDto {
    document_token?: string;
    type: DocumentType;
    name: string;
    extension: string;
    uploaded: boolean;
    timestamp: number;
    approved: boolean;
    approval_agent_email: string;
    approval_timestamp: number;
    notes?: Note[];
}
