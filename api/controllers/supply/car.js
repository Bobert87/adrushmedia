const carModel = require('../../models/supply/car');

class Car {
  constructor() {
    this.carModel = new carModel();
  }

  async getAll(req, res) {
    try {
      const cars = await this.carModel.getAll();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const car = await this.carModel.getCarById(id);
      res.json(car);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByDriverId(req, res) {
    try {
      const driverId = req.params.driverId;
      const cars = await this.carModel.getByDriverId(driverId);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  }

  async getByCompanyId(req, res) {
    try {
      const companyId = req.params.companyId;
      const cars = await this.carModel.getByCompanyId(companyId);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const car = req.body;
      const createdCar = await this.carModel.create(car);
      res.json(createdCar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const car = req.body;
      const updatedCar = await this.carModel.update(id, car);
      res.json(updatedCar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedCar = await this.carModel.delete(id);
      res.json(deletedCar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }  
}

module.exports = Car;