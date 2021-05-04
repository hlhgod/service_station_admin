export function getMenuTree(parentid,menuList) {
    let menu=null;
    for (const m in menuList) {

        if(m.id===parentid){
            menu={}
        menu[]
           getMenuTree(m.id,menuList)
        } 
    }
        
}