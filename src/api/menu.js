import request from '@/utils/request'


export default {
    
    // 查询菜单列表
    getList(query) {
        return request({
            url: `/menu/search`,
            method: 'post',
            data: query
        })
    },

    // 新增
    add(data) {
        return request({
            url: `/menu`,
            method: 'post',
            data
        })
    },

    // 查询详情 
    getById(id) {
        return request({
            url: `/menu/${id}`,
            method: 'get'
        })
    },

    // 更新
    update(data) {
        return request({
            url: `/menu`,
            method: 'put',
            data
        })
    },

    deleteById(id) { 
        return request({
            url: `/menu/${id}`,
            method: 'delete'
        })
    }
    

}