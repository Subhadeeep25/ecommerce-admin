export default function handler(req, res) {
    const {method}=req;
    const session=getServerSession(req);
    console.log(session);
    if(method=='POST'){
        const name=req.body;
    }
}