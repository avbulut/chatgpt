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
           document.getElementById("kayıtol_div").style.display ="none";
           document.getElementById("anasayfa_div").style.display ="block";
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
           var user = firebase.auth().currentUser;
           document.getElementById("kayıtol_div").style.display ="none";
           document.getElementById("anasayfa_div").style.display ="block";

          if (user) {
              if (user != null) {
                  var email_id = user.email;
                  document.getElementById('user_para').innerHTML = email_id;
                  chatYukle();
       
              }
          } else {
           document.getElementById("kayıtol_div").style.display ="block";
           document.getElementById("anasayfa_div").style.display ="none";           
       }
       });

/*------------------------------------------------------------------------------------------------------------*/

function gonder() {
   var adsoyad = document.getElementById('adsoyad').value;
   var email_fi = document.getElementById('email_fi').value;
   var password_fi = document.getElementById('password_fi').value;
   var gizlilikSozlesmesiChecked = document.getElementById("gizliliksozlesmesi").checked;
   var yasInput = document.getElementById("yas");
   var yas = new Date(yasInput.value);
   var yilFarki = new Date(Date.now() - yas.getTime()).getFullYear() - 1970;
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
   }else if (isNaN(yas.getTime())) {
    swal({
        title: "Kayıt Başarısız",
        text: "Lütfen doğum tarihini giriniz !",
        icon: "error",
        buttons: "Tamam",
    });
   }else if (yilFarki < 18) {
    swal({
        title: "Kayıt Başarısız",
        text: "Yaşınız 18'den küçük olduğu için kaydolamazsınız !",
        icon: "error",
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
   }else  if (!gizlilikSozlesmesiChecked) {      
    swal({
        title: "Kayıt Başarısız",
        text: "Lütfen gizlilik sözleşmesini kabul edin. Kabul etmeden önce gizlilik sözleşmesini okuyun !",
        icon: "error",
        buttons: "Tamam",
    });
   }else{
       firebase.auth().createUserWithEmailAndPassword(email_fi,password_fi)
       .then(function(userCredential){   
           // kullanıcının uid değerini alın
           //var userUid = userCredential.user.uid;

           $("#sign-in").show();
           $("#sign-up").hide();
           swal({
               title: "Başarılı",
               text: "Kaydınız başarılı bir şekilde alındı.",
               icon: "success",
               button: "Tamam",
           });
           var adsoyad = document.getElementById('adsoyad').value = "";
           var email_fi = document.getElementById('email_fi').value = "";
           var password_fi = document.getElementById('password_fi').value = "";
       }).catch(error => {
           swal({
               title: "Başarısız",
               text: "Zaten girdiğiniz kayıt veri tabanında bulunmaktadır.",
               icon: "warning",
               button: "Tamam",
           });
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
       createdDate: today,
       datel: dtü,
       userkayıt: email_id,
       kulid: uid,
       ip: ipAddress,
       tarayici: browserName
     });
 
    window.location.href ="index.html";
 
     //------  EKLEYİNİZ ------- //
 
    chatYukle();
   })
   .catch(error => {
     console.log("Error:", error);
   });
 }



 document.getElementById('logout').onclick = function() {
   firebase.auth().signOut();
   document.getElementById("kayıtol_div").style.display ="block";
   document.getElementById("anasayfa_div").style.display ="none"; 
 }


 document.getElementById('mesajGonder').onclick = function() {
    var mesaj = document.getElementById("mesaj").value;
 
    var urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
 
    var swearWords = ["amcik","orospu", "orospu çocuğu", "amcık", "sikerim","amınagorum","amına goyarım","amına koyarım","amk","sik","amcuk","siktir","siktir lan","siktirlan","piç","oç","şerefsiz","sikerim belanı","kahpe","gavat","sikiş","sikis","yavşak","pezevenk","penis","vajina","sex","seks","onun bunun çocuğu","sikerim","sikerim böyle gurubu","tecavüz","taciz","dildo","takma yarak","yarak","yarrak","seni sikerim"];
    for (var i = 0; i < swearWords.length; i++) {
        if (mesaj.toLowerCase().indexOf(swearWords[i].toLowerCase()) !== -1) {
            swal({
                icon: "warning",
                text: "Lütfen küfür göndermeyin !",
                buttons: "Tamam",
            });           
            return;
        }
    }
 
    if (mesaj === "") {      
         swal({
             icon: "warning",
             text: "Boş Mesaj Gönderemezsiniz !",
             buttons: "Tamam",
         });
    } else if (urlRegex.test(mesaj)) {
      swal({
          icon: "warning",
          text: "Lütfen URL göndermeyin !",
          buttons: "Tamam",
      });
    } else {
        var now = new Date();
        var dd = String(now.getDate()).padStart(2, '0');
        var mm = String(now.getMonth() + 1).padStart(2, '0');
        var yyyy = now.getFullYear();
        var hh = String(now.getHours()).padStart(2, '0');
        var min = String(now.getMinutes()).padStart(2, '0');
        var ss = String(now.getSeconds()).padStart(2, '0');
        
        var messageKey = firebase.database().ref("chats/").push().key;
        
        firebase.database().ref("chats/" + messageKey).set({
          message: mesaj,
          baglanti: email_id2,
          createdDate: dd + '/' + mm + '/' + yyyy,
          createdTime: hh + ':' + min + ':' + ss
        });
      
         //Otomatik olarak en alt kısma odakanılır
         var mesaj = document.getElementById("mesaj").value= "";
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
                                      <b>@`+ data.baglanti.split('@')[0] +`: </b> ` + data.message + `
                                </div>
                         </div>`;
               $("#mesajAlani").append(mesaj);
           }
           $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
       });

   });
}

document.getElementById('sifreyenile').onclick = function() {
   var email_sifre = document.getElementById('sifreunuttum').value;
if (email_sifre === "") {
swal({
   title: "Başarısız!",
   text: "Kayıtlı Email Adresinizi Yazın",
   icon: "warning",
   buttons: "Tamam",
});
}else{
firebase.auth().sendPasswordResetEmail(email_sifre)
.then(()=>{
swal({
   title: "Başarılı",
   text: "E-postanıza şifre yenileme bağlantısı gönderildi",
   icon: "success",
   buttons: "Tamam",
});
}).catch(function(error) {
var errorCode = error.code;
var errorMessage1 = error.message;
   swal({
   title: "Başarısız !",
   text: "Böyle bir kullanıcı kimlik bulunamadı",
   icon: "warning",
   buttons: "Tamam",
});
});
}
}
function sw() {
    swal("Gizlilik Sözleşmesi", `Bu anonim chat uygulamasını kullanarak, aşağıdaki koşulları kabul etmiş sayılırsınız:
    Bu uygulama üzerinde yazılan mesajlardan sadece siz sorumlusunuz. Kubilay Alpaslan, bu uygulama üzerinde yazılan hakaret veya yanlış beyanlardan sorumlu değildir.

    Bu uygulama kullanıcıları, diğer kullanıcıların haklarını ihlal etmekten kaçınmalıdır. Kullanıcılar, bu uygulamayı kullanarak başka kullanıcılara zarar vermekten kaçınmalıdır.

    Kubilay Alpaslan, bu uygulamanın kullanımından doğabilecek herhangi bir kayıp veya zarar için sorumlu tutulamaz.
     
    Not : "Mesajlar 24 saat sonra otomatik olarak silinir" bilginize !

    Bu uygulama, gizlilik sözleşmesinde değişiklik yapma hakkını saklı tutar. Değişiklikler yapıldığında, kullanıcılar için geçerli hale gelir.

    Bu gizlilik sözleşmesinde yer alan tüm koşulları okudum ve kabul ediyorum.`, "info", {
        buttons: {
            confirm: "Tamam",
        },
    });
}
    firebase.database().ref("chats/").on("child_added", async function(snapshot) {
        // yeni bir mesaj eklendiğinde burası çalışacak
        const data = snapshot.val();
        const senderEmail = data.baglanti;
        const message = data.message;
    
        let granted = false;
    
        if (Notification.permission === 'granted') {
            granted = true;
        } else if (Notification.permission !== 'denied') {
            let permission = await Notification.requestPermission();
            granted = permission === 'granted' ? true : false;
        }
    
        if (granted) {
            const notification = new Notification('Yeni Mesaj!', {
                body: `Yeni bir mesaj aldınız.  Mesaj: ${message}`,
                icon: 'images/unnamed.png'
            });
        }
    });

