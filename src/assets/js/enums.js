import store from "@/store"
import ajax from "@/api/index.js";

export let enums = {
    /********业务枚举*********/
    //活跃状态枚举列表 结构：{id:value}
    activeState: 'activeState',
    //经营品类枚举列表
    businessCategory: 'businessCategory',
    //经营性质枚举列表
    entityType: 'entityType',
    //售点审批状态枚举列表
    approvalState: 'approvalState',
    //售点验证状态枚举列表
    pocVerify: 'pocVerify',
    //经销商类型枚举列表
    wholesalerCategory: 'wholesalerCategory'
}

export class IgniteEnums {
    constructor(type) {
        this.keyValues = store.state[type];
        this.list = this.pickList();
        if (Object.keys(this.keyValues).length == 0) {
            this.loadData(type);
        }
        console.log("**********枚举("+type+")****:"+JSON.stringify(this.keyValues));
    }
    loadData(type) {
        switch (type) {
            case enums.businessCategory:
                ajax.get('GetCategory').then(ret =>{
                    store.commit('updateBusinessCategory', (ret.data || {}));
                    this.keyValues = (ret.data || {});
                    this.list = this.pickList();
                });
                break;
            case enums.entityType:
                ajax.get('GetEntityType').then(ret =>{
                    store.commit('updateEntityType', (ret.data || {}));
                    this.keyValues = (ret.data || {});
                    this.list = this.pickList();
                });
                break;
            case enums.wholesalerCategory:
                ajax.get('GetWholesalerCategory').then(ret =>{
                    store.commit('updateWholesalerCategory', (ret.data || {}));
                    this.keyValues = (ret.data || {});
                    this.list = this.pickList();
                });
                break;
            case enums.activeState:
                ajax.get('ActiveState').then(ret =>{
                    store.commit('updateActiveState', (ret.data || {}));
                    this.keyValues = (ret.data || {});
                    this.list = this.pickList();
                });
                break;
            case enums.approvalState:
                ajax.get('ApprovalState').then(ret =>{
                    store.commit('updateApprovalState', (ret.data || {}));
                    this.keyValues = (ret.data || {});
                    this.list = this.pickList();
                });
                break;
            case enums.pocVerify:
                ajax.get('PocVerify').then(ret =>{
                    store.commit('updatePocVerify', (ret.data || {}));
                    this.keyValues = (ret.data || {});
                    this.list = this.pickList();
                });
                break;
            default:
                break;
        }
    }
    pickList() {
        let list = [];
        for (let key in this.keyValues) {
            if (this.keyValues.hasOwnProperty(key)) {
                let value = this.keyValues[key];
                list.push({id: key, text:value});
            }
        }
        return list;
    }
    valueForKey(key) {
        return this.keyValues[`${key}`]||'';
    }
}
