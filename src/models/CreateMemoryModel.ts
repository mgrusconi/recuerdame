export class CreateMemoryModel {
    remembered: string
    date_of_birth: string
    date_of_death: string
    message: string
    email: string

    protected constructor(props: any) {
        this.remembered = props.remembered
        this.date_of_birth = props.date_of_birth
        this.date_of_death = props.date_of_death
        this.message = props.message
        this.email = props.email
    }

    static of(props: any): CreateMemoryModel {
        return new CreateMemoryModel(props)
    }
}