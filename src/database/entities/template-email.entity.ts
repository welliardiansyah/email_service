import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TemplateEmailStatus } from '../enums/template-status.enum';
import { ChannelEmailEntities } from './channels-email.entity';

@Entity('email_template')
export class TemplateEmailEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TemplateEmailStatus,
    default: TemplateEmailStatus.Active,
  })
  status: TemplateEmailStatus;

  @Column()
  html_code: string;

  @OneToOne(() => ChannelEmailEntities, (channles) => channles.template, {
    cascade: true,
  })
  channles: ChannelEmailEntities;

  @CreateDateColumn({ type: 'timestamptz', nullable: true, default: null })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true, default: null })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true, default: null })
  deleted_at: Date;
}
