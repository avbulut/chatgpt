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


 /*------------------------------------------------------------------------------------------------------------*/
 document.getElementById('login').onclick = function() {
     var userEmail = document.getElementById('email_field').value;
     var userPass = document.getElementById('password_field').value;
     firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
         .then(() => {
            window.location.href ="index.html";
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
            //var userUid = userCredential.user.uid;

            $("#sign-in").show();
            $("#sign-up").hide();
            $("#sifremyenile").hide();

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
                text: "Zaten böyle bir kayıt bulunmakta !",
                icon: "info",
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
        createdDate: today + dtü,
        userkayıt: email_id,
        kulid: uid,
        ip: ipAddress,
        tarayici: browserName
      });
  
     window.location.href ="index.html";
  
      //------  EKLEYİNİZ ------- //
  
     //chatYukle();
    })
    .catch(error => {
      console.log("Error:", error);
    });
  }



 function sw() {
     swal("Gizlilik Sözleşmesi", "Gizlilik", "info", {
         buttons: false,
     });
 }


