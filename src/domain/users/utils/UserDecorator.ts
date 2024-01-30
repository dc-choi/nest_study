import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
})
