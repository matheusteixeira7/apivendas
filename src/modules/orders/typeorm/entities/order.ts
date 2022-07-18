import { Customer } from '@modules/customers/typeorm/entities/customer'
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('customers')
export class Order {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
    customer: Customer

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
