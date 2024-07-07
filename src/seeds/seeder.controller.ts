import { Controller, Post } from "@nestjs/common";
import { SeederService } from "./seeder.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('seeder')
@Controller('seeder')
export class SeederController{
    constructor(
        private readonly seedService: SeederService
    ){}
    @Post('automatic')
    async seederData(){
        await this.seedService.seedData();
        return {message: "Data has been load successfuly"};
    }

}
