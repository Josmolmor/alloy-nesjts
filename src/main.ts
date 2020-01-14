import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle('Alloy backend connection')
        .setDescription('Developed by Z1 for Alloy ID validation flow')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3030);
}

bootstrap();
