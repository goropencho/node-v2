import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CalcModule } from './calc/calc.module';
import { ResponseTimeMiddleware } from './middlewares/loggerMiddleware';

@Module({
  imports: [CalcModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*');
  }
}
