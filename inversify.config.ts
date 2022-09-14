import "reflect-metadata"
import { Container } from "inversify"
import { DynamoClient } from "./src/repositories/DynamoClient"
import { MemoryRepository } from "./src/repositories/MemoryRepository"
import { TYPES } from "./types"

const myContainer = new Container()
myContainer.bind<DynamoClient>(TYPES.DynamoClient).to(DynamoClient).inSingletonScope()
myContainer.bind<MemoryRepository>(TYPES.MemoryRepository).to(MemoryRepository).inSingletonScope()

export { myContainer }