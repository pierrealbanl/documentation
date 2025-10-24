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
                        'category/java/introduction',
                        'category/java/oop',
                        'category/java/types',
                    ]
                },
                'category/typescript',
                'category/react',
                'category/angular',
                'category/css',
            ],
        },
        'english-guide'
    ],
}
