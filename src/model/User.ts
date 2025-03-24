import mongoose,{Schema,Document} from 'mongoose';
export interface Message extends Document{
    content:string;
    createdAt:Date;
}
export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpires:Date;
    isAcceptingMessages:boolean;
    isVerified:boolean;
    messages:Message[];
}
const MessageSchema:Schema<Message> = new Schema({
    content:{type:String,required:true},
    createdAt:{type:Date,required:true,default:Date.now}
});
const UserSchema:Schema<User> = new Schema({
    username:{type:String,required:[true,'Username is required'],unique:true,trim:true},
    email:{type:String,required:[true,'Email is required'],unique:true, match:[/^\S+@\S+\.\S+$/,'Please enter a valid email address']},
    password:{type:String,required:[true,'Password is required'],minlength:[6,'Password must be at least 6 characters long']},
    verifyCode:{type:String,required:[true,'Verified code is required']},
    verifyCodeExpires:{type:Date,required:[true,'Verified code expires is required']},
    isVerified:{type:Boolean,default:false},
    isAcceptingMessages:{type:Boolean,default:true},
    messages:[MessageSchema]
});
const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User',UserSchema);
export default UserModel;