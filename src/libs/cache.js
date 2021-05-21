/**
 * @author zhanglinchao
 */

class CacheItem{
    constructor(){
        this.callbackArray = [];
        this.fetching = false;
        this.data = null;
    }

    get(handler, callback){
        if(callback){
            this.callbackArray.push(callback);
        }
        this._fetch(handler, function(data, error){
            for (var i = 0; i < this.callbackArray.length; i++) {
                var cb = this.callbackArray[i];
                if(cb){
                    cb(data, error);
                }
            }
            this.callbackArray = [];
        }.bind(this));
    }

    _fetch(handler, callback){
        if(!this.fetching){
            if(this.data){
                callback(this.data);
            }else{
                this.fetching = true;
                handler(function(data, error){
                    this.fetching = false;
                    this.data = data;
                    callback(data, error);
                }.bind(this));
            }
        }
    }

    reset(){
        if(!this.fetching){
            this.data = null;
        }
    }
}

class Cache{
    constructor() {
        this.items = {};
    }

    get(name, handler, callback){
        this.items[name] = this.items[name] || new CacheItem();
        this.items[name].get(handler, callback);
    }

    reset(name){
        if(this.items[name]){
            this.items[name].reset();
        }
    }

    resetAll(){
        for (var key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                this.items[key].reset();
            }
        }
    }

}


export default Cache;

