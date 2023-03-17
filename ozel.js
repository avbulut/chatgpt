
document.getElementById('logout').onclick = function() {
    firebase.auth().signOut();
    window.location.href = "register.html";
}


document.getElementById('mesajGonder').onclick = function() {
    var mesaj = $("#mesaj").val();
    if (mesaj != "") {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        var dt = new Date(); // DATE() ile yeni bir tarih nesnesi oluşturuldu.
        var saat = dt.getHours();
        var dakika = dt.getMinutes();
        var user2 = firebase.auth().currentUser;
        var email_id2 = user2.email;
        var saniye = dt.getSeconds();
        var messageKey = firebase.database().ref("chats/").push().key; //Rastgele bir mesaj keyi gönderir.
        firebase.database().ref("chats/" + messageKey).set({
            message: mesaj,
            baglanti: email_id2,
            createdDate: today + dt
        });
        //Otomatik olarak en alt kısma odakanılır
        $("#mesaj").val(''); //Mesaj inputunu temizleyelim
    } else {
        swal({
            icon: "warning",
            text: "Boş Mesaj Gönderemezsiniz !",
            buttons: "Tamam",
        });
    }
}

function chatYukle() {
    var query = firebase.database().ref("chats");
    var user2 = firebase.auth().currentUser;
    var email_id22 = user2.email;
    query.on('value', function(snapshot) {
        $("#mesajAlani").html("");
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();

            if (data.baglanti == email_id22) {
                //Mesaj bizim tarafımızdan gönderilmişse bu alan çalışacak
                var mesaj = `<div class="d-flex justify-content-end">
               <div class="alert alert-info" role="alert">
                   ` + data.message + ` 
                     </div>
                </div>`;
                $("#mesajAlani").append(mesaj);
            } else {
                //Mesaj başkası tarafından gönderilmişse bu alan çalışacak
                var mesaj = `<div class="d-flex">
                                   <div class="alert alert-dark" role="alert">
                                       <b>@` + data.baglanti.split('@')[0] + `: </b> ` + data.message + `
                                 </div>
                          </div>`;
                $("#mesajAlani").append(mesaj);
            }
            $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
        });

    });
}