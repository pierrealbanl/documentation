module.exports = {
    adminSidebar: [
        'intro',
        'raccourcis-ide',
        {
            type: 'category',
            label: 'Mastering the Stack: Complete Guide',
            items: [
                {
                    type: 'category',
                    label: 'Java',
                    items: [
                        'mastering-the-stack/java/introduction',
                        'mastering-the-stack/java/concepts-avances-poo',
                        'mastering-the-stack/java/types-de-reference',
                        'mastering-the-stack/java/java-avance'
                    ]
                },
                {
                    type: 'category',
                    label: 'TypeScript',
                    items: [
                        'mastering-the-stack/typescript/introduction',
                        'mastering-the-stack/typescript/types-variables-et-fonctions',
                        'mastering-the-stack/typescript/structures-donnees-et-poo'
                    ]
                },
                'mastering-the-stack/react',
                'mastering-the-stack/angular',
                'mastering-the-stack/css'
            ],
        },
        'maitriser-anglais'
    ],
}
