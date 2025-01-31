import { Controller, Get } from '@nestjs/common';

import { Context as ContextTelegraf, NarrowedContext } from 'telegraf';

export interface Context extends NarrowedContext<ContextTelegraf, any> {
    match: RegExpMatchArray;
}

@Controller('user')
export class UserController {
    @Get('all')
    async getAllUsers() {
        return 'Hello World!';
    }
}
