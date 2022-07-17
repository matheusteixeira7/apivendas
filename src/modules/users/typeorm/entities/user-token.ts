import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class UserToken {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
  @Generated('uuid')
    token: string

  @Column()
    userId: string

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
