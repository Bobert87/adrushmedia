const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

    const advertisers = await prisma.advertiser.createMany({

        data: [{
            name: 'Great Ads',
            type: 'AGENCY',
            status: 'ACTIVE',
            email: 'info@greatads.com',
            phone: '123-456-7890',
            address: '123 Main St, Anytown, USA',
            term: 'NET_30'            
        },
        {
            name: 'Grupo MK',
            type: 'AGENCY',
            status: 'ACTIVE',
            email: 'info@grupomk.com',
            phone: '123-456-7890',
            address: '123 Main St, Anytown, USA',
            term: 'NET_60'
        },
        {
            name: 'Ninja View',
            type: 'AGENCY',
            status: 'ACTIVE',
            email: 'info@ninjaview.com',
            phone: '123-456-7891',
            address: '124 Main St, Anytown, USA',
            term: 'PREPAID'
        },
        {
            name: 'Great Story',
            type: 'AGENCY',
            status: 'ACTIVE',
            email: 'info@greatstory.com',
            phone: '123-456-7892',
            address: '125 Main St, Anytown, USA',
            term: 'NET_30'
        },
        {
            name: 'Hill St LTD',
            type: 'AGENCY',
            status: 'ACTIVE',
            email: 'info@hillstltd.com',
            phone: '123-456-7893',
            address: '126 Main St, Anytown, USA',
            term: 'NET_30'
        },
        {
            name: 'DSA Adv',
            type: 'AGENCY',
            status: 'ACTIVE',
            email: 'info@dsaadv.com',
            phone: '123-456-7894',
            address: '127 Main St, Anytown, USA',
            term: 'NET_30'
        },
        {
            name: 'Others Inc',
            type: 'AGENCY',
            status: 'INACTIVE',
            email: 'info@othersinc.com',
            phone: '123-456-7895',
            address: '128 Main St, Anytown, USA',
            term: 'NET_30'
        },
        {
            name: 'Finally GA',
            type: 'AGENCY',
            status: 'MAXED_OUT',
            email: 'info@finallyga.com',
            phone: '123-456-7896',
            address: '129 Main St, Anytown, USA',            
            term: 'NET_30'
        },
        {
            name: 'EP Inc',
            type: 'AGENCY',
            status: 'SUSPENDED',
            email: 'info@epinc.com',
            phone: '123-456-7897',
            address: '130 Main St, Anytown, USA',            
            term: 'NET_30'
        },
        {
            name: 'Kualus',
            type: 'AGENCY',
            status: 'ACTIVE',
            email: 'info@kualus.com',
            phone: '123-456-7898',
            address: '131 Main St, Anytown, USA',            
            term: 'NET_30'
        }
        ]
    })

    const campaigns = await prisma.campaign.createMany({
        data: [{
            advertiserId: 1,
            name: 'Premium Zone',
            brand: 'Iphone 15',
            maxBid: 0.05,
            budget: 1000,
            status: 'ACTIVE',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2024-12-31'),
        },
        {
            advertiserId: 1,
            name: 'Medium Zone',
            brand: 'Samsung Galaxy 20',
            maxBid: 0.03,
            budget: 500,
            status: 'COMPLETED',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2024-05-01'),
        },
        {
            advertiserId: 1,
            name: 'Low Zone',
            brand: 'Huawei P30',
            maxBid: 0.01,
            budget: 250,
            status: 'PAUSED',
            startDate: new Date('2021-01-01'),
        },
        {
            advertiserId: 2,
            name: 'Restaurants',
            brand: 'Cafe Rumano',
            maxBid: 0.03,
            budget: 350,
            status: 'ACTIVE',
            startDate: new Date('2024-01-01'),
        },
        {
            advertiserId: 2,
            name: 'Restaurants',
            brand: 'Cafe Baritono',
            maxBid: 0.035,
            budget: 380,
            status: 'ACTIVE',
            startDate: new Date('2024-01-01'),
        },
        {

            advertiserId: 3,
            name: 'Ninja View Campaign',
            brand: 'Ninja View',
            maxBid: 0.04,
            budget: 3000,
            status: 'ACTIVE',
            startDate: new Date('2024-05-01'),
            endDate: new Date('2024-05-31'),
        },
        {
            advertiserId: 4,
            name: 'Great Story Campaign',
            brand: 'Great Story',
            maxBid: 0.05,
            budget: 400,
            status: 'ACTIVE',
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-07-31'),
        },
        {
            advertiserId: 5,
            name: 'Hill St LTD Campaign',
            brand: 'Hill St LTD',
            maxBid: 0.06,
            budget: 500.45,
            status: 'ACTIVE',
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-12-31'),
        },
        {
            advertiserId: 6,
            name: 'DSA Adv Campaign',
            brand: 'DSA Adv',
            status: 'ACTIVE',
            maxBid: 0.07,
            budget: 600,
            startDate: new Date('2024-05-20'),
        },
        {
            advertiserId: 7,
            name: 'Others Inc Campaign',
            brand: 'Others Inc',
            maxBid: 0.07,
            budget: 700,
            status: 'PAUSED',
            startDate: new Date('2024-04-01'),
            endDate: new Date('2024-09-31'),
        },
        {
            advertiserId: 8,
            name: 'Finally GA Campaign',
            brand: 'Finally GA',
            maxBid: 0.08,
            budget: 800,
            status: 'COMPLETED',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2021-12-31'),
        },
        {
            advertiserId: 9,
            name: 'EP Inc Campaign',
            brand: 'EP Inc',
            maxBid: 0.09,
            budget: 900,
            status: 'ACTIVE',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
        },
        {
            advertiserId: 10,
            name: 'Kualus Campaign',
            brand: 'Kualus',
            maxBid: 0.1,
            budget: 1000,
            status: 'ACTIVE',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
        }
        ]
    })

    const ads = await prisma.ad.createMany({
        data: [{
            campaignId: 1,
            name: 'Iphone 15',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.apple.com/iphone-15/video',
            landingURL: 'https://www.apple.com/iphone-15/',
            status: 'active',
        },
        {
            campaignId: 1,
            name: 'Iphone 15 pro',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.apple.com/iphone-15-pro/video',
            landingURL: 'https://www.apple.com/iphone-15-pro/',
            status: 'active',
        },
        {
            campaignId: 2,
            name: 'Samsung Galaxy 20',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.samsumg.com/galaxy-20/video',
            landingURL: 'https://www.samsumg.com/galaxy-20/',
            status: 'active',
        },
        {
            campaignId: 2,
            name: 'Samsung Galaxy 20 pro',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.samsumg.com/galaxy-20-pro/video',
            landingURL: 'https://www.samsumg.com/galaxy-20-pro/',
            status: 'active',
        },
        {
            campaignId: 2,
            name: 'Samsung Galaxy 20 pro ultra',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.samsumg.com/galaxy-20-pro-ultra/video',
            landingURL: 'https://www.samsumg.com/galaxy-20-pro-ultra/',
            status: 'active',
        },
        {
            campaignId: 3,
            name: 'Huawei P30',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.huawei.com/p30/video',
            landingURL: 'https://www.huawei.com/p30/',
            status: 'active',
        },
        {
            campaignId: 3,
            name: 'Huawei P30 pro',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.huawei.com/p30-pro/video',
            landingURL: 'https://www.huawei.com/p30-pro/',
            status: 'active',
        },
        {
            campaignId: 4,
            name: 'Cafe Rumano',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.caferumano.com/video',
            landingURL: 'https://www.caferumano.com/',
            status: 'active',
        },
        {
            campaignId: 5,
            name: 'Cafe Baritono',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.cafebaritono.com/video',
            landingURL: 'https://www.cafebaritono.com/',
            status: 'active',
        },
        {
            campaignId: 6,
            name: 'Ninja View',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.ninjaview.com/video',
            landingURL: 'https://www.ninjaview.com/',
            status: 'active',
        },
        {
            campaignId: 7,
            name: 'Great Story',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.greatstory.com/video',
            landingURL: 'https://www.greatstory.com/',
            status: 'active',
        },
        {
            campaignId: 8,
            name: 'Hill St LTD',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.hillstltd.com/video',
            landingURL: 'https://www.hillstltd.com/',
            status: 'active',
        },
        {
            campaignId: 9,
            name: 'DSA Adv',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.dsaadv.com/video',
            landingURL: 'https://www.dsaadv.com/',
            status: 'active',
        },
        {
            campaignId: 10,
            name: 'Others Inc',
            targetDeviceType: 'rooftop',
            creativeFormat: 'video',
            creativeURL: 'https://www.othersinc.com/video',
            landingURL: 'https://www.othersinc.com/',
            status: 'active',
        },
        ]
    })

    const publishers = await prisma.publisher.createMany({
        data: [{
            name: 'Blue Taxi Company',
            taxNumber: '1234567890',
            bank: 'Bank of America',
            bankAccount: '123456789',
            accountType: 'checking',
            contact: 'John Doe',
            email: 'blue@taxi.com',
            phone: '123-456-7890',
            address: '123 Main St, Anytown, USA',
            term: 'NET_30',
            creditLimit: 1000,
            status: 'ACTIVE',
        },
        {
            name: 'Yellow Taxi Company',
            taxNumber: '1234567891',
            bank: 'Bank of England',
            bankAccount: '123456790',
            accountType: 'checking',
            contact: 'Jane Doe',
            email: 'yellow@taxily.com',
            phone: '123-456-7891',
            address: '124 Main St, Anytown, USA',
            term: 'NET_30',
            creditLimit: 100,
            status: 'ACTIVE',
        },
        {
            name: 'Red Taxi Company',
            taxNumber: '1234567892',
            bank: 'Bank of Canada',
            bankAccount: '123456791',
            accountType: 'saving',
            contact: 'John Smith',
            email: 'why@canada.co',
            phone: '123-456-7892',
            address: '125 Main St, Anytown, USA',
            term: 'NET_30',
            creditLimit: 10000,
            status: 'ACTIVE',
        },
        ]
    })

    const assets = await prisma.asset.createMany({
        data:[
            {   
                publisherId: 1,             
                type: 'FLEET',
                name: 'Fleet 1 - Blue Taxi Company',
                description: '5 Toyota Corollas - 123-456, 123-457, 123-458, 123-459, 123-460',
            },
            {
                publisherId: 1,         
                type: 'LOCATIONS',
                name: 'Restaurant - Big Panda',
                description: 'Assian Food - 123 Main St, Anytown, USA',
            },
            {
                publisherId: 2,
                type: 'FLEET',
                name: 'Honda Fit - 123-461',
                description: 'Toyota Corolla - 123-456',                
            },
            {
                publisherId: 3,
                type: 'FLEET',
                name: 'Shuttles',
                description: 'Shutles to the airport - 123 Main St, Anytown, USA',                
            }
        ]
    })

    const drivers = await prisma.driver.createMany({
        data: [
            {
                
                vehicleId: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'his2@ksd.com',
                alternativeEmail: 'his2s@ksd.com',
                phone: '123-456-7890',
                alternativePhone: '123-456-7891',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '123 Main St, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '1',
                driversLicense: '1234567890',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'Uber',
            },
            {
                
                vehicleId: 2,
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jorsey@gmail.com',
                alternativeEmail: 'norj@yhahoo.com',
                phone: '123-456-7555',
                alternativePhone: '123-456-7556',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '144 Alt St, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '1',
                driversLicense: '1234567891',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'Uber',
            }, {                
                vehicleId: 3,
                firstName: 'John',
                lastName: 'Smith',
                email: 'whyno@email.com',
                alternativeEmail: 'whynoaltemail@gmaoil.com',
                phone: '123-456-7557',
                alternativePhone: '123-456-7558',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '144 Alt St, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '1',
                driversLicense: '1234777892',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'Uber',
            },
            {                
                vehicleId: 4,
                firstName: 'Arturo',
                lastName: 'Perez',
                email: 'arpe@hotma.com',
                alternativeEmail: 'pear@gma.com',
                phone: '123-456-7559',
                alternativePhone: '123-456-7560',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '28-99 zona 10, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '10',
                driversLicense: '1234567893',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'InDriver',
            },
            {                
                vehicleId: 5,
                firstName: 'Maria',
                lastName: 'Garcia',
                email: 'margar@alkd.com',
                alternativeEmail: 'garmar@kkk.com',
                phone: '123-456-7561',
                alternativePhone: '123-456-7562',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '01-07 zona 15, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '15',
                driversLicense: '1234567894',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'InDriver',
            },
            {                
                vehicleId: 6,
                firstName: 'Juan',
                lastName: 'Perez',
                email: 'jape@juape.com',
                alternativeEmail: 'altja@pe.com',
                phone: '123-456-7563',
                alternativePhone: '123-456-7564',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '01-07 zona 15, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '15',
                driversLicense: '1234567895',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'Uber',
            },
            {                
                vehicleId: 7,
                firstName: 'Luca',
                lastName: 'Alvarez',
                email: 'alva@res.com',
                alternativeEmail: 'res@pe.com',
                phone: '123-999-7563',
                alternativePhone: '303-456-7564',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '01-07 zona 07, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '07',
                driversLicense: '1234567896',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'Uber',
            },
            {

                vehicleId: 8,
                firstName: 'Sara',
                lastName: 'Gomez',
                email: 'sago@lll.com',
                alternativeEmail: 'gosa@yho.com',
                phone: '123-456-7565',
                alternativePhone: '123-456-7566',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '01-22 zona 8, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '8',
                driversLicense: '1234567897',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'Uber',
            },
            {                
                vehicleId: 9,
                firstName: 'Luis',
                lastName: 'Garcia',
                email: 'luga@gaga.com',
                alternativeEmail: 'pe@pon.net',
                phone: '123-456-7567',
                alternativePhone: '123-456-7568',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '15-07 zona 11, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '11',
                driversLicense: '1234567898',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'Uber',
            },
            {                
                vehicleId: 10,
                firstName: 'Maria',
                lastName: 'De Leon',
                email: 'madele@on.com',
                alternativeEmail: 'oth.alt@alt.com',
                phone: '123-456-7569',
                alternativePhone: '123-456-7570',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '11-17 zona 18, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '18',
                driversLicense: '1234567899',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'Uber',
            },
            {                
                firstName: 'Alvaro',
                lastName: 'Lopez',
                email: 'allo@que.tal',
                alternativeEmail: 'yo@muy.bn',
                phone: '123-456-7571',
                alternativePhone: '123-456-7572',
                countryISO: 'GT',
                countryName: 'Guatemala',
                address: '11-17 zona 21, Guatemala City, Guatemala',
                state: 'Guatemala',
                city: 'Guatemala City',
                department: 'Guatemala',
                municipality: 'Guatemala City',
                zone: '21',
                driversLicense: '1234567800',
                driversLicenseURL: 'https://www.guatemala.com/drivers-license',
                rideSharingCompany: 'Uber',
            }
        ]
    })
    
    const vehicles = await prisma.vehicle.createMany({
        data: [
            {                
                assetId: 1,
                driverId: 1,
                make: 'Toyota',
                model: 'Corolla',
                type: 'SEDAN',
                trim: 'LE',
                color: 'white',
                year: 2021,
                licensePlate: '123-456',
                vin: '1234567890',
                numberOfSeats: 5,
            },
            {              
                assetId: 1,  
                driverId: 2,
                make: 'Honda',
                model: 'Civic',
                type: 'SEDAN',
                trim: 'LX',
                color: 'black',
                year: 2009,
                licensePlate: '123-457',
                vin: '1234567891',
                numberOfSeats: 5,
            },
            {              
                assetId: 1,  
                driverId: 3,
                make: 'Ford',
                model: 'Fusion',
                type: 'SUV',
                trim: 'SE',
                color: 'blue',
                year: 2020,
                licensePlate: '123-458',
                vin: '1234567892',
                numberOfSeats: 5,
            },
            {   
                assetId: 1,             
                driverId: 4,
                make: 'Chevrolet',
                model: 'Malibu',
                type: 'SEDAN',
                trim: 'LT',
                color: 'red',
                year: 2018,
                licensePlate: '123-459',
                vin: '1234567893',
                numberOfSeats: 5,
            },
            {              
                assetId: 1,  
                driverId: 5,
                make: 'Nissan',
                model: 'Altima',
                type: 'SEDAN',
                trim: 'S',
                color: 'silver',
                year: 2000,
                licensePlate: '123-460',
                vin: '1234567894',
                numberOfSeats: 5,
            },
            {              
                assetId: 3,  
                driverId: 6,
                make: 'Hyundai',
                model: 'Sonata',
                type: 'SEDAN',
                trim: 'SE',
                color: 'gray',
                year: 2015,
                licensePlate: '123-461',
                vin: '1234567895',
                numberOfSeats: 5,
            },
            {              
                assetId: 1,  
                driverId: 7,
                make: 'Kia',
                model: 'Sportage',
                type: 'SUV',
                trim: 'LX',
                color: 'white',
                year: 2021,
                licensePlate: '123-462',
                vin: '1234567896',
                numberOfSeats: 5,
            },
            {              
                assetId: 1,  
                driverId: 8,
                make: 'Volkswagen',
                model: 'Passat',
                type: 'SEDAN',
                trim: 'S',
                color: 'black',
                year: 2021,
                licensePlate: '123-463',
                vin: '1234567897',
                numberOfSeats: 5,
            },
            {              
                assetId: 1,  
                driverId: 9,
                make: 'Subaru',
                model: 'Legacy',
                type: 'SEDAN',
                trim: 'Base',
                color: 'blue',
                year: 2017,
                licensePlate: '123-464',
                vin: '1234567898',
                numberOfSeats: 5,
            },
            {              
                assetId: 1,  
                driverId: 10,
                make: 'Isuzu',
                model: 'DMax',
                type: 'TRUCK',
                trim: 'Sport',
                color: 'red',
                year: 2015,
                licensePlate: '123-465',
                vin: '1234567899',
                numberOfSeats: 5,
            },
        ]
    })

    const assetVehicles = await prisma.assetVehicle.createMany({
        data: [
            {
                assetId: 1,
                vehicleId: 1,
            },
            {
                assetId: 1,
                vehicleId: 2,
            },
            {
                assetId: 1,
                vehicleId: 3,
            },
            {
                assetId: 1,
                vehicleId: 4,
            },
            {
                assetId: 1,
                vehicleId: 5,
            },
            {
                assetId: 3,
                vehicleId: 6,
            },
            {
                assetId: 4,
                vehicleId: 7,
            },
            {
                assetId: 4,
                vehicleId: 8,
            },
        ]
    })

    const locations = await prisma.location.createMany({
        data: [
            {
                type: 'RESTAURANT',
                name: 'Big Panda',
                address: 'Roosevelt Ave, Zona 11 , GT',
                city: 'Guatemala City',
                state: 'Guatemala',
                country: 'Guatemala',
                postalCode: '01011',
                description: 'Near Miraflores',
                latitude: 14.5895,
                longitude: -90.5518,
            },
            {
                type: 'BAR',
                name: 'SAKE SEDEAKI',
                address: 'Reforma Ave, Zona 9 , GT',
                city: 'Guatemala City',
                state: 'Guatemala',
                country: 'Guatemala',
                postalCode: '01009',
                description: 'Sake Bar Near Reforma Avenue',
                latitude: 14.5895,
                longitude: -90.5518,
            },
            {
                type: 'MALL',
                name: 'Galavista Las Americas',
                address: 'Las Americas Ave, Zona 14 , GT',
                city: 'Guatemala City',
                state: 'Guatemala',
                country: 'Guatemala',
                postalCode: '01014',
                description: 'Las Americas Galavista is a popular mall in the city',
                latitude: 14.5895,
                longitude: -90.5518,
            },
            {
                type: 'BUS_STATION',
                name: 'La Reforma Bus Stop',
                address: 'Reforma Ave, Zona 9 , GT',
                city: 'Guatemala City',
                state: 'Guatemala',
                country: 'Guatemala',
                postalCode: '01009',
                description: 'La Reforma bus stop is a popular site in the city',
                latitude: 14.5895,
                longitude: -90.5518,
            },
            {
                type: 'BUS_STATION',
                name: 'Roosevelt Bus Stop',
                address: 'Roosevelt Ave, Zona 11 , GT',
                city: 'Guatemala City',
                state: 'Guatemala',
                country: 'Guatemala',
                postalCode: '01011',
                description: 'Roosevelt bus stop is a popular site in the city',
                latitude: 14.5895,
                longitude: -90.5518,
            },
            {
                type: 'BUS_STATION',
                name: 'Las Americas Bus Stop',
                address: 'Las Americas Ave, Zona 14 , GT',
                city: 'Guatemala City',
                state: 'Guatemala',
                country: 'Guatemala',
                postalCode: '01014',
                description: 'Las Americas bus stop is a popular site in the city',
                latitude: 14.5895,
                longitude: -90.5518,
            },
            {
                type: 'BUS_STATION',
                name: 'La Reforma Bus Stop',
                address: 'Reforma Ave, Zona 9 , GT',
                city: 'Guatemala City',
                state: 'Guatemala',
                country: 'Guatemala',
                postalCode: '01009',
                description: 'La Reforma bus stop is a popular site in the city',
                latitude: 14.5895,
                longitude: -90.5518,
            },
            {
                type: 'BUS_STATION',
                name: 'Roosevelt Bus Stop',
                address: 'Roosevelt Ave, Zona 11 , GT',
                city: 'Guatemala City',
                state: 'Guatemala',
                country: 'Guatemala',
                postalCode: '01011',
                description: 'Roosevelt bus stop is a popular site in the city',
                latitude: 14.5895,
                longitude: -90.5518,
            },
            {
                type: 'BUS_STATION',
                name: 'Las Americas Bus Stop',
                address: 'Las Americas Ave, Zona 14 , GT',
                city: 'Guatemala City',
                state: 'Guatemala',
                country: 'Guatemala',
                postalCode: '01014',
                description: 'Las Americas bus stop is a popular site in the city',
                latitude: 14.5895,
                longitude: -90.5518,
            },
        ]
    })

    const assetLocations = await prisma.assetLocation.createMany({
        data: [
            {
                assetId: 2,
                locationId: 1,
            },
            {
                assetId: 2,
                locationId: 2,
            },            
        ]
    })
  
    const devices = await prisma.device.createMany({
        data: [
            {
                type: 'CARTOP',
                make: 'byd',
                model: 'model 1',
                screenWidth: 1080,
                screenHeight: 460,
                resolution: '1080x460',
                os: 'ubuntu',
                osVersion: '20.04',
                serialNumber: '1234567890',
                
            },
            {
                type: 'TABLET',
                make: 'HuaWei',
                model: 'Mate Pad',
                screenWidth: 2560,
                screenHeight: 1440,
                resolution: '2560x1440',
                os: 'android',
                osVersion: '11',
                serialNumber: '1234567330',
                
            },
            {
                type: 'TABLET',
                make: 'Samsung',
                model: 'Galaxy Tab',
                screenWidth: 1920,
                screenHeight: 1080,
                resolution: '1920x1080',
                os: 'android',
                osVersion: '10',
                serialNumber: '1234567331',
                
            },
            {
                type: 'CARTOP',
                make: 'byd',
                model: 'model 2',
                screenWidth: 1080,
                screenHeight: 460,
                resolution: '1080x460',
                os: 'ubuntu',
                osVersion: '20.04',
                serialNumber: '1223567891',
                
            },
            {
                type: 'CARTOP',
                make: 'byd',
                model: 'model 3',
                screenWidth: 1080,
                screenHeight: 460,
                resolution: '1080x460',
                os: 'ubuntu',
                osVersion: '20.04',
                serialNumber: 'AAEFSDF23121',
                
            },
            {
                type: 'CARTOP',
                make: 'byd',
                model: 'model 3',
                screenWidth: 1080,
                screenHeight: 460,
                resolution: '1080x460',
                os: 'ubuntu',
                osVersion: '20.04',
                serialNumber: 'AAEFSDF23122',
                
            },
            {
                type: 'CARTOP',
                make: 'byd',
                model: 'model 3',
                screenWidth: 1080,
                screenHeight: 460,
                resolution: '1080x460',
                os: 'ubuntu',
                osVersion: '20.04',
                serialNumber: 'AAEFSDF23123',
                
            },
            {
                type: 'CARTOP',
                make: 'byd',
                model: 'model 3',
                screenWidth: 1080,
                screenHeight: 460,
                resolution: '1080x460',
                os: 'ubuntu',
                osVersion: '20.04',
                serialNumber: 'AAEFSDF99989',
                
            },
            {
                type: 'CARTOP',
                make: 'byd',
                model: 'model 3',
                screenWidth: 1080,
                screenHeight: 460,
                resolution: '1080x460',
                os: 'ubuntu',
                osVersion: '20.04',
                serialNumber: 'AAEFSDF99990',
                
            },
            {
                type: 'CARTOP',
                make: 'byd',
                model: 'model 8',
                screenWidth: 1080,
                screenHeight: 460,
                resolution: '1080x460',
                os: 'ubuntu',
                osVersion: '20.04',
                serialNumber: 'AAEFSDF99991',
                
            }
        ]
    })
   
    const tags = await prisma.tag.createMany({
        data: [
            {
                name: 'best',
            },
            {
                name: 'evening',
            },
            {
                name: 'night',
            },
        ]
    })

    const campaignsTags = await prisma.campaignTag.createMany({
        data: [
            {
                campaignId: 1,
                tagId: 1,
            },
            {
                campaignId: 1,
                tagId: 2,
            },
            {
                campaignId: 2,
                tagId: 2,
            },
            {
                campaignId: 3,
                tagId: 3,
            },
            {
                campaignId: 4,
                tagId: 1,
            },
            {
                campaignId: 5,
                tagId: 2,
            },
            {
                campaignId: 6,
                tagId: 3,
            },
            {
                campaignId: 7,
                tagId: 1,
            },
            {
                campaignId: 8,
                tagId: 2,
            },
            {
                campaignId: 9,
                tagId: 3,
            },
            {
                campaignId: 10,
                tagId: 1,
            },

        ]
    })

    const polygons = await prisma.polygon.createMany(
        {
            data: [{
                name: 'Zona 15',
                coordinates: [
                    -90.5041557, 14.6099979, -90.4957443, 14.5874056, -90.4837682, 14.5781316, -90.47879, 14.5873519, -90.4872443, 14.5920449, -90.4902055, 14.5948275, -90.4911496, 14.6006002, -90.4976727, 14.6062066, -90.4990585, 14.6154844, -90.5108173, 14.6184327, -90.5109889, 14.6121622, -90.5041557, 14.6099979
                ]
            },
            {
                name: 'Zona 10',
                coordinates: [
                    -90.5132572, 14.6168462, -90.5154888, 14.6099527, -90.5206387, 14.5941716, -90.5049316, 14.5896032, -90.4924862, 14.5744021, -90.4903404, 14.5790539, -90.5029575, 14.5932579, -90.5000393, 14.5992383, -90.5033009, 14.6079593, -90.5095665, 14.6108663, -90.5064766, 14.6159326, -90.5132572, 14.6168462
                ]
            },
            {
                name: 'Zona 7',
                coordinates: [
                    -90.5653595, 14.6402657, -90.5604672, 14.6343695, -90.5478501, 14.6337051, -90.540297, 14.6349508, -90.534203, 14.6376083, -90.5245041, 14.6339543, -90.5229592, 14.6431722, -90.5263924, 14.6509781, -90.5354904, 14.6501477, -90.5431294, 14.6445009, -90.5622696, 14.6410131, -90.5653595, 14.6402657
                ]
            },
            {
                name: 'Zona 14',
                coordinates: [
                    -90.5201267, 14.5902676, -90.5196118, 14.5939223, -90.5268215, 14.5775586, -90.5322289, 14.5619413, -90.5266499, 14.558203, -90.5184101, 14.5679225, -90.5062222, 14.581878, -90.5138611, 14.5919288, -90.5201267, 14.5902676
                ]
            },
            {
                name: 'Rosevelt',
                coordinates: [
                    -90.5573168, 14.6255249, -90.5460729, 14.6192961, -90.545515, 14.620355, -90.5618014, 14.6296566, -90.5697698, 14.6346806, -90.5809278, 14.6356771, -90.5954332, 14.6363415, -90.5981798, 14.6368397, -90.5981798, 14.6330196, -90.5712289, 14.6317739, -90.5573168, 14.6255249
                ]
            },
            ]

    })

    const Zones = await prisma.zone.createMany(
        {
            data: [
                {
                    name: 'Premium',
                },
                {
                    name: 'Average',
                },
                {
                    name: 'Suburban',
                },
            ]
        }
    )

    const polygonZone = await prisma.polygoneZone.createMany(
        {
            data: [
                {
                    zoneId: 1,
                    polygonId: 2,
                },
                {
                    zoneId: 1,
                    polygonId: 4,
                },
                {
                    zoneId: 2,
                    polygonId: 3,
                },
                {
                    zoneId: 3,
                    polygonId: 1,
                },
                {
                    zoneId: 3,
                    polygonId: 4,
                },
            ]
        }
    )

    const filters = await prisma.filter.createMany({
        data: [
            {
                campaignId: 1,
                name: 'Premium Zone',
                type: 'GEO',
                operation: 'IN',
                value: '1',
            },           
            {
                campaignId: 1,
                name: 'Autos',
                type: 'DEVICE',
                operation: 'EQUALS',
                value: 'CARTOP',
            },
            {
                campaignId: 2,
                name: 'SUV',
                type: 'VEHICLE',
                operation: 'EQUALS',
                value: 'SUV',
            },      
            {
                campaignId: 3,
                name: 'Nights',
                type: 'HOURS',
                operation: 'BETWEEN',
                value: '18:00, 23:59',
            },      
        ]
    })

    


    console.log(`Advertisers Seed -> ${JSON.stringify(advertisers)}`)
    console.log(`Campaigns Seed -> ${JSON.stringify(campaigns)}`)
    console.log(`Ads Seed -> ${JSON.stringify(ads)}`)
    console.log(`Publishers Seed -> ${JSON.stringify(publishers)}`)
    console.log(`Assets Seed -> ${JSON.stringify(assets)}`)
    console.log(`Vehicles Seed -> ${JSON.stringify(vehicles)}`)
    console.log(`Assets Vehicles -> ${JSON.stringify(assetVehicles)}`)
    console.log(`Drivers Seed -> ${JSON.stringify(drivers)}`)
    console.log(`Location Seed -> ${JSON.stringify(locations)}`)
    console.log(`Assets Locations -> ${JSON.stringify(assetLocations)}`)
    console.log(`Devices Seed -> ${JSON.stringify(devices)}`)
    console.log(`Tags Seed -> ${JSON.stringify(tags)}`)
    console.log(`Campaign Tags Seed -> ${JSON.stringify(campaignsTags)}`)
    console.log(`Polygon Seed -> ${JSON.stringify(polygons)}`)
    console.log(`Zones Seed -> ${JSON.stringify(Zones)}`)
    console.log(`Polygon Zones Seed -> ${JSON.stringify(polygonZone)}`)    
    console.log(`Filters Seed -> ${JSON.stringify(filters)}`)    


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
