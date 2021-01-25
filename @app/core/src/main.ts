import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IConfig } from './common/config/interface';
import UtilsService from './common/utils';

export let GLOBAL_CONFIG: IConfig;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  /*********** CUSTOM ***********/
  GLOBAL_CONFIG = await UtilsService.readJSON('@app/core/src/common/config/index.json');
}
bootstrap();
