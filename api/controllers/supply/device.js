const deviceModel = require('../../models/supply/device');

class Device {
  constructor() {
    this.deviceModel = new deviceModel();
  }

  async getAll(req, res) {
    try {
      const devices = await this.deviceModel.getAll();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const device = await this.deviceModel.getById(id);
      res.json(device);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByVehicleId(req, res) {
    try {
      const vehicleId = req.params.vehicleId;
      const devices = await this.deviceModel.getByVehicleId(vehicleId);
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByDriverId(req, res) {
    try {
      const driverId = req.params.driverId;
      const devices = await this.deviceModel.getByDriverId(driverId);
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByCompanyId(req, res) {
    try {
      const companyId = req.params.companyId;
      const devices = await this.deviceModel.getByCompanyId(companyId);
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const device = req.body;
      const createdDevice = await this.deviceModel.create(device);
      res.json(createdDevice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const device = req.body;
      const updatedDevice = await this.deviceModel.update(id, device);
      res.json(updatedDevice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await this.deviceModel.delete(id);
      res.json({ message: 'Device deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = Device;