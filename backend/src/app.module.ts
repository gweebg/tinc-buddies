import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WrapperController } from './wrapper/wrapper.controller';
import { WrapperService } from './wrapper/wrapper.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // External modules
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'dbuser',
      password: 'dbpass',
      database: 'db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),

    // Local modules
    AccountsModule,
  ],
  controllers: [AppController, WrapperController],
  providers: [WrapperService],
})
export class AppModule {}
