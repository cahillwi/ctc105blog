import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './application.module';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule); // Application module created in the step before
    app.useGlobalPipes(new ValidationPipe()); // Makes use of class-validate to sanitize data entering the API


    // Creates Swagger documentation and OpenAPI console on the root path (http://localhost:3000)
    const swaggerOptions = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('/', app, document);


    await app.listen(3000);
}

bootstrap().catch(console.error);