const {dbusername,password} = process.env 

console.log("username,password", dbusername,password)

export const connectionStr = `mongodb+srv://${dbusername}:${password}@cluster0.psqxfb1.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0`