import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface, UserRole } from '../types';

Entity();
export class UserEntity extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 255,
    unique: true,
  })
  email: string;
  @Column()
  pwdHash: string;
  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;
  @Column({
    nullable: true,
  })
  activeTokenId: string | null;
  @Column({
    default: false,
  })
  active: boolean;
  @Column()
  role: UserRole;
  /* relation 1-1  we will merge them when will be added their entities
  @OneToOne((type) => Student, (entity) => entity.user)
  student: Student;
  @OneToOne((type) => Hr, (entity) => entity.user)
  hr: Hr;
  */
}
