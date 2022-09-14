import { 
    AttributeValue, 
    ConsumedCapacity, 
    ItemCollectionMetrics, 
    PutItemCommandOutput
} from "@aws-sdk/client-dynamodb"

export class CreateModelOutput {
    attributes?: Record<string, AttributeValue>
    code: number
    consumedCapacity?: ConsumedCapacity
    itemCollectionMetrics?: ItemCollectionMetrics
    responseMetadata: any

    protected constructor(output: PutItemCommandOutput) {
        this.code = output.$metadata.httpStatusCode ?? 500
        this.responseMetadata = output.$metadata
        this.attributes = output.Attributes,
        this.consumedCapacity = output.ConsumedCapacity,
        this.itemCollectionMetrics = output.ItemCollectionMetrics
    }

    static of(output: PutItemCommandOutput): CreateModelOutput {
        return new CreateModelOutput(output)
    }
}