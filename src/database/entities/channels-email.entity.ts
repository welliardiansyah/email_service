import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChannelNameEnums } from '../enums/channel-name.enum';
import { TemplateEmailEntities } from './template-email.entity';

@Entity('email_channels')
export class ChannelEmailEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column({ nullable: true })
  text1: string;

  @Column({ nullable: true })
  text2: string;

  @Column({ nullable: true })
  text3: string;

  @Column({ nullable: true })
  link: string;

  @Column()
  apps_id: string;

  @Column({ type: 'enum', enum: ChannelNameEnums })
  type: ChannelNameEnums;

  @OneToOne(() => TemplateEmailEntities, (template) => template.channles)
  @JoinColumn({ name: 'template_id' })
  template: TemplateEmailEntities;

  @CreateDateColumn({ type: 'timestamptz', nullable: true, default: null })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true, default: null })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true, default: null })
  deleted_at: Date;
}
