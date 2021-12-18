export default class Response {
    public data:any; 
    public message:string; 
    public statusCode:number;
	constructor(data = {}, message = "Operation completed successfully") {
		this.data = data || {};
		this.message = message;
		this.statusCode = 200;
	}
}