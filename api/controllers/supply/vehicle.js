const vehicleModel = require('../../models/supply/vehicle');

class Vehicle {
  constructor() {
    this.vehicleModel = new vehicleModel();
  }

  async getAll(req, res) {
    try {
      const vehicles = await this.vehicleModel.getAll();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const vehicle = await this.vehicleModel.getvehicleById(id);
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByDriverId(req, res) {
    try {
      const driverId = req.params.driverId;
      const vehicles = await this.vehicleModel.getByDriverId(driverId);
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  }

  async getByCompanyId(req, res) {
    try {
      const companyId = req.params.companyId;
      const vehicles = await this.vehicleModel.getByCompanyId(companyId);
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const vehicle = req.body;
      const createdvehicle = await this.vehicleModel.create(vehicle);
      res.json(createdvehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const vehicle = req.body;
      const updatedvehicle = await this.vehicleModel.update(id, vehicle);
      res.json(updatedvehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedvehicle = await this.vehicleModel.delete(id);
      res.json(deletedvehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }  
}

module.exports = Vehicle;