export const generalConfig = {
    appName: 'The king shopsr',
    platformName: 'The king shopsr',
    defaultLanguage: 'fr',
    roles: ['admin'],
}

export const navBarConfig = {
    menus: [
        {
            display: 'Blog',
            route: 'blogs',
            icon: 'add_circle_outline'
        },
        {
            display: 'Evenements',
            route: 'events',
            icon: 'add_circle_outline'
        },
        {
            display: 'Administrateurs',
            route: 'admins',
            icon: 'category'
        },
        {
            display: 'Dons',
            route: 'donations',
            icon: 'shopping_basket'
        },
        {
            display: 'Membres',
            route: 'members',
            icon: 'add_circle_outline'
        },
        {
            display: 'Boutique',
            route: 'shop',
            icon: 'add_circle_outline'
        },
        {
            display: 'Commandes',
            route: 'orders',
            icon: 'add_circle_outline'
        }
    ],

    topBar : [
        
        {
            display : 'Mon profile',
            route: 'profil',
            icon: 'account_circle',
            link: false
        }
    ]
};