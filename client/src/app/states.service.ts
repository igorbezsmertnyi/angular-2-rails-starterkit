import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable()
export class StateService {

  _formOpen = new Subject<boolean>()
  formOpen = this._formOpen.asObservable()
  formIsOpen(isOpen:boolean = false) {
    this._formOpen.next(isOpen)
  }

  _spinnerOpen = new Subject<any>()
  spinnerOpen = this._spinnerOpen.asObservable()
  spinnrIsOpen(isOpen:boolean = false, status:boolean = undefined) {
    this._spinnerOpen.next({isOpen, status})
  }

  _postStatus = new Subject<boolean>()
  postStatus = this._postStatus.asObservable()
  setPostStatus(status:boolean) {
    this._postStatus.next(status)
  }
}
