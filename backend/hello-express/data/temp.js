db.cars.insertMany([{
		make: "Honda",
		model: "Civic",
		year: 2022,
		isAutomatic: true,
		accidents: [{
			date: "2022-05-15",
			damage: "minor"
		}]
	},
	{
		make: "Ford",
		model: "Mustang",
		year: 2020,
		isAutomatic: false,
		accidents: []
	},
	{
		make: "Chevrolet",
		model: "Tahoe",
		year: 2023,
		isAutomatic: true,
		accidents: [{
			date: "2023-03-07",
			damage: "major"
		}]
	},
	{
		make: "BMW",
		model: "X5",
		year: 2021,
		isAutomatic: true,
		accidents: [{
				date: "2022-11-01",
				damage: "minor"
			},
			{
				date: "2023-04-20",
				damage: "major"
			}
		]
	},
	{
		make: "Tesla",
		model: "Model S",
		year: 2022,
		isAutomatic: true,
		accidents: []
	}
]);

db.cars.updateOne({
	make: "BMW"
}, {
	$set: {
		"accidents.1.date": "2022-01-01"
	},
	$currentDate: {
		lastModified: {
			$type: "date"
		}
	}
})

db.cars.replaceOne({
	make: "BMW"
}, {
	make: "BMW",
	instock: [{
		warehouse: "A",
		qty: 60
	}, {
		warehouse: "B",
		qty: 40
	}]
})