import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('email_history')
export class CreateOtpEmailHistoryEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true, default: null })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true, default: null })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true, default: null })
  deleted_at: Date;
}
