import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './setting.entity';
import { ConfigurationController } from './configuration.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
