import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Device} from '../types/device.type'

import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-canvas',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy, AfterViewInit {

  public sessionId = null;
  public fadeContainer: Element = null;    // Local reference to div for fading-in and out on state transitions.
  private script = null;
  private devices = {};
  public deviceNames = [{label:'Select Device', value:null}];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.http.get<Device[]>('http:/localhost:5000/devices').subscribe(devices => {
      console.log(devices.length);

      devices.forEach(device => {
        let temp = {label: null, value: null};
        temp.label = device.id;
        temp.value = device.id;
        this.deviceNames.push(temp);
      });
      console.log(this.deviceNames)
    });

  }

  ngOnInit() {
    this.fadeContainer = document.getElementById('fade-container');
  }

  public ngAfterViewInit() {
    // Fade our package selection information in.
    this.fadeContainer.className = 'visible';
  }

  ngOnDestroy() {
  }
}
