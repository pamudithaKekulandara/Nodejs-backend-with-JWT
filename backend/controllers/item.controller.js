import Item from '../model/item.model.js'

export const createItem = async (req, res, next) => {
  const newItem = new Item(req.body)

  try {
    if (req.user.isAdmin) {
      const savedItem = await newItem.save()
      res.status(200).json(savedItem)
    }
    } catch (err) {
      next(err)
    }
  
}

export const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedItem)
  } catch (err) {
    next(err)
  }
}
export const updateItemAvailability = async (req, res, next) => {
  try {
    await Item.updateOne(
      { 'quantity._id': req.params.id },
      {
        $push: {
          'quantity.$.remain': req.body.dates,
        },
      }
    )
    res.status(200).json('Item status has been updated.')
  } catch (err) {
    next(err)
  }
}
export const deleteItem = async (req, res, next) => {
  const ItemId = req.params.hotelid
  try {
    await Item.findByIdAndDelete(req.params.id)
    try {
      await Item.findByIdAndUpdate(ItemId, {
        $pull: { items: req.params.id },
      })
    } catch (err) {
      next(err)
    }
    res.status(200).json('Item has been deleted.')
  } catch (err) {
    next(err)
  }
}
export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
    res.status(200).json(item)
  } catch (err) {
    next(err)
  }
}
export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (err) {
    next(err)
  }
}
