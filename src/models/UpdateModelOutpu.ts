import { 
    AttributeValue, 
    ConsumedCapacity, 
    ItemCollectionMetrics, 
    PutItemCommandOutput,
    UpdateItemCommandOutput
} from "@aws-sdk/client-dynamodb"

export class UpdateModelOutput {
    attributes?: Record<string, AttributeValue>
    code: number
    consumedCapacity?: ConsumedCapacity
    itemCollectionMetrics?: ItemCollectionMetrics
    responseMetadata: any

    protected constructor(output: UpdateItemCommandOutput) {
        this.code = output.$metadata.httpStatusCode ?? 500
        this.responseMetadata = output.$metadata
        this.attributes = output.Attributes,
        this.consumedCapacity = output.ConsumedCapacity,
        this.itemCollectionMetrics = output.ItemCollectionMetrics
    }

    static of(output: PutItemCommandOutput): UpdateModelOutput {
        return new UpdateModelOutput(output)
    }
}