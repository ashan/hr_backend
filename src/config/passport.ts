import passport from 'passport'
import express from 'express'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

import keys from './keys'
import { IJWTTokenPayload, IUser } from '../interfaces'
import UserModel from '../models/User'
import { Document } from 'mongoose'

export default class PassportConfig {
	public static init(app: express.Application) {
		app.use(passport.initialize())
		const opts: StrategyOptions = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: keys.secretOrKey
		}
		const strategy = new Strategy(
			opts,
			async (jwt_payload: IJWTTokenPayload, done) => {
				const user: IUser & Document | null = await UserModel.findById(
					jwt_payload.userId
				)
				if (user) return done(null, user)
				done(null, false)
			}
		)

		passport.use(strategy)
	}
}
