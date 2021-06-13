import {MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import cookieParser from 'cookie-parser';
import glob from 'glob';
import {join} from 'path';

import {AuthMiddleware} from './auth.module/auth-middleware';

const controllers =
 glob.sync('*.module/*-controller.ts', { cwd: __dirname, absolute: true }) // go through all the modules containing controllers
   .map(require) // require every one of them
   .map(imported => imported.default);
   // and return each one's default export (which is expected to be a NestJS controller class)



@Module({
    imports: [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'client'),
        }),
      ],
    controllers
    })
    export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(cookieParser(), AuthMiddleware).forRoutes('/');
    }
}