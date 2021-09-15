import { Request, Response, NextFunction } from 'express'

const CheckHeader = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.auth
  if (authHeader !== process.env.AUTH_HEADER) {
    console.log('Auth header not provided!')
    return res.status(500).json({
      success: false,
      message: 'Not authenticated!',
    })
  }
  next();
}

export default CheckHeader;