function borrarTabla(){
    var Parent = document.getElementById("notifs-table");
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }
}

async function getNotifs(){
    const notifsJson = await fetch('/notifs/pend/nc')
    const notifs = await notifsJson.json()
    console.log(notifs)
    if(notifs.length>0){
        document.getElementById("emptyNotifs").style.display="none";
        const table = $("#notifs-table")
        var row, cell;
        row = "</tr>"
        for(var i in notifs){
                cell='<tr><td><input type="checkbox" class="n-input" id="n-i-'+i+'"><span class="n-title">'+notifs[i].title+'</span></td><td><span class="n-desc">'+notifs[i].description+'</span></td>'
                table.append(cell)
                table.append(row)
            
        }
    } else{
        document.getElementById("emptyNotifs").style.display="block";
    }
};

async function notifs(){ 
getNotifs()

    if(document.getElementById("popup").style.display=="block"){
        document.getElementById("popup").style.display="none"
        const notifsjson = await fetch('/notifs/pend/nc')
        const notifics = await notifsjson.json()
        console.log(notifics.length)
        for(var i in notifics){

            if($('input#n-i-'+i).is(':checked')){
                console.log(i)
                console.log(notifics[i]._id)
                fetch('/notifs/'+notifics[i]._id, {
                    method: 'PATCH',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'accept-encoding': 'gzip, deflate'
                    },
                    body: JSON.stringify({
                        status:"Revisado"
                    })
                })
            }
        }  
    } else{
        document.getElementById("popup").style.display="block"
    }
    borrarTabla()
    notifBadge()
}

async function notifBadge(){
const datjson = await fetch('/notifs/pend/nc')
const data = await datjson.json()

if(data.length>0){ 
    document.getElementById("badge").innerHTML = data.length;
} else{
    document.getElementById("badge").style.display="none";
}
}
notifBadge()