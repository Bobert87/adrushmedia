const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const advertisers = await prisma.advertiser.createMany({

        data: [{
            name: 'Great Ads',
            type: 'agency',
            email: 'info@greatads.com',
            phone: '123-456-7890',
            address: '123 Main St, Anytown, USA',
            budget: 1000000,
            term: 'net 30'
        },
        {
            name: 'Grupo MK',
            type: 'agency',
            email: 'info@grupomk.com',
            phone: '123-456-7890',
            address: '123 Main St, Anytown, USA',
            budget: 1000000,
            term: 'net 60'
        },
        {
            name: 'Ninja View',
            type: 'agency',
            email: 'info@ninjaview.com',
            phone: '123-456-7891',
            address: '124 Main St, Anytown, USA',
            budget: 2000000,
            term: 'prepaid'
        },
        {
            name: 'Great Story',
            type: 'agency',
            email: 'info@greatstory.com',
            phone: '123-456-7892',
            address: '125 Main St, Anytown, USA',
            budget: 3000000,
            term: 'net 30'
        },
        {
            name: 'Hill St LTD',
            type: 'agency',
            email: 'info@hillstltd.com',
            phone: '123-456-7893',
            address: '126 Main St, Anytown, USA',
            budget: 4000000,
            term: 'net 30'
        },
        {
            name: 'DSA Adv',
            type: 'agency',
            email: 'info@dsaadv.com',
            phone: '123-456-7894',
            address: '127 Main St, Anytown, USA',
            budget: 5000000,
            term: 'net 30'
        },
        {
            name: 'Others Inc',
            type: 'agency',
            email: 'info@othersinc.com',
            phone: '123-456-7895',
            address: '128 Main St, Anytown, USA',
            budget: 6000000,
            term: 'net 30'
        },
        {
            name: 'Finally GA',
            type: 'agency',
            email: 'info@finallyga.com',
            phone: '123-456-7896',
            address: '129 Main St, Anytown, USA',
            budget: 7000000,
            term: 'net 30'
        },
        {
            name: 'EP Inc',
            type: 'agency',
            email: 'info@epinc.com',
            phone: '123-456-7897',
            address: '130 Main St, Anytown, USA',
            budget: 8000000,
            term: 'net 30'
        },
        {
            name: 'Kualus',
            type: 'agency',
            email: 'info@kualus.com',
            phone: '123-456-7898',
            address: '131 Main St, Anytown, USA',
            budget: 9000000,
            term: 'net 30'
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
            status: 'active',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2024-12-31'),
        },
        {
            advertiserId: 1,
            name: 'Medium Zone',
            brand: 'Samsung Galaxy 20',
            maxBid: 0.03,
            budget: 500,
            startDate: new Date('2021-01-01'),
            endDate: new Date('2024-05-01'),
            status: 'expired',
        },
        {
            advertiserId: 1,
            name: 'Low Zone',
            brand: 'Huawei P30',
            maxBid: 0.01,
            budget: 250,
            status: 'paused',
            startDate: new Date('2021-01-01'),
        },
        {
            advertiserId: 2,
            name: 'Restaurants',
            brand: 'Cafe Rumano',
            maxBid: 0.03,
            budget: 350,
            status: 'active',
            startDate: new Date('2024-01-01'),
        },
        {
            advertiserId: 2,
            name: 'Restaurants',
            brand: 'Cafe Baritono',
            maxBid: 0.035,
            budget: 380,
            status: 'active',
            startDate: new Date('2024-01-01'),
        },
        {

            advertiserId: 3,
            name: 'Ninja View Campaign',
            brand: 'Ninja View',
            maxBid: 0.04,
            budget: 3000,
            status: 'active',
            startDate: new Date('2024-05-01'),
            endDate: new Date('2024-05-31'),
        },
        {
            advertiserId: 4,
            name: 'Great Story Campaign',
            brand: 'Great Story',
            maxBid: 0.05,
            budget: 400,
            status: 'active',
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-07-31'),
        },
        {
            advertiserId: 5,
            name: 'Hill St LTD Campaign',
            brand: 'Hill St LTD',
            maxBid: 0.06,
            budget: 500.45,
            status: 'active',
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-12-31'),
        },
        {
            advertiserId: 6,
            name: 'DSA Adv Campaign',
            brand: 'DSA Adv',
            status: 'active',
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
            status: 'paused',
            startDate: new Date('2024-04-01'),
            endDate: new Date('2024-09-31'),
        },
        {
            advertiserId: 8,
            name: 'Finally GA Campaign',
            brand: 'Finally GA',
            maxBid: 0.08,
            budget: 800,
            startDate: new Date('2021-01-01'),
            endDate: new Date('2021-12-31'),
            status: 'expired',
        },
        {
            advertiserId: 9,
            name: 'EP Inc Campaign',
            brand: 'EP Inc',
            maxBid: 0.09,
            budget: 900,
            status: 'active',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
        },
        {
            advertiserId: 10,
            name: 'Kualus Campaign',
            brand: 'Kualus',
            maxBid: 0.1,
            budget: 1000,
            status: 'active',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
        }
        ]
    })
    console.log(`Advertisers Seed -> ${JSON.stringify(advertisers)}`)
    console.log(`Campaigns Seed -> ${JSON.stringify(campaigns)}`)
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
