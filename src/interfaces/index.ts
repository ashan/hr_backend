export interface IUser {
	name: string
	email: string
	password: string
	avatar: string
	date: Date
}

export interface IJWTTokenPayload{
    userId: String,
    name: IUser['name']
    avatar: IUser['avatar']
}
