export const state = () => ({
  structure: [
      {
          name: 'Главная',
          url: '/',
          auth: false,
          rule: '',
          child: []
      },
      {
          name: 'Начать играть',
          url: '/start/',
          auth: false,
          rule: '',
          child: []
      },
      {
          name: 'Сервера',
          url: '/servers/',
          auth: false,
          rule: '',
          child: [
            {
              name: 'Рейтинг онлайна',
              url: '/servers/rating/',
              auth: false,
              rule: '',
            },
          ]
      },
      {
          name: 'Информация',
          url: '/info/',
          auth: false,
          rule: '',
          child: [
            {
              name: 'Новости',
              url: '/info/news/',
              auth: false,
              rule: '',
            },
            {
              name: 'Wiki',
              url: 'https://wiki.goodminecraft.com/',
              auth: false,
              rule: '',
              targetBlank: true
            },
          ]
      },
      {
          name: 'Голосование',
          url: '/vote/',
          auth: false,
          rule: '',
          child: []
      },
      {
          name: 'Пожертвования',
          url: '/donate/',
          auth: false,
          rule: '',
          child: []
      },
      {
          name: 'Личный кабинет',
          url: '/cabinet/',
          auth: true,
          rule: '',
          child: [
              {
                  name: 'Привилегии',
                  url: '/cabinet/privileges/',
                  auth: true,
                  rule: '',
              },
              {
                  name: 'Магазин',
                  url: '/cabinet/shop/',
                  auth: true,
                  rule: '',
              }
          ]
      }
  ],
  adminStructure: [
    {
      name: 'Основное',
      rule: ['adminpanel'],
      url: '/admin/',
      child: [
        {
          name: 'Сводка',
          url: '/admin/',
          rule: 'adminpanel'
        },
      ]
    },
    {
      name: 'Статистика',
      rule: ['stat'],
      url: '/admin/stats/',
      child: [
        // {
        //   name: 'Пользователи',
        //   url: '/admin/stats/users/',
        //   rule: 'stat.users'
        // },
        {
          name: 'Сервера',
          url: '/admin/stats/servers/',
          rule: 'stat.servers'
        },
        // {
        //   name: 'Деньги',
        //   url: '/admin/stats/money/',
        //   rule: 'stat.money'
        // },
      ]
    },
    {
      name: 'Пользователи',
      rule: ['users','admins'],
      url: '/admin/users/',
      child: [
        {
          name: 'Список пользователей',
          url: '/admin/users/all/',
          rule: 'users.list'
        },
        // {
        //   name: 'Карта администрации',
        //   url: '/admin/users/admins/',
        //   rule: 'admins.list'
        // },
      ]
    },
    // {
    //   name: 'Модуль статей',
    //   rule: ['article'],
    //   url: '/admin/article/',
    //   child: [
    //     {
    //       name: 'Список статей',
    //       url: '/admin/article/all/',
    //       rule: 'article.list'
    //     },
    //     {
    //       name: 'Категории',
    //       url: '/admin/article/sections/',
    //       rule: 'article.sections'
    //     },
    //     {
    //       name: 'Создать статью',
    //       url: '/admin/article/add/',
    //       rule: 'article.change'
    //     },
    //   ]
    // },
    {
      name: 'Сервера',
      rule: ['servers'],
      url: '/admin/servers/',
      child: [
        {
          name: 'Список серверов',
          url: '/admin/servers/all/',
          rule: 'servers.list'
        },
        {
          name: 'Модификации',
          url: '/admin/servers/mods/',
          rule: 'servers.mods'
        },
      ]
    },
    {
      name: 'Продажи',
      rule: ['sell'],
      url: '/admin/sell/',
      child: [
        {
          name: 'Привилегии',
          url: '/admin/sell/privileges/',
          rule: 'sell.privileges'
        },
        {
          name: 'Магазин',
          url: '/admin/sell/shop/',
          rule: 'sell.shop'
        },
        // {
        //   name: 'Аренда',
        //   url: '/admin/sell/rent/',
        //   rule: 'sell.rent'
        // },
      ]
    },
    // {
    //   name: 'Система',
    //   rule: ['system'],
    //   url: '/admin/system/',
    //   child: [
    //     {
    //       name: 'Команды',
    //       url: '/admin/system/command/',
    //       rule: 'system.control'
    //     }
    //   ]
    // },
  ],
  navigateOpen: false,
  navigateCloseAnimation: false,
  showModalPayment: false
})

export const mutations = {
  modalPaymentTrigger (state) {
    state.showModalPayment = !state.showModalPayment;
  },
  navigateMobileTrigger (state) {
    state.navigateOpen = !state.navigateOpen;
  },
  navigateMobileAniamteTrigger (state) {
    state.navigateCloseAnimation = !state.navigateCloseAnimation;
  }
}
