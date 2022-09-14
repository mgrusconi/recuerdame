import { APIGatewayEvent ,APIGatewayProxyResult } from 'aws-lambda'
import { CreateMemoryModel } from '../models/CreateMemoryModel'
import { myContainer } from '../../inversify.config'
import { TYPES } from '../../types'
import { MemoryRepository } from '../repositories/MemoryRepository'

const container = myContainer.get<MemoryRepository>(TYPES.MemoryRepository) 

export const lambdaHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log(`ENVIRONMENT VARIABLES: ${JSON.stringify(process.env)}`)
    console.log(`Event: ${JSON.stringify(event)}`)
    const body: CreateMemoryModel = CreateMemoryModel.of(JSON.parse(event.body!!))
    const res = await container.createMemory(body)
    console.log({ body, res })
    return {
        statusCode: res.code,
        body: 'Created!',
    }
}
