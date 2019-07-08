module.exports = {
	getAll: (req, res, next) => {
		const db = req.app.get("db")
		db.product
			.find()
			.then(products => {
				res.send({ success: true, products })
			})
			.catch(err => {
				res.send({ success: false, err })
			})
	},
	getProductById: (req, res, next) => {
		const db = req.app.get("db")
		db.product
			.findOne({ id: req.params.id })
			.then(product => {
				res.send({ success: true, product })
			})
			.catch(err => {
				res.send({ success: false, err })
			})
	}
}
