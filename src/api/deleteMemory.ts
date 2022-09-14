import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { myContainer } from '../../inversify.config'
import { TYPES } from '../../types'
import { MemoryRepository } from '../repositories/MemoryRepository'

const container = myContainer.get<MemoryRepository>(TYPES.MemoryRepository) 

export const lambdaHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log(`ENVIRONMENT VARIABLES: ${JSON.stringify(process.env)}`)
    console.log(`Event: ${JSON.stringify(event)}`)
    const { id } = event.pathParameters!!
    await container.deleteMemory(id!!) ?? [] // todo thows
    return {
        statusCode: 204,
        body: JSON.stringify({})
    };
}