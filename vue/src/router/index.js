import { createRouter, createWebHashHistory } from 'vue-router'

// 路由配置
const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component: () => import('@/views/home/index.vue')
    }
]

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router