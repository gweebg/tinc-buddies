import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsController } from './configs.controller';
import { ConfigsService } from './configs.service';
import { Config } from './configs.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Config])],
    providers: [ConfigsService],
    controllers: [ConfigsController],
})
export class ConfigsModule {}
