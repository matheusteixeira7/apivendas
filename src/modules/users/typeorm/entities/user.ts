import { Exclude, Expose } from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    name: string

  @Column()
    email: string

  @Column()
  @Exclude()
    password: string

  @Column()
    avatar: string

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date

  @Expose({ name: 'avatarUrl' })
  getAvatarUrl (): string | null {
    return this.avatar ? `${process.env.APP_API_URL}/files/${this.avatar}` : null
  }
}
