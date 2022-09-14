import { MemoryStatus } from "./MemoryModel"

export class UpdateMemoryModel {
    remembered: string
    date_of_birth: string
    date_of_death: string
    message: string
    status: MemoryStatus

    protected constructor(props: any) {
        this.remembered = props.remembered
        this.date_of_birth = props.date_of_birth
        this.date_of_death = props.date_of_death
        this.message = props.message
        this.status = props.status
    }

    static of(props: any): UpdateMemoryModel {
        return new UpdateMemoryModel(props)
    }
}