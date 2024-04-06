import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WrapperController } from './wrapper/wrapper.controller';
import { WrapperService } from './wrapper/wrapper.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController, WrapperController],
  providers: [AppService, WrapperService],
})
export class AppModule {}
