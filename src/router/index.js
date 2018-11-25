import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => _import('login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => _import('errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => _import('errorPage/401'),
    hidden: true
  },
  {
    path: '/redirect', component: Layout, hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => _import('redirect/index')
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => _import('dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: () => _import('documentation/index'),
      name: 'Documentation',
      meta: {
        title: 'documentation',
        icon: 'documentation',
        noCache: true
      }
    }]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [{
      path: 'index',
      component: () => _import('guide/index'),
      name: 'Guide',
      meta: {
        title: 'guide',
        icon: 'guide',
        noCache: true
      }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    meta: { perm: 'm:sys', title: '系统管理', icon: 'chart' },
    children: [
      {
        path: 'org_manage',
        name: 'org_manage',
        component: _import('_system/org/index'),
        meta: { perm: 'm:sys:role', title: '机构管理', icon: 'chart', noCache: true }
      },
      {
        path: 'user_manage',
        name: 'user_manage',
        component: _import('_system/user/index'),
        meta: { perm: 'm:sys:user', title: '用户管理', icon: 'chart', noCache: true }
      },
      {
        path: 'role_manage',
        name: 'role_manage',
        component: _import('_system/role/index'),
        meta: { perm: 'm:sys:role', title: '角色管理', icon: 'chart', noCache: true }
      },
      {
        hidden: true,
        path: 'role_manage/:roleId/assign_perm',
        name: 'role_manage_assign_perm',
        component: _import('_system/role/assign_perm'),
        meta: { hiddenTag: true, title: '角色授权' }
      },
      {
        path: 'perm_manage',
        name: 'perm_manage',
        component: _import('_system/perm/index'),
        meta: { perm: 'm:sys:perm', title: '权限管理', icon: 'chart', noCache: true }

      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  {
    path: '/menu1',
    component: Layout,
    meta: { perm: 'm:menu1', title: '信息发布', icon: 'icon' },
    children: [
      {
        path: 'index11',
        name: 'menu11',
        component: _import('menu/menu1'),
        meta: { perm: 'm:menu1', title: '概要信息', icon: 'icon' }
      },
      {
        path: 'index12',
        name: 'menu12',
        component: _import('menu/menu1'),
        meta: { perm: 'm:menu1', title: '机构职能', icon: 'icon' }
      },
      {
        path: 'index13',
        name: 'menu13',
        component: _import('menu/menu1'),
        meta: { perm: 'm:menu1', title: '负责人信息', icon: 'icon' }
      },
      {
        path: 'index14',
        name: 'menu14',
        component: _import('menu/menu1'),
        meta: { perm: 'm:menu1', title: '文件资料', icon: 'icon' }
      },
      {
        path: 'index15',
        name: 'menu15',
        component: _import('menu/menu1'),
        meta: { perm: 'm:menu1', title: '政务信息', icon: 'icon' }
      },
      {
        path: 'index16',
        name: 'menu16',
        component: _import('menu/menu1'),
        meta: { perm: 'm:menu1', title: '信息公开', icon: 'icon' }
      },
      {
        path: 'index17',
        name: 'menu17',
        component: _import('menu/menu1'),
        meta: { perm: 'm:menu1', title: '数据发布', icon: 'icon' }
      },
      {
        path: 'index18',
        name: 'menu18',
        component: _import('menu/menu1'),
        meta: { perm: 'm:menu1', title: '数据开放', icon: 'icon' }
      }
    ]
  },

  {
    path: '/menu2',
    component: Layout,
    meta: { perm: 'm:menu2', title: '解读回应', icon: 'icon' },
    children: [
      {
        path: 'index21',
        name: 'menu21',
        component: _import('menu/menu2'),
        meta: { perm: 'm:menu2', title: '解读回应专访', icon: 'icon' }
      },
      {
        path: 'index22',
        name: 'menu22',
        component: _import('menu/menu2'),
        meta: { perm: 'm:menu2', title: '分类提炼精简', icon: 'icon' }
      },
      {
        path: 'index23',
        name: 'menu23',
        component: _import('menu/menu2'),
        meta: { perm: 'm:menu2', title: '转载传播增强', icon: 'icon' }
      },
      {
        path: 'index24',
        name: 'menu24',
        component: _import('menu/menu2'),
        meta: { perm: 'm:menu2', title: '及时准确主动', icon: 'icon' }
      }
    ]
  },

  {
    path: '/menu3',
    component: Layout,
    meta: { perm: 'm:menu3', title: '办事服务', icon: 'chart' },
    children: [
      {
        path: 'menu3_1',
        component: _import('menu/menu3_1'),
        name: 'menu3_1',
        meta: { perm: 'm:menu3:1', title: '服务事项目录', icon: 'chart', noCache: true }
      },
      {
        path: 'menu3_2',
        component: _import('menu/menu3_2'),
        name: 'menu3_2',
        meta: { perm: 'm:menu3:2', title: '关联信息资源', icon: 'chart', noCache: true }
      },
      {
        path: 'menu3_3',
        component: _import('menu/menu3_3'),
        name: 'menu3_3',
        meta: { perm: 'm:menu3:3', title: '统一在线服务', icon: 'chart', noCache: true }
      },
      {
        path: 'menu3_4',
        component: _import('menu/menu3_4'),
        name: 'menu3_4',
        meta: { perm: 'm:menu3:3', title: '精细化办事指南', icon: 'chart', noCache: true }
      },
      {
        path: 'menu3_5',
        component: _import('menu/menu3_5'),
        name: 'menu3_5',
        meta: { perm: 'm:menu3:3', title: '记录办事过程', icon: 'chart', noCache: true }
      }
    ]
  },

  {
    path: '/menu4',
    name: 'menu4',
    component: Layout,
    meta: { perm: 'm:menu4', title: '互动交流', icon: 'example' },
    children: [
      {
        path: 'menu4_1',
        name: 'menu4_1',
        icon: 'tab',
        component: _import('menu/menu4_1/index'),
        meta: { perm: 'm:menu4:2', title: '统一建设互动交流', icon: 'table' }
      },
      {
        path: 'menu4_2',
        name: 'menu4_2',
        icon: 'tab',
        component: _import('menu/menu4_2/index'),
        meta: { perm: 'm:menu4:2', title: '数据汇聚统一处理', icon: 'table' }
      },
      {
        path: 'menu4_3',
        name: 'menu4_3',
        icon: 'tab',
        component: _import('menu/menu4_3/index'),
        meta: { perm: 'm:menu4:2', title: '审核把关有序处理', icon: 'table' }
      },
      {
        path: 'menu4_4',
        name: 'menu4_4',
        icon: 'tab',
        component: _import('menu/menu4_4/index'),
        meta: { perm: 'm:menu4:2', title: '认真客观处理回复', icon: 'table' }
      },
      {
        path: 'menu4_5',
        name: 'menu4_5',
        icon: 'tab',
        component: _import('menu/menu4_5/index'),
        meta: { perm: 'm:menu4:2', title: '意见受理公开公布', icon: 'table' }
      },
      {
        path: 'menu4_6',
        name: 'menu4_6',
        icon: 'tab',
        component: _import('menu/menu4_6/index'),
        meta: { perm: 'm:menu4:2', title: '形成更新知识库', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
