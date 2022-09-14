import {
    DeleteItemCommand,
    DeleteItemCommandInput,
    DeleteItemCommandOutput,
    DynamoDBClient,
    GetItemCommand,
    GetItemCommandInput,
    PutItemCommand,
    PutItemCommandOutput,
    QueryCommand,
    QueryCommandInput,
    UpdateItemCommand,
    UpdateItemCommandInput,
    UpdateItemCommandOutput
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { injectable } from "inversify";

@injectable()
export class DynamoClient {
    private readonly client: DynamoDBClient

    constructor() {
        this.client = new DynamoDBClient({})
    }

    async findAllByStatus(tableName: string, status: string): Promise<Record<string, any>[]> {
        const params: QueryCommandInput = {
            TableName: tableName,
            IndexName: 'status-global-index',
            KeyConditionExpression: "#s = :s",
            ExpressionAttributeNames: { "#s": "status" },
            ExpressionAttributeValues: marshall({
                ':s': status
            }),
            ScanIndexForward: false
        }

        const command = new QueryCommand(params)
        const { Items } = await this.client.send(command)
        console.log(Items)
        return Items?.map(item => unmarshall(item)) ?? []
    }

    async findById(tableName: string, pk: string): Promise<Record<string, any>> {
        const params: GetItemCommandInput = {
            TableName: tableName,
            Key: marshall({
                id: pk
            })
        }
        const command = new GetItemCommand(params)
        const { Item } = await this.client.send(command)
        console.log(Item)
        return (Item != undefined) ? unmarshall(Item) : []
    }

    async create(tableName: string, body: any): Promise<PutItemCommandOutput> {
        const command = new PutItemCommand({
            TableName: tableName,
            Item: marshall(body)
        })
        return await this.client.send(command)
    }

    async update(tableName: string, pk: string, body: any): Promise<UpdateItemCommandOutput> {
        const command: UpdateItemCommandInput = {
            TableName: tableName,
            Key: marshall({
              'id': pk
            }),
            UpdateExpression: "set #rm = :rm, #db = :db, #dd = :dd, #ms = :ms, #st = :st",
            ExpressionAttributeValues: marshall({
                ":rm": body.remembered,
                ":db": body.date_of_birth,
                ":dd": body.date_of_death,
                ":ms": body.message,
                ":st": body.status,
            }),
            ExpressionAttributeNames: {
                "#rm": "remembered",
                "#db": "date_of_birth",
                "#dd": "date_of_death",
                "#ms": "message",
                "#st": "status"
            },
            ReturnValues:"UPDATED_NEW"
        }
        return await this.client.send(new UpdateItemCommand(command))
    }

    async delete(tableName: string, pk: string): Promise<DeleteItemCommandOutput> {
        const params: DeleteItemCommandInput = {
            TableName: tableName,
            Key: marshall({
                id: pk
            })
        }
        const command = new DeleteItemCommand(params)
        return await this.client.send(command)
    }
}
