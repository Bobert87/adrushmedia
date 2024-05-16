const polygonGroupModel = require('../../models/core/polygonGroup');

class PolygonGroup {
    constructor() {
        this.polygonGroupModel = new polygonGroupModel();
    }

    async getAll(req, res) {
        try {
            const polygonGroups = await this.polygonGroupModel.getAll();
            res.json(polygonGroups);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const polygonGroup = await this.polygonGroupModel.getById(id);
            res.json(polygonGroup);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByName(req, res) {
        try {
            const name = req.params.name;
            const polygonGroups = await this.polygonGroupModel.getByName(name);
            res.json(polygonGroups);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const polygonGroup = req.body;
            const createdPolygonGroup = await this.polygonGroupModel.create(polygonGroup);
            res.json(createdPolygonGroup);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const polygonGroup = req.body;
            const updatedPolygonGroup = await this.polygonGroupModel.update(id, polygonGroup);
            res.json(updatedPolygonGroup);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            await this.polygonGroupModel.delete(id);
            res.json({ message: 'PolygonGroup deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = PolygonGroup;
