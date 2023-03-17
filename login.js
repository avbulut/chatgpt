 function openCity(evt, cityName) {
     var i, tabcontent, tablinks;
     tabcontent = document.getElementsByClassName("tabcontent");
     for (i = 0; i < tabcontent.length; i++) {
         tabcontent[i].style.display = "none";
     }
     tablinks = document.getElementsByClassName("tablinks");
     for (i = 0; i < tablinks.length; i++) {
         tablinks[i].className = tablinks[i].className.replace(" active", "");
     }
     document.getElementById(cityName).style.display = "block";
     evt.currentTarget.className += " active";
 }

 // Get the element with id="defaultOpen" and click on it
 document.getElementById("defaultOpen").click();


 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBUvlD4ovFcCvWcG9jYIcr7tGNIbQHJu38",
    authDomain: "chatgpt-4-df1ac.firebaseapp.com",
    databaseURL: "https://chatgpt-4-df1ac-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatgpt-4-df1ac",
    storageBucket: "chatgpt-4-df1ac.appspot.com",
    messagingSenderId: "1075966176561",
    appId: "1:1075966176561:web:0035837b2b83c9f12f5410",
    measurementId: "G-H0F7NHT42V"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 /*------------------------------------------------------------------------------------------------------------*/
 document.getElementById('login').onclick = function() {
     var userEmail = document.getElementById('email_field').value;
     var userPass = document.getElementById('password_field').value;
     firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
         .then(() => {
            window.location.assign('index.html');
         }).catch(function(error) {
             var errorCode = error.code;
             var errorMessage = error.message;
             swal({
                 title: "Başarısız!",
                 text: "Böyle bir kimlik numarası veya kullanıcı adı bulunmaktadır.",
                 icon: "warning",
                 buttons: "Tamam",
             });
         });
 }
 firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
         $("#anasayfa_div").show();
         $("#kayıtol_div").hide();
         $("#login_div").hide();
         var user = firebase.auth().currentUser;
         if (user != null) {
             var email_id = user.email;
             document.getElementById('user_para').innerHTML = email_id;

         }
         ll()
     } else {
         $("#anasayfa_div").hide();
         $("#kayıtol_div").show();
         $("#login_div").hide();
     }
 });
 /*------------------------------------------------------------------------------------------------------------*/

 function gonder() {
    var adsoyad = document.getElementById('adsoyad').value;
    var email_fi = document.getElementById('email_fi').value;
    var password_fi = document.getElementById('password_fi').value;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    var dt = new Date(); 
    var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+.)+([.])+[a-zA-Z0-9.-]{2,4}$/;

    if(adsoyad === ""){
        swal({
            title: "Kayıt Başarısız",
            text: "Lütfen adınızı ve soyadınızı doldurunuz!",
            icon: "warning",
            buttons: "Tamam",
        });
    }else if(email_fi === ""){
        swal({
            title: "Kayıt Başarısız",
            text: "Lütfen e-mail adresini boş girmeyin !",
            icon: "error",
            button: "Tamam",
        });
    }else if(regex.test(email_fi) == false){
        swal({
            title: "Kayıt Başarısız",
            text: "Lütfen geçerli bir e-mail adresi giriniz",
            icon: "error",
            button: "Tamam",
        });
    }else if (password_fi.length < 6) {
        swal({
            title: "Kayıt Başarısız",
            text: "Şifreniz en az 6 karakter olmalıdır !",
            icon: "error",
            button: "Tamam",
        });
    }else if(password_fi === ""){
        swal({
            title: "Kayıt Başarısız",
            text: "Lütfen en az 6 karakterli bir şifre belirleyin !",
            icon: "error",
            button: "Tamam",
        });
    }else{
        firebase.auth().createUserWithEmailAndPassword(email_fi,password_fi)
        .then(function(userCredential){   
            // kullanıcının uid değerini alın
            var userUid = userCredential.user.uid;
 
            // Realtime Database'e kaydet
            firebase.database().ref('register/' + userUid).set({
                AdSoyad: adsoyad,
                Email: email_fi,
                createdDate: today + dt,
                Şifresi: password_fi,
                uid: userUid
            });
 
            swal({
                title: "Başarılı",
                text: "Kaydınız başarılı bir şekilde alındı.",
                icon: "success",
                button: "Tamam",
            });
            var adsoyad = document.getElementById('adsoyad').value = "";
            var email_fi = document.getElementById('email_fi').value = "";
            var password_fi = document.getElementById('password_fi').value = "";
        });
    }
}




