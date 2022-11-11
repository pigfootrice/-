import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,  // 控制菜单的展开和收起
        tabsList: [
            {
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
            },
        ],
        menu:[]
    },
    mutations: {
        // 修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state,val) {
            console.log(val)
            // 判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        // 删除指定的tag数据
        closeTag(state,item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index,1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state, router) {
            if (Cookie.get('menu')) {     // 判断当前缓存中是否有数据
                const menu = JSON.parse(Cookie.get('menu'))
                state.menu = menu
                const menuArray = []
                menu.forEach(item => {
                    if (item.children) {
                        item.children = item.children.map(item => {
                            item.component = () => import(`../views/${item.url}`)
                            return item
                        })
                        menuArray.push(...item.children)
                    } else {
                        item.component = () => import(`../views/${item.url}`)
                        menuArray.push(item)
                    }
                });
                // 路由的动态添加
                menuArray.forEach(item => {
                    router.addRoute('Main',item)
                })
            }
        }
    }

}