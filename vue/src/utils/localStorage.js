/**
 * localStorage二次封装
 */
import config from "../config"
export default {
    getStroage(){
        return JSON.parse(window.localStorage.getItem(config.namespace) || "{}")
    },
    setItem(key,val){
        let storage = this.getStroage()
        storage[key] = val
        window.localStorage.setItem(config.namespace,JSON.stringify(storage))
    },
    getItem(key){
        return this.getStroage()[key]
    },
    clearItem(key){
        let storage = this.getStroage()
        delete storage[key]
        window.localStorage.setItem(config.namespace,JSON.stringify(storage))
    },
    clearAll(){
        window.localStorage.clear()
    }
}