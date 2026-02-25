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
