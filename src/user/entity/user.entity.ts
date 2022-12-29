import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
    default: null,
  })
  oauthId: string | null;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['google'],
    default: null,
  })
  oauthType: 'google' | null;

  @Column({
    nullable: true,
    default: null,
  })
  email: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  avatar: string | null;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'secret'],
    default: 'secret',
    nullable: false,
  })
  gender: 'male' | 'female' | 'secret';

  @Column({
    nullable: true,
    default: null,
  })
  password: string | null;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;
}
