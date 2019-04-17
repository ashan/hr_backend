import { Router, Request, Response, response } from 'express'
import bcrypt from 'bcrypt'
import gravatar from 'gravatar'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import UserModel from '../../models/User'
import keys from '../../config/keys'
import { IJWTTokenPayload } from '../../interfaces'

const router = Router()

// @router  GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req: Request, res: Response) =>
	res.json({ mst: 'Users Works' })
)

// @router  GET api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req: Request, res: Response) => {
	const { email } = req.body
	const user = await UserModel.findOne({ email })
	if (user) {
		return res.status(400).json({
			email: 'User already exists'
		})
	}
	const { password } = req.body
	const avatar = gravatar.url(email, {
		s: '200',
		r: 'pg',
		d: 'mm'
	})

	const salt: string = await bcrypt.genSalt(10)
	const hashedPassword: string = await bcrypt.hash(password, salt)

	const newUser = new UserModel({
		name: req.body.name,
		email,
		avatar,
		password: hashedPassword
	})
	const userDoc = await newUser.save()
	res.json({ userDoc })
})

// @router  GET api/users/login
// @desc    User login returning a JWT Token
// @access  Public
router.post('/login', async (req: Request, res: Response) => {
	const { email } = req.body
	const { password } = req.body
	// find the user
	const user = await UserModel.findOne({ email })
	if (!user) return res.status(404).json({ email: 'User not found' })

	// match the password
	const passwordsMatch: boolean = await bcrypt.compare(password, user.password)

	if (!passwordsMatch)
		return res.status(400).json({ password: 'Password incorrect' })

	const payload: IJWTTokenPayload = {
		userId: user.id,
		name: user.name,
		avatar: user.avatar
	}
	const token: String = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 })
	res.json({ success: true, token: `Bearer ${token}` })
})

// @router  GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req: Request, res: Response) => {
		return res.json(req.user)
	}
)

export default router
