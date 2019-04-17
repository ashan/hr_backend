import { Router, Request, Response } from 'express'
const router = Router()

// @router  GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req: Request, res: Response) =>
	res.json({ mst: 'Posts Works' })
)
export default router