/*


 document.getElementById('typedText').value = "";


 function getRandIndex(maxLength) {
     return Math.floor(Math.random() * maxLength);
 }
 var data;

 function getCaptcha() {
     var canvas = document.getElementById('canvas');
     var pen = canvas.getContext('2d');
     var captch = Math.random().toString(36).substring(2, 8);
     document.getElementById('result').innerHTML = "Yenile";
     pen.font = "30px Georgia";
     pen.fillStyle = "grey";
     pen.fillRect(0, 0, 400, 400);
     pen.fillStyle = "orange";
     maxLength = captch.length;
     index1 = getRandIndex(maxLength);
     index2 = getRandIndex(maxLength);

     captch = captch.substring(0, index1 - 1) + captch[index1].toUpperCase() + captch.substring(index1 + 1, maxLength);
     captch = captch.substring(0, index2 - 1) + captch[index2].toUpperCase() + captch.substring(index2 + 1, maxLength);

     data = captch;
     captch = captch.split('').join(' ');
     pen.fillText(captch, 40, 40)
 }*/

 function ll() {
    var browserName = navigator.userAgent;
  
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      var ipAddress = data.ip;
  
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      var dtü = new Date(); // DATE() ile yeni bir tarih nesnesi oluşturuldu.
      var saat = dtü.getHours();
      var dakika = dtü.getMinutes();
      var saniye = dtü.getSeconds();
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      var email_id = user.email;
  
      firebase.database().ref("users/" + uid).set({
        createdDate: today + dtü,
        userkayıt: email_id,
        kulid: uid,
        ip: ipAddress,
        tarayici: browserName
      });
  
      $("#login_div").hide();
      $("#kayıtol_div").hide();
      $("#anasayfa_div").show();
  
      //------  EKLEYİNİZ ------- //
  
      chatYukle();
    })
    .catch(error => {
      console.log("Error:", error);
    });
  }
 /*------------------------------------------------------------------------------------------------------------*/

 //Kullanıcının Çıkış İşlemi Butonun Fonksiyonu

 document.getElementById('logout').onclick = function() {
     firebase.auth().signOut();
     document.getElementById('kayıtol_div').style.display = "block";
     document.getElementById('login_div').style.display = "none";
     document.getElementById('anasayfa_div').style.display = "none";
     $("#kayıtol_div").show();
     $("#login_div").hide();
     $("#anasayfa_div").hide();
     document.getElementById("typedText").value = "";
 }

 /*------------------------------------------------------------------------------------------------------------*/

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


/*
 var xml = new XMLHttpRequest();
 xml.open("GET", "https://api.ipify.org")
 xml.send();
 xml.addEventListener("loadend", loaded);




 function loaded(e) {
     on(xml.responseText);


 }

 function on(ip) {
     var num = 0;
     firebase.database().ref("Ip").once("value").then(function(snap) {
         var today = new Date();
         var dd = String(today.getDate()).padStart(2, '0');
         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = today.getFullYear();
         today = mm + '/' + dd + '/' + yyyy;
         var dt = new Date(); // DATE() ile yeni bir tarih nesnesi oluşturuldu.
         var saat = dt.getHours();
         var dakika = dt.getMinutes();
         var saniye = dt.getSeconds();
         num = snap.numChildren();
         num++;
         firebase.database().ref("Ip").child(num.toString()).set({
             Ip: ip,
             createdDate: today + dt

         });
     });
 }
*/




/*

 function oldu(pos) {


     var a = document.getElementById('enlem').innerHTML = pos.coords.latitude;
     var b = document.getElementById('boylam').innerHTML = pos.coords.longitude;
     var c = document.getElementById('dogruluk').innerHTML = `${pos.coords.accuracy} metre`;
     var ç = document.getElementById('tarayici').innerHTML = (navigator.appName) + (navigator.appVersion);
     document.getElementById('durum_mesaj').innerHTML = `Konum sonucu bulundu`;


     // ÖRNEK
     // https://www.google.com/maps?output=embed&q=40.989491199999996,29.104537600000004
     mapembed = `https://www.google.com/maps?output=embed&z=15&q=${pos.coords.latitude},${pos.coords.longitude}`;


     document.getElementById('harita').setAttribute('src', mapembed);
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = today.getFullYear();
     today = mm + '/' + dd + '/' + yyyy;
     var dt = new Date(); // DATE() ile yeni bir tarih nesnesi oluşturuldu.
     var saat = dt.getHours();
     var dakika = dt.getMinutes();
     var saniye = dt.getSeconds();

     firebase.database().ref('konum/').push().set({
         createdDate: today + dt,
         Enlem: a,
         Boylam: b,
         Tarayıcı: ç,
         Doğruluk: c
     });
 }

 function olmadi(hata) {
     document.getElementById('durum_mesaj').innerHTML = `
<strong>Hata Kodu</strong> ${hata.code} <br>
<strong>Hata mesajı</strong> ${hata.message}
`;

 }

*/

 function sw() {
     swal("Gizlilik Sözleşmesi", "Gizlilik", "info", {
         buttons: false,
     });
 }



 /*
 var ImgName, ImgUrl;
 var files = [];
 var reader;



 document.getElementById('upload').onclick = function(e) {
     var input = document.createElement('input');

     input.type = 'file';
     input.click();


     input.onchange = e => {
         files = e.target.files;
         reader = new FileReader();
         reader = fileName = file.name;
         reader.onload = function() {
             document.getElementById("myimg").src = reader.result;
         }
         reader.readAsDataURL(this.documentFile);
     }
     input.click();
     ImgName = document.getElementById('namebox').value;
     var uploadTask = firebase.storage().ref('Images/' + ImgName).put(files[0]);

     uploadTask.on('state_changed', function(snapshot) {
             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             document.getElementById('upProgress').innerHTML = 'Upload' + progress + '%';

         },
         function(error) {
             alert('Resim Gönderilemedi !');
         },
         function() {
             uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                 ImgUrl = url;
                 var num = 0;
                 num++;
                 firebase.database().ref('Pictures/' + num).set({
                     İd: num,
                     Name: ImgName,
                     Link: ImgUrl
                 });
                 alert('Resim Başarılı Bir Şekilde Gönderildi...');
             });
         });
 }*/
