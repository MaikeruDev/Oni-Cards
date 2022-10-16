import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private alertController: AlertController) {
  }

  async createUserWithEmailAndPassword(email, password, username, d_id){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then(credential => {
        credential.user.updateProfile({
          displayName: username,
        })
      }).then(
        async res => {
          await this.afAuth.user.subscribe(user => {
            
            this.uid = user.uid

            this.db.collection("users/").doc(this.uid).set({
              username: username,
              pfp: "https://avatars.dicebear.com/api/micah/" + this.uid + ".svg",
              email: email.toLowerCase(),
              uid: this.uid,
              d_id: d_id
            }).then(res => {
              location.reload();
            })
          })
        },
        async err => {
          this.convertMessage(err.code).then(async res => {
            const alert = await this.alertController.create({
              header: "Oopsie",
              message: res,
              buttons: ["RETRY"]
            })
  
            await alert.present();
          })
        }
      )
    })
  }

  async signInWithEmailAndPassword(email, password){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(
        res => {
          location.reload();
        },
        async err => {
          this.convertMessage(err.code).then(async res => {
            const alert = await this.alertController.create({
              header: "Oopsie",
              message: res,
              buttons: ["RETRY"]
            })
  
            await alert.present();
          })
        }
      )
    })
  }
  
  async convertMessage(code) {
    switch (code) {
        case 'auth/user-disabled': return "Sorry your user is disabled.";
        case 'auth/user-not-found': return "Sorry user not found.";
        case 'auth/missing-email': return "Please enter an E-Mail address.";
        case 'auth/invalid-email': return "Please enter a valid E-Mail Format.";
        default: return "Login error try again.";
    }
  }

  async signOut(){
    return new Promise<void>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            resolve();
            location.reload();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  async resetPW(email){
    if(email){
    this.afAuth.sendPasswordResetEmail(email)
    .then(async (res: any) =>{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Done!',
        message: "An email to reset your password has been sent.",
        buttons: ['OK']
      });
  
      await alert.present();
    })
    .catch(async (err: any) =>{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      });
  
      await alert.present();
      })
    }
    else{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        message: 'Please enter a valid email.',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

  userDetails(){
    return this.afAuth.user;
  }

  async alert(header: any, subHeader: any, message: any, buttons: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [buttons]
    });

    await alert.present();
  }

}
