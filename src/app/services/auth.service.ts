import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AlertController } from '@ionic/angular';
import { take, map, finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid: any;
  imageUrl: any

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private alertController: AlertController, public http: HttpClient, public storage: AngularFireStorage) {
  }

  async imageUrlToBase64(urL: string) {
    return this.http.get(urL, {
        observe: 'body',
        responseType: 'arraybuffer',
      })
      .pipe(
        take(1),
        map((arrayBuffer) =>
          btoa(
            Array.from(new Uint8Array(arrayBuffer))
            .map((b) => String.fromCharCode(b))
            .join('')
          )
        ),
      )
  }

  async createUserWithEmailAndPassword(email, password, username, d_id, discord_image){
    

    (await this.imageUrlToBase64(discord_image)).subscribe( (res) => {
      const storageRef = this.storage.ref(`/profile_pictures/`+ d_id + `.png`);
      const task = storageRef.putString(res, 'base64', {contentType: 'image/png'});
      task.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(image_url => {
            return new Promise<any>((resolve, reject) => {
              this.afAuth.createUserWithEmailAndPassword(email, password).then(credential => {
                credential.user.updateProfile({
                  displayName: username,
                  photoURL: image_url
                })
              }).then(
                async res => {
                  await this.afAuth.user.subscribe(user => {
                    
                    this.uid = user.uid
        
                    this.db.collection("users/").doc(this.uid).set({
                      username: username,
                      pfp: image_url,
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
          });
        })
      ).subscribe();
      
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
