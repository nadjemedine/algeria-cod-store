const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length > 0) process.env[key.trim()] = rest.join('=').trim();
});

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const deliveryPrices = [
    { "wilayaName": "Adrar", "homeDeliveryPrice": 1400, "officeDeliveryPrice": 970 },
    { "wilayaName": "Chlef", "homeDeliveryPrice": 800, "officeDeliveryPrice": 520 },
    { "wilayaName": "Laghouat", "homeDeliveryPrice": 950, "officeDeliveryPrice": 620 },
    { "wilayaName": "Oum El Bouaghi", "homeDeliveryPrice": 800, "officeDeliveryPrice": 520 },
    { "wilayaName": "Batna", "homeDeliveryPrice": 800, "officeDeliveryPrice": 520 },
    { "wilayaName": "Béjaïa", "homeDeliveryPrice": 500, "officeDeliveryPrice": 450 },
    { "wilayaName": "Biskra", "homeDeliveryPrice": 950, "officeDeliveryPrice": 620 },
    { "wilayaName": "Béchar", "homeDeliveryPrice": 1100, "officeDeliveryPrice": 720 },
    { "wilayaName": "Blida", "homeDeliveryPrice": 750, "officeDeliveryPrice": 470 },
    { "wilayaName": "Bouira", "homeDeliveryPrice": 700, "officeDeliveryPrice": 520 },
    { "wilayaName": "Tamanrasset", "homeDeliveryPrice": 1600, "officeDeliveryPrice": 1120 },
    { "wilayaName": "Tébessa", "homeDeliveryPrice": 800, "officeDeliveryPrice": 520 },
    { "wilayaName": "Tlemcen", "homeDeliveryPrice": 900, "officeDeliveryPrice": 570 },
    { "wilayaName": "Tiaret", "homeDeliveryPrice": 800, "officeDeliveryPrice": 520 },
    { "wilayaName": "Tizi Ouzou", "homeDeliveryPrice": 650, "officeDeliveryPrice": 520 },
    { "wilayaName": "Alger", "homeDeliveryPrice": 600, "officeDeliveryPrice": 470 },
    { "wilayaName": "Djelfa", "homeDeliveryPrice": 950, "officeDeliveryPrice": 620 },
    { "wilayaName": "Jijel", "homeDeliveryPrice": 700, "officeDeliveryPrice": 520 },
    { "wilayaName": "Sétif", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Saïda", "homeDeliveryPrice": 800, "officeDeliveryPrice": 570 },
    { "wilayaName": "Skikda", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Sidi Bel Abbès", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Annaba", "homeDeliveryPrice": 800, "officeDeliveryPrice": 520 },
    { "wilayaName": "Guelma", "homeDeliveryPrice": 800, "officeDeliveryPrice": 520 },
    { "wilayaName": "Constantine", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Médéa", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Mostaganem", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "M'Sila", "homeDeliveryPrice": 850, "officeDeliveryPrice": 570 },
    { "wilayaName": "Mascara", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Ouargla", "homeDeliveryPrice": 1000, "officeDeliveryPrice": 670 },
    { "wilayaName": "Oran", "homeDeliveryPrice": 700, "officeDeliveryPrice": 520 },
    { "wilayaName": "El Bayadh", "homeDeliveryPrice": 1050, "officeDeliveryPrice": 670 },
    { "wilayaName": "Illizi", "homeDeliveryPrice": null, "officeDeliveryPrice": null },
    { "wilayaName": "Bordj Bou Arréridj", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Boumerdès", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "El Tarf", "homeDeliveryPrice": 850, "officeDeliveryPrice": 520 },
    { "wilayaName": "Tindouf", "homeDeliveryPrice": null, "officeDeliveryPrice": null },
    { "wilayaName": "Tissemsilt", "homeDeliveryPrice": 800, "officeDeliveryPrice": null },
    { "wilayaName": "El Oued", "homeDeliveryPrice": 1000, "officeDeliveryPrice": 670 },
    { "wilayaName": "Khenchela", "homeDeliveryPrice": 800, "officeDeliveryPrice": null },
    { "wilayaName": "Souk Ahras", "homeDeliveryPrice": 800, "officeDeliveryPrice": 520 },
    { "wilayaName": "Tipaza", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Mila", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Aïn Defla", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Naâma", "homeDeliveryPrice": 1100, "officeDeliveryPrice": 670 },
    { "wilayaName": "Aïn Témouchent", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Ghardaïa", "homeDeliveryPrice": 1000, "officeDeliveryPrice": 620 },
    { "wilayaName": "Relizane", "homeDeliveryPrice": 750, "officeDeliveryPrice": 520 },
    { "wilayaName": "Timimoun", "homeDeliveryPrice": 1400, "officeDeliveryPrice": null },
    { "wilayaName": "Bordj Badji Mokhtar", "homeDeliveryPrice": null, "officeDeliveryPrice": null },
    { "wilayaName": "Ouled Djellal", "homeDeliveryPrice": 950, "officeDeliveryPrice": 620 },
    { "wilayaName": "Béni Abbès", "homeDeliveryPrice": 1000, "officeDeliveryPrice": 970 },
    { "wilayaName": "In Salah", "homeDeliveryPrice": 1600, "officeDeliveryPrice": null },
    { "wilayaName": "In Guezzam", "homeDeliveryPrice": 1600, "officeDeliveryPrice": null },
    { "wilayaName": "Touggourt", "homeDeliveryPrice": 1000, "officeDeliveryPrice": 670 },
    { "wilayaName": "Djanet", "homeDeliveryPrice": null, "officeDeliveryPrice": null },
    { "wilayaName": "El M'Ghair", "homeDeliveryPrice": 1000, "officeDeliveryPrice": null },
    { "wilayaName": "El Meniaa", "homeDeliveryPrice": 1000, "officeDeliveryPrice": null }
];

async function seed() {
    console.log('Fetching existing delivery prices...');
    const existingIdQuery = '*[_type == "deliveryPrice"]._id';
    const existingIds = await client.fetch(existingIdQuery);

    console.log(`Deleting ${existingIds.length} existing documents...`);
    if (existingIds.length > 0) {
        const transaction = client.transaction();
        existingIds.forEach(id => transaction.delete(id));
        await transaction.commit();
    }

    console.log('Importing new delivery prices...');
    const newTransaction = client.transaction();
    deliveryPrices.forEach(price => {
        newTransaction.create({
            _type: 'deliveryPrice',
            wilayaName: price.wilayaName,
            homeDeliveryPrice: price.homeDeliveryPrice,
            officeDeliveryPrice: price.officeDeliveryPrice,
        });
    });

    await newTransaction.commit();
    console.log('Seeding completed successfully!');
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
