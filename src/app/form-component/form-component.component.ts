import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { getStorage, ref, uploadString } from "firebase/storage";

export interface Item { name: string; dataurl: string }
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})


export class FormComponentComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  public data2: any = null;
  items: Observable<Item[]>;
  public showProcessing = false;


  private storage = getStorage();

  constructor(private afs: AngularFirestore, private afstorage: AngularFireStorage) {
    this.itemsCollection = afs.collection<Item>('bioData');


  }

  public FromFireStoreTest = false;
  // toggle webcam on/off
  public showWebcam = false;
  // latest snapshot
  public webcamImage: any = null;
  public multipleWebcamsAvailable = false;
  public name: string = "";
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    console.log(this.webcamImage.imageAsDataUrl);
    // var filePath = event.target.files[0]

  }

  onSubmit(webcamImage: WebcamImage) {

    let item: Item = { name: this.name, dataurl: webcamImage.imageAsDataUrl };
    this.showProcessing = true;

    this.itemsCollection.add(item).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      let id = docRef.id;
      // this.ref = this.afstorage.ref(id);
      // let ref = this.afstorage.ref(id);
      let spaceref = ref(this.storage, String('/biodata/' + id + ".jpeg"));

      uploadString(spaceref, this.webcamImage.imageAsDataUrl, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        alert("Your Details have been submitted");
        this.showProcessing = false;

        this.webcamImage = null;
        this.name = ""

        this.showWebcam = false;


      });

    })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });



  }


  webCamEnable() {
    if (this.showWebcam == true) {
      this.showWebcam = false;
    } else {
      this.showWebcam = true;
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      alert("Camera access was not allowed by user!");
    }
  }

}
