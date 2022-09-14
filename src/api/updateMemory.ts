import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { myContainer } from '../../inversify.config'
import { TYPES } from '../../types'
import { UpdateMemoryModel } from '../models/UpdateMemoryModel'
import { MemoryRepository } from '../repositories/MemoryRepository'

const container = myContainer.get<MemoryRepository>(TYPES.MemoryRepository) 

export const lambdaHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log(`ENVIRONMENT VARIABLES: ${JSON.stringify(process.env)}`)
    console.log(`Event: ${JSON.stringify(event)}`)
    const { id } = event.pathParameters!!
    const body: UpdateMemoryModel = UpdateMemoryModel.of(JSON.parse(event.body!!))
    const res = await container.updateMemory(id!!, body) ?? [] // todo thows
    return {
        statusCode: 200,
        body: JSON.stringify(res),
    };
}