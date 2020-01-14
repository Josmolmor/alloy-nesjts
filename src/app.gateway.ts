import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {Server, Socket} from 'socket.io';

interface IframeInfo {
    document_token_front: string;
    document_token_back: string;
    evaluation_token: string;
    entity_token: string;
}

interface HandleMobileFlowType {
    room: string;
    enabled: boolean;
}

interface Picture {
    url: string;
    valid: undefined | boolean;
}

interface HandleMobileFlowFinish {
    room: string;
    pictureFront: Picture;
    pictureBack: Picture;
    iframeInfo: IframeInfo;
}

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
    private logger: Logger = new Logger('AppGateway');

    afterInit(server: any): any {
        this.logger.log('Gateway initialized');
    }

    handleConnection(client: any, ...args: any[]): any {
        return null;
    }

    handleDisconnect(client): void {
        if (client.roomId) {
            client.to(client.roomId['0']).emit('mobileFlowStatus', false);
        }
    }

    @SubscribeMessage('joinRoom')
    joinRoom(client, room: string): void {
        this.logger.log(`JOIN ROOM => ${room}`);
        client.join(room);
        client.roomId = {[0]: room};
    }

    @SubscribeMessage('cancelMobileFlow')
    cancelMobileFlow(client: Socket, room: string): void {
        client.to(room).emit('mobileFlowCanceled');
    }

    @SubscribeMessage('handleMobileFlow')
    handleMobileFlow(client: Socket, payload: HandleMobileFlowType): void {
        this.logger.log(`HANDLE FLOW => ${payload.room} ${payload.enabled}`);
        client.to(payload.room).emit('mobileFlowStatus', payload.enabled);
    }

    @SubscribeMessage('finishMobileFlow')
    finishMobileFlow(client: Socket, payload: HandleMobileFlowFinish): void {
        this.logger.log(`FINISH FLOW => ${payload}`);
        client.to(payload.room).emit('mobileFlowFinished', payload.pictureFront, payload.pictureBack);
        client.to(payload.room).emit('mobileFlowStatus', false);
        client.to(payload.room).emit('iframeInfo', payload.iframeInfo);
    }

    @SubscribeMessage('error')
    error(client: Socket): void {
        this.logger.log('Received error from the client', client.id);
    }
}
