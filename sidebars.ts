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
                        'mastering-the-stack/typescript/types-primitifs-variables-fonctions',
                        'mastering-the-stack/typescript/classes-heritage-modificateurs',
                        'mastering-the-stack/typescript/structures-de-donnees',
                        'mastering-the-stack/typescript/operateurs-rest-spread',
                        'mastering-the-stack/typescript/types-generiques'
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
