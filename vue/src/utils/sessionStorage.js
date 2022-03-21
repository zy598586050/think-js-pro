/**
 * sessionStorage二次封装
 */
 import config from "../config"
 export default {
     getStroage(){
         return JSON.parse(window.sessionStorage.getItem(config.namespace) || "{}")
     },
     setItem(key,val){
         let storage = this.getStroage()
         storage[key] = val
         window.sessionStorage.setItem(config.namespace,JSON.stringify(storage))
     },
     getItem(key){
         return this.getStroage()[key]
     },
     clearItem(key){
         let storage = this.getStroage()
         delete storage[key]
         window.sessionStorage.setItem(config.namespace,JSON.stringify(storage))
     },
     clearAll(){
         window.sessionStorage.clear()
     }
 }