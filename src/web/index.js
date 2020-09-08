const express = require('express')
const path = require('path')

class Web {
	constructor(port) {
		this.app = express();

		this.routes();
		this.open(port);
	}

	routes() {
		this.app.get('/', (req, res) => {
			res.send('Hello World!')
		})
	}

	open(port) {
		this.app.listen(port, () => {
			console.log(`Servidor web listado na porta ${port}`);
		});
	}
}

module.exports = Web;
