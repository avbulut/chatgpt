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
     $("#kayıtol_div").show();
     $("#login_div").hide();
     $("#anasayfa_div").hide();
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

