import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'

@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const status = error.status ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const message = error.response.message ? error.response.message : error.message


    response.status(status).send({
      statusCode: status,
      message
    })
  }
}