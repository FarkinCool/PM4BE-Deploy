import { OnModuleInit } from '@nestjs/common';
import { SeederService } from './seeds/seeder.service';
export declare class AppModule implements OnModuleInit {
    private readonly seedService;
    constructor(seedService: SeederService);
    onModuleInit(): Promise<void>;
}
