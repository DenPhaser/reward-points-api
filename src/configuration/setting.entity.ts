import { Entity, Column, PrimaryColumn } from 'typeorm';
import { SettingName } from './setting-name.enum';

@Entity('Configuration')
export class Setting {
  @PrimaryColumn()
  name: SettingName;

  @Column()
  value: string;
}
