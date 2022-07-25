import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hr extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  company: string;

  @Column({
    type: 'int',
    width: 3,
    nullable: false,
  })
  maxReservedStudents: number;

  // @AfterRemove()
  // zmiana statusu rezerwacji usera
}
