import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { name: "Etienne" });
  // res.send('Api is working fine !')
})

export default router
