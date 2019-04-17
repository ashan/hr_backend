import { Router, Request, Response } from 'express'
const router = Router()

// @router  GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req: Request, res: Response) =>
	res.json({ mst: 'Profile Works' })
)
export default router
