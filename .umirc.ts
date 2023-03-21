import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '调解核身',
      path: '/Mediate',
      component: './Mediate',
    },
    {
      name: '套餐服务包',
      path: '/packageService',
      component: './PackageService',
    },
    {
      name: '服务包购买订单',
      path: '/servicePackage',
      component: './ServicePackage',
    },
    {
      name: '套餐使用记录',
      path: '/packageUsageRecord',
      component: './PackageUsageRecord',
    },
    {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
    },
  ],
  npmClient: 'yarn',
});

