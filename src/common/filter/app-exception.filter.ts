import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as any;

      // the class-validator pacakge will return an array with messages.
      if (
        typeof exceptionResponse === 'object' && //
        exceptionResponse?.message &&
        Array.isArray(exceptionResponse?.message)
      ) {
        exception.message = exceptionResponse?.message.join(', ');
      }
    }

    const responseBody = {
      statusCode: httpStatus,
      message: (exception as Error).message,
      // TODO: local time with node env timezone
      timestamp: Date.now(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
