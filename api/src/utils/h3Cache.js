const redis = require('ioredis');
const zoneModel = require('../models/core/zone');
const h3 = require('h3-js');


async function getH3Map(useCache=true){
    const client = new redis();
    let map = []
    if (useCache) {
        map = await client.get('h3zones');
        if (map) return JSON.parse(map);
        map = []
    }    
    this.zone = new zoneModel();
    const zones = await zone.getAll('areas');
    
    zones.forEach(zone => {
        const h3Zone = {}        
        h3Zone.id = zone.id
        h3Zone.name = zone.name
        h3Zone.areas = []
        zone.areas.forEach(area => {
            const coordinates = area.polygon.coordinates            
            const formatedPolygon = []
            for (let i = 0; i < coordinates.length; i = i + 2) {
                const element = [coordinates[i + 1], coordinates[i]];
                formatedPolygon.push(element);
            }            
            const zoneWithH3 = {
                id:area.polygon.id,
                name:area.polygon.name,
                coordinates:area.polygon.coordinates,
                h3Cells:h3.polygonToCells(formatedPolygon,8)
            }
            h3Zone. areas.push(zoneWithH3)
        })
        map.push(h3Zone)
    });
    client.set('h3zones', JSON.stringify(map))
    return map;
}

async function getHitMap(location){    
    const h3Map = await getH3Map();
    const h3Hit = {}
    const h3Cell = h3.latLngToCell(location.lat, location.lng, 8);
    h3Map.forEach(zone => {        
        zone.areas.forEach(area => {
            if (area.h3Cells.indexOf(h3Cell) > -1){
                h3Hit[zone.id] = h3Hit[zone.id] || []
                h3Hit[zone.id].push({id: area.id, name: area.name})
            }
        })
    })
    return h3Hit;
}

module.exports = getHitMap;
