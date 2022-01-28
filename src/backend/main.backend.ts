import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { HttpFilter } from './util/http.filter'
import { LoggingInterceptor } from './util/logging.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import Store from 'electron-store'

const store = new Store()

let appNest: INestApplication | null = null

export default async function createNest() {
  appNest = await NestFactory.create(AppModule)
  appNest.enableCors()

  appNest.useGlobalPipes(new ValidationPipe())
  appNest.useGlobalFilters(new HttpFilter())
  appNest.useGlobalInterceptors(new LoggingInterceptor())

  const options = new DocumentBuilder()
    .setTitle('electron-react-nestjs-boilerplate')
    .addServer('http://'+(store.get('address') || 'localhost') +':'+(store.get('port') || '8080'))
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    }).build()
  const document = SwaggerModule.createDocument(appNest, options)

  SwaggerModule.setup('', appNest, document)

  await appNest.listen(Number(store.get('port')) || 8080)
}

if(process.env.NEST_HOT_RELOAD === 'development') {
  createNest()
}
