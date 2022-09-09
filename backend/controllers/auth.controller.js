import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username })
    if (user!=null) {
      return next(console.log('User name already used'))
    } 
    else {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt)
      const newUser = new User({
        ...req.body,
        password: hash,
      })

      await newUser.save()
      res.status(200).send('User has been created.')
    }
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(console.log(404, 'User not found!'))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(console.log(400, 'Wrong password or username!'))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )

    const { password, ...otherDetails } = user._doc
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails } })
  } catch (err) {
    next(err)
  }
}
