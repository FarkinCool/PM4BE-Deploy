import { SeederService } from "./seeder.service";
export declare class SeederController {
    private readonly seedService;
    constructor(seedService: SeederService);
    seederData(): Promise<{
        message: string;
    }>;
}
