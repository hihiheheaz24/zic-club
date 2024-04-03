export default class NetworkListener {
    static callbacks: any
    static onOpen(ev) {};
    static onMessage(ev) {};
    static onError(ev) {};
    static onClose(ev) {};
    static getCall(callNum) {
    	if(!this.callbacks)
    		return false
    	return this.callbacks[callNum]
    };
    static setCallFuntion(callback, callNum) {
    	console.log('setCalll', callback)
    	if(!this.callbacks)
    		this.callbacks = {}
    	if(!this.callbacks[callNum])
    		this.callbacks[callNum] = callback
    	console.log('setCalll', this.callbacks[callNum])
    };
    static removeCallFunction(callNum) {
    	delete this.callbacks[callNum]
    }
}