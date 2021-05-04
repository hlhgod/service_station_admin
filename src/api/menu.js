import request from '@/utils/request'


export default {
    
    // 查询菜单列表
    getList(query) {
        return request({
            url: `/template`,
            method: 'get',
            params: query
        })
    },

    // 新增
    add(data) {
        return request({
            url: `/template`,
            method: 'post',
            data
        })
    },

    // 查询详情 
    getById(id) {
        return request({
            url: `/template/${id}`,
            method: 'get'
        })
    },

    // 更新
    update(data) {
        return request({
            url: `/template`,
            method: 'put',
            data
        })
    },

    deleteById(id) { 
        return request({
            url: `/template/${id}`,
            method: 'delete'
        })
    }
    

}