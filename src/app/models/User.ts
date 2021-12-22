export class User{
constructor(
    public id: string,
    public email: string,
    private token: string,
    private tokenExpirationDate: Date
){}

get userToken(){
if(!this.tokenExpirationDate || this.tokenExpirationDate < new Date()){
    return null;
}
return this.token;
}
}