import { DeleteItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { injectable, inject } from "inversify";
import { v4 as uuidv4 } from 'uuid'
import { TYPES } from '../../types';
import { CreateMemoryModel } from '../models/CreateMemoryModel';
import { CreateModelOutput } from '../models/CreateModelOutput';
import { MemoryModel, MemoryStatus } from '../models/MemoryModel'
import { UpdateMemoryModel } from "../models/UpdateMemoryModel";
import { UpdateModelOutput } from "../models/UpdateModelOutpu";
import { DynamoClient } from './DynamoClient';

@injectable()
export class MemoryRepository {

    private readonly client: DynamoClient
    private tableName = "memorySam"

    constructor(
        @inject(TYPES.DynamoClient) client: DynamoClient
    ) {
        this.client = client
    }

    async findMemories(): Promise<MemoryModel[]> {
        const records = await this.client.findAllByStatus(this.tableName, MemoryStatus.PENDING)
        console.log(records)
        return records?.map(item => MemoryModel.of(item)) ?? []
    }

    async findMemory(id: string): Promise<MemoryModel | undefined> {
        const record = await this.client.findById(this.tableName, id)
        console.log(record)
        return (record !== undefined) ? MemoryModel.of(record) : record
    }

    async createMemory(body: CreateMemoryModel): Promise<CreateModelOutput> {
        console.log({ body })
        const memory: MemoryModel = {
            id: uuidv4(),
            remembered: body.remembered,
            date_of_birth: body.date_of_birth,
            date_of_death: body.date_of_death,
            publication_date: Date.now(),
            message: body.message,
            email: body.email,
            status: MemoryStatus.PENDING
        }
        const res = await this.client.create(this.tableName, memory)
        return CreateModelOutput.of(res)
    }

    async updateMemory(id: string, body: UpdateMemoryModel): Promise<UpdateModelOutput> {
        console.log({ id, body })
        const res = await this.client.update(this.tableName, id, body)
        return UpdateModelOutput.of(res)
    }

    async deleteMemory(id: string): Promise<DeleteItemCommandOutput> {
        console.log({ id })
        return await this.client.delete(this.tableName, id)
    }

} 
