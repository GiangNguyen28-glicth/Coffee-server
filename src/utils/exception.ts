import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { LoggerService } from "src/logger/logger.service";
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException | Error, host: ArgumentsHost): void {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        AllExceptionsFilter.handleResponse(exception, host);
        AllExceptionsFilter.loggerMessage(exception)
        
    }
    private static loggerMessage(exception: unknown): void {
        let message = 'Internal Server Error';
        if ((exception instanceof HttpException)) {
            message = JSON.stringify(exception.getResponse())
        }
        else if (exception instanceof Error) {
            message = exception.stack.toString()
        }
        const logger = new LoggerService();
        logger.error(message)
    }
    private static handleResponse(exception: HttpException | Error, host: ArgumentsHost): void {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = (exception instanceof HttpException) ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
            statusCode: status,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url
        })
    }
}