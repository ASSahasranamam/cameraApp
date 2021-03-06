import {Component, OnInit} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {
  // toggle webcam on/off
  public showWebcam = false;
  public multipleWebcamsAvailable = false;
  // latest snapshot
public  webcamImage: any = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
   this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
   console.info('received webcam image', webcamImage);
   this.webcamImage = webcamImage;

  }
  webCamEnable() {
    if (this.showWebcam == true){
      this.showWebcam = false;
    } else{
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
