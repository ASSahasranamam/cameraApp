import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Item } from "../form-component/form-component.component";
import { Subject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { collection, query, where, getDocs } from "firebase/firestore";
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {
  // selectedCharacter: number = null;
  // public items: Item[];

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  listView = [];
  constructor(private db: AngularFirestore,
    private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.itemsCollection = db.collection('bioData');


    // this.route.params.subscribe(
    //   params => (this.selectedCharacter = +params['id'])
    // );
  }
  //
  // async getMarker() {
  //     const snapshot = await firebase.firestore().collection('events').get()
  //     return snapshot.docs.map(doc => doc.data());
  // }
  ngOnInit() {
    // this.spinner.show();
    // this.items.forEach(element => {
    //   console.log(element.getDocs())
    // });
    // this.itemsCollection.get()
    //   .pipe(
    //     map(snapshot => {
    //       let items2: Item[] = [];
    //       snapshot.docs.map(a => {
    //         var data = a.data();
    //         var id = a.id;
    //         var name = data.name;
    //         this.listView.push(data)
    //       })
    //       this.spinner.hide();
    //       // return items2
    //     }),
    //   )

    this.itemsCollection.get().subscribe(data => {
      // console.log(data.docs)
      data.docs.forEach(element => {
        console.log(element.data())
        this.listView.push(element.data())

      });
      // this.spinner.h();
    })



    // this.db.collection("cities").get().then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // })
    //   .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    //   });


    // this.peopleCollection.get().then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // });
  }

}
