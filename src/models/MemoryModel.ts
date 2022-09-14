export class MemoryModel {
    id: string
    remembered: string
    date_of_birth: string
    date_of_death: string
    publication_date: number
    message: string
    email: string
    status: MemoryStatus

    protected constructor(props: Record<string, any>) {
        this.id = props.id
        this.remembered = props.remembered
        this.date_of_birth = props.date_of_birth
        this.date_of_death = props.date_of_death
        this.publication_date = props.publication_date
        this.message = props.message
        this.email = props.email
        this.status = props.status
    }

    static of(props: Record<string, any>): MemoryModel {
        return new MemoryModel(props)
    }
}

export enum MemoryStatus {
    PENDING = "pending",
    REFUSED = "refused",
    APPOVED = "appoved"
}