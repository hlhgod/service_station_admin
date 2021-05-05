
export function getMenuTree(parentid,menuList,newMenuList) {
    // let menu=null;
    // for (const m in menuList) {

    //     if(m.id===parentid){
    //         menu={}
    //     menu[]
    //        getMenuTree(m.id,menuList)
    //     } 
    // }
    
    

    menuList.forEach(item=>{
        if(item.parent_id===parentid){
            if(parentid===0){
                newMenuList.push(item)
            }else{
                let index =menu.findindex(item=>{
                    item.id===parentid
                })
                newMenuList[index]["children"]=item
            }
            
            getMenuTree(item.id,menuList)
        }else{
            return
        }
        
    })
        
}