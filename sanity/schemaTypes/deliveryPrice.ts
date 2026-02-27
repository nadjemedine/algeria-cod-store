export const ALGERIAN_STATES = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
    'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
    'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
    'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
    'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès',
    'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Meniaa'
];

// Static delivery prices based on the official tariff table
export const STATIC_DELIVERY_PRICES: { wilayaName: string; homeDeliveryPrice: number | null; officeDeliveryPrice: number | null }[] = [
    { wilayaName: 'Adrar', homeDeliveryPrice: 1400, officeDeliveryPrice: 970 },
    { wilayaName: 'Chlef', homeDeliveryPrice: 800, officeDeliveryPrice: 520 },
    { wilayaName: 'Laghouat', homeDeliveryPrice: 950, officeDeliveryPrice: 620 },
    { wilayaName: 'Oum El Bouaghi', homeDeliveryPrice: 800, officeDeliveryPrice: 520 },
    { wilayaName: 'Batna', homeDeliveryPrice: 800, officeDeliveryPrice: 520 },
    { wilayaName: 'Béjaïa', homeDeliveryPrice: 500, officeDeliveryPrice: 450 },
    { wilayaName: 'Biskra', homeDeliveryPrice: 950, officeDeliveryPrice: 620 },
    { wilayaName: 'Béchar', homeDeliveryPrice: 1100, officeDeliveryPrice: 720 },
    { wilayaName: 'Blida', homeDeliveryPrice: 750, officeDeliveryPrice: 470 },
    { wilayaName: 'Bouira', homeDeliveryPrice: 700, officeDeliveryPrice: 520 },
    { wilayaName: 'Tamanrasset', homeDeliveryPrice: 1600, officeDeliveryPrice: 1120 },
    { wilayaName: 'Tébessa', homeDeliveryPrice: 800, officeDeliveryPrice: 520 },
    { wilayaName: 'Tlemcen', homeDeliveryPrice: 900, officeDeliveryPrice: 570 },
    { wilayaName: 'Tiaret', homeDeliveryPrice: 800, officeDeliveryPrice: 520 },
    { wilayaName: 'Tizi Ouzou', homeDeliveryPrice: 650, officeDeliveryPrice: 520 },
    { wilayaName: 'Alger', homeDeliveryPrice: 600, officeDeliveryPrice: 470 },
    { wilayaName: 'Djelfa', homeDeliveryPrice: 950, officeDeliveryPrice: 620 },
    { wilayaName: 'Jijel', homeDeliveryPrice: 700, officeDeliveryPrice: 520 },
    { wilayaName: 'Sétif', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Saïda', homeDeliveryPrice: 800, officeDeliveryPrice: 570 },
    { wilayaName: 'Skikda', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Sidi Bel Abbès', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Annaba', homeDeliveryPrice: 800, officeDeliveryPrice: 520 },
    { wilayaName: 'Guelma', homeDeliveryPrice: 800, officeDeliveryPrice: 520 },
    { wilayaName: 'Constantine', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Médéa', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Mostaganem', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: "M'Sila", homeDeliveryPrice: 850, officeDeliveryPrice: 570 },
    { wilayaName: 'Mascara', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Ouargla', homeDeliveryPrice: 1000, officeDeliveryPrice: 670 },
    { wilayaName: 'Oran', homeDeliveryPrice: 700, officeDeliveryPrice: 520 },
    { wilayaName: 'El Bayadh', homeDeliveryPrice: 1050, officeDeliveryPrice: 670 },
    { wilayaName: 'Illizi', homeDeliveryPrice: null, officeDeliveryPrice: null },
    { wilayaName: 'Bordj Bou Arréridj', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Boumerdès', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'El Tarf', homeDeliveryPrice: 850, officeDeliveryPrice: 520 },
    { wilayaName: 'Tindouf', homeDeliveryPrice: null, officeDeliveryPrice: null },
    { wilayaName: 'Tissemsilt', homeDeliveryPrice: 800, officeDeliveryPrice: null },
    { wilayaName: 'El Oued', homeDeliveryPrice: 1000, officeDeliveryPrice: 670 },
    { wilayaName: 'Khenchela', homeDeliveryPrice: 800, officeDeliveryPrice: null },
    { wilayaName: 'Souk Ahras', homeDeliveryPrice: 800, officeDeliveryPrice: 520 },
    { wilayaName: 'Tipaza', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Mila', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Aïn Defla', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Naâma', homeDeliveryPrice: 1100, officeDeliveryPrice: 670 },
    { wilayaName: 'Aïn Témouchent', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Ghardaïa', homeDeliveryPrice: 1000, officeDeliveryPrice: 620 },
    { wilayaName: 'Relizane', homeDeliveryPrice: 750, officeDeliveryPrice: 520 },
    { wilayaName: 'Timimoun', homeDeliveryPrice: 1400, officeDeliveryPrice: null },
    { wilayaName: 'Bordj Badji Mokhtar', homeDeliveryPrice: null, officeDeliveryPrice: null },
    { wilayaName: 'Ouled Djellal', homeDeliveryPrice: 950, officeDeliveryPrice: 620 },
    { wilayaName: 'Béni Abbès', homeDeliveryPrice: 1000, officeDeliveryPrice: 970 },
    { wilayaName: 'In Salah', homeDeliveryPrice: 1600, officeDeliveryPrice: null },
    { wilayaName: 'In Guezzam', homeDeliveryPrice: 1600, officeDeliveryPrice: null },
    { wilayaName: 'Touggourt', homeDeliveryPrice: 1000, officeDeliveryPrice: 670 },
    { wilayaName: 'Djanet', homeDeliveryPrice: null, officeDeliveryPrice: null },
    { wilayaName: "El M'Ghair", homeDeliveryPrice: 1000, officeDeliveryPrice: null },
    { wilayaName: 'El Meniaa', homeDeliveryPrice: 1000, officeDeliveryPrice: null },
];


export const deliveryPricesSchema = {
    name: 'deliveryPrice',
    title: 'Delivery Price',
    type: 'document',
    fields: [
        {
            name: 'wilayaName',
            title: 'Wilaya Name',
            type: 'string',
            options: {
                list: ALGERIAN_STATES.map((state, index) => ({
                    title: `${String(index + 1).padStart(2, '0')} - ${state}`,
                    value: state,
                })),
            }
        },
        {
            name: 'homeDeliveryPrice',
            title: 'Home Delivery Price',
            type: 'number',
        },
        {
            name: 'officeDeliveryPrice',
            title: 'Office Delivery Price',
            type: 'number',
        },
    ],
    preview: {
        select: {
            title: 'wilayaName',
            home: 'homeDeliveryPrice',
            office: 'officeDeliveryPrice',
        },
        prepare(selection: any) {
            const { title, home, office } = selection;
            return {
                title: title,
                subtitle: `Home: ${home} DZD | Office: ${office} DZD`,
            };
        },
    },
};
